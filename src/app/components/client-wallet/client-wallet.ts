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
import {MessageService} from 'primeng/api';
import {CreditCard, CreditCardTypes} from '../../types/CreditCard';
import {Select} from 'primeng/select';
import {Client} from '../../types/Client';
import {MaskCard} from '../../utils/mask-card';
import {CommonModule} from '@angular/common';

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
    MaskCard
  ],
  templateUrl: './client-wallet.html',
  styleUrl: './client-wallet.css'
})
export class ClientWallet implements OnInit {
  creditCards: CreditCard[] = [];
  showCreditCardForm = signal(false)
  creditCardForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private messageService: MessageService
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
    this.loadClient()
  }

  submitCreditCard() {
    if (this.creditCardForm.invalid) return;

    const clientId = 1;
    const cardData = this.creditCardForm.value;

    this.clientService.registerNewCreditCard(clientId, cardData).subscribe({
      next: (res) => {
        this.showCreditCardForm.set(false);
        this.loadClient()
        this.creditCardForm.reset({ isMain: false });
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Cartão cadastrado com sucesso!'});
      },
      error: (err) => {
        console.error('Erro ao cadastrar cartão', err);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Não foi possível cadastrar o cartão.'});
      }
    });
  }

  loadClient() {
    this.clientService.getClientById(1).subscribe({
      next: (res: Client) => {
        this.creditCards = res.creditCards;
      },

      error: (err) => {
        console.error('Erro ao buscar cliente:', err);
      }
    })
  }

  handleCreditCardForm() {
    this.showCreditCardForm.set(!this.showCreditCardForm());
  }
}
