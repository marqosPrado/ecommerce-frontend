import {Component, OnInit, signal} from '@angular/core';
import {Header} from '../../common/header/header';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputMask} from 'primeng/inputmask';
import {DatePicker} from 'primeng/datepicker';
import {Checkbox} from 'primeng/checkbox';
import {Toast} from 'primeng/toast';
import {ClientService} from '../../services/client.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CreditCard, CreditCardTypes} from '../../types/Payment/CreditCard';
import {Select} from 'primeng/select';
import {Client} from '../../types/Client';
import {MaskCard} from '../../utils/mask-card';
import {CommonModule} from '@angular/common';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {UserInfoService} from '../../services/user/user-info.service';

@Component({
  selector: 'app-client-wallet',
  imports: [
    CommonModule,
    Header,
    Button,
    Card,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    InputMask,
    DatePicker,
    Checkbox,
    Toast,
    Select,
    MaskCard,
    ConfirmDialog
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './client-wallet.html',
  styleUrl: './client-wallet.css'
})
export class ClientWallet implements OnInit {
  creditCards = signal<CreditCard[]>([]);
  showCreditCardForm = signal(false);
  loading = signal(false);
  clientId: number | null = null;
  creditCardForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userInfoService: UserInfoService,
  ) {
    this.creditCardForm = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      printedName: new FormControl('', Validators.required),
      cardFlag: new FormControl<CreditCardTypes | null>(null, Validators.required),
      cpf: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]),
      isMain: new FormControl<boolean>(false, { nonNullable: true })
    });
  }

  ngOnInit(): void {
    this.loadCurrentUserAndCards();
  }

  private loadCurrentUserAndCards() {
    this.loading.set(true);

    this.userInfoService.getCurrentUser().subscribe({
      next: (user) => {
        this.clientId = user.id;
        this.loadClientCards();
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Erro ao buscar usuário:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar seus dados.'
        });
      }
    });
  }

  private loadClientCards() {
    if (!this.clientId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'ID do cliente não encontrado.'
      });
      return;
    }

    this.clientService.getClientById(this.clientId).subscribe({
      next: (client: Client) => {
        this.creditCards.set(client.creditCards || []);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Erro ao buscar cartões:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar seus cartões.'
        });
      }
    });
  }

  removeCreditCard(card: CreditCard) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover este cartão?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        if (!this.clientId) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'ID do cliente não encontrado.'
          });
          return;
        }

        this.loading.set(true);

        this.clientService.removeCreditCard(this.clientId, card).subscribe({
          next: () => {
            this.loading.set(false);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Cartão removido com sucesso!',
              life: 2000
            });
            this.loadClientCards();
          },
          error: (err) => {
            this.loading.set(false);
            console.error('Erro ao remover cartão', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível remover o cartão.',
              life: 4000
            });
          }
        });
      }
    });
  }

  submitCreditCard() {
    if (this.creditCardForm.invalid) {
      this.creditCardForm.markAllAsTouched();
      return;
    }

    if (!this.clientId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'ID do cliente não encontrado.'
      });
      return;
    }

    this.loading.set(true);
    const cardData = this.creditCardForm.value;

    this.clientService.registerNewCreditCard(this.clientId, cardData).subscribe({
      next: () => {
        this.loading.set(false);
        this.showCreditCardForm.set(false);
        this.creditCardForm.reset({ isMain: false });
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cartão cadastrado com sucesso!',
          life: 2000
        });
        this.loadClientCards();
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Erro ao cadastrar cartão', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível cadastrar o cartão.',
          life: 4000
        });
      }
    });
  }

  handleCreditCardForm() {
    this.showCreditCardForm.set(!this.showCreditCardForm());

    if (!this.showCreditCardForm()) {
      this.creditCardForm.reset({ isMain: false });
    }
  }
}
