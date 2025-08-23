import {Component, signal} from '@angular/core';
import {Header} from '../../common/header/header';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
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

  handleCreditCardForm() {
    this.showCreditCardForm.set(!this.showCreditCardForm());
  }

  creditCardForm = new FormGroup({
    mainCard: new FormControl<boolean>(false, { nonNullable: true })
  })
}
