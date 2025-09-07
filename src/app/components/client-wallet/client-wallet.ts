import {Component, signal} from '@angular/core';
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
import {CreditCardTypes} from '../../types/CreditCard';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-client-wallet',
  imports: [
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
    Select
  ],
  templateUrl: './client-wallet.html',
  styleUrl: './client-wallet.css'
})
export class ClientWallet {
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

  submitCreditCard() {
    if (this.creditCardForm.invalid) return;

    const clientId = 1;
    const cardData = this.creditCardForm.value;

    this.clientService.registerNewCreditCard(clientId, cardData).subscribe({
      next: (res) => {
        this.showCreditCardForm.set(false);
        this.creditCardForm.reset({ isMain: false });
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Cartão cadastrado com sucesso!'});
      },
      error: (err) => {
        console.error('Erro ao cadastrar cartão', err);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Não foi possível cadastrar o cartão.'});
      }
    });
  }

  handleCreditCardForm() {
    this.showCreditCardForm.set(!this.showCreditCardForm());
  }
}
