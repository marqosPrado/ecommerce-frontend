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
    Checkbox
  ],
  templateUrl: './client-wallet.html',
  styleUrl: './client-wallet.css'
})
export class ClientWallet {
  showCreditCardForm = signal(false)

  creditCardForm = new FormGroup({
    name: new FormControl('', Validators.required),
    printedName: new FormControl('', Validators.required),
    validity: new FormControl('', Validators.required),
    verificationCode: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    mainCard: new FormControl<boolean>(false, { nonNullable: true })
  })

  handleCreditCardForm() {
    this.showCreditCardForm.set(!this.showCreditCardForm());
  }
}
