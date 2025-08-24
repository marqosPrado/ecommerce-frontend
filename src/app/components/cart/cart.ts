import {Component, OnInit} from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Select} from 'primeng/select';
import {RadioButton} from 'primeng/radiobutton';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreditCard, CreditCardTypes} from '../../types/CreditCard';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-cart',
  imports: [
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    Button,
    Header,
    LineSession,
    Select,
    RadioButton,
    ReactiveFormsModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  activeStep: number = 1;
  creditCards: CreditCard[] = [];
  addresses = [
    { id: 10, text: 'Rua A, 123 - São Paulo, SP', isMain: true },
    { id: 11, text: 'Av. B, 456 - Mogi das Cruzes, SP', isMain: false },
  ];

  constructor() {}

  ngOnInit(): void {
    this.creditCards = this.getAllCreditCards();
    const main = this.addresses.find(a => a.isMain) ?? this.addresses[0];
    if (main) {
      this.addressFormGroup.patchValue({ address: main.id });
    }
  }

  cartFormGroup = new FormGroup({
    quantity: new FormControl({ name: '1', value: '1' }, Validators.required),
  })

  addressFormGroup = new FormGroup({
    address: new FormControl<number | null>(null, Validators.required),
  })

  paymentForm = new FormGroup({
    creditCardId: new FormControl<number | null>(null, Validators.required),
    installments: new FormControl<object | null>({name: '1x sem juros', value: '1'}, Validators.required)
  });

  nextStep() {
    if (this.activeStep < 3) {
      this.activeStep++;
    }
  }

  previousStep() {
    if (this.activeStep > 1) {
      this.activeStep--;
    }
  }

  getAllCreditCards(): CreditCard[] {
    return [
      {
        id: 1,
        cardNumber: '444* **** **** 4444',
        printedCardName: 'MARCOS V F PRADO',
        validity: '08/33',
        cardFlag: CreditCardTypes.MASTER_CARD,
        securityCode: '336',
        surname: 'Pessoal',
        isMain: true,
      },
      {
        id: 2,
        cardNumber: '555* **** **** 7777',
        printedCardName: 'MARCOS V F PRADO',
        validity: '08/33',
        cardFlag: CreditCardTypes.VISA,
        securityCode: '956',
        surname: 'Empresa',
        isMain: false,
      }
    ]
  }

  protected readonly CreditCardTypes = CreditCardTypes;

  get primaryDisabled(): boolean {
    if (this.activeStep === 1) return this.cartFormGroup.invalid;
    if (this.activeStep === 2) return this.addressFormGroup.invalid;
    return this.cartFormGroup.invalid || this.addressFormGroup.invalid || this.paymentForm.invalid;
  }
}
