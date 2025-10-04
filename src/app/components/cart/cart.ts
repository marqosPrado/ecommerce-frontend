import {Component, OnInit} from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Select} from 'primeng/select';
import {RadioButton} from 'primeng/radiobutton';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreditCard, CreditCardTypes} from '../../types/CreditCard';
import {CartService} from '../../services/cart/cart.service';
import {Observable} from 'rxjs';
import {AsyncPipe, CurrencyPipe} from '@angular/common';

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
    AsyncPipe,
    CurrencyPipe,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  public cartForm!: FormGroup;
  cartItems: CartItem[];
  totalPrice$: Observable<number>;
  activeStep: number = 1;
  creditCards: CreditCard[] = [];
  addresses = [
    { id: 10, text: 'Rua A, 123 - São Paulo, SP', isMain: true },
    { id: 11, text: 'Av. B, 456 - Mogi das Cruzes, SP', isMain: false },
  ];
  quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    name: `${i + 1}`,
    value: i + 1
  }));

  constructor(private cartService: CartService, private fb: FormBuilder) {
    this.cartItems = [];
    this.totalPrice$ = this.cartService.calculateTotalValue();
  }

  ngOnInit(): void {
    this.creditCards = this.getAllCreditCards();
    const main = this.addresses.find(a => a.isMain) ?? this.addresses[0];
    if (main) {
      this.addressFormGroup.patchValue({ address: main.id });
    }
    this.getProductsFromLocalStorage()

    this.cartForm = this.fb.group({
      items: this.fb.array(
        this.cartItems.map(item =>
          this.fb.group({
            productId: [item.product.id],
            quantity: [this.getQuantityOption(item.quantity)]
          })
        )
      )
    });

    this.cartForm.valueChanges.subscribe(value => {
      value.items.forEach((item: any) => {
        this.cartService.updateQuantity(item.productId, item.quantity.value);
      });
    });
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
        number: '444* **** **** 4444',
        printedName: 'MARCOS V F PRADO',
        cardFlag: CreditCardTypes.MASTER_CARD,
        securityCode: '336',
        isMain: true,
      },
      {
        id: 2,
        number: '555* **** **** 7777',
        printedName: 'MARCOS V F PRADO',
        cardFlag: CreditCardTypes.VISA,
        securityCode: '956',
        isMain: false,
      }
    ]
  }

  protected readonly CreditCardTypes = CreditCardTypes;

  get primaryDisabled(): boolean {
    console.log(this.cartItems.length < 0)
    if (this.activeStep === 1) return this.cartFormGroup.invalid || this.cartItems.length === 0;
    if (this.activeStep === 2) return this.addressFormGroup.invalid;
    return this.cartFormGroup.invalid || this.addressFormGroup.invalid || this.paymentForm.invalid;
  }

  private getProductsFromLocalStorage(): void
  {
    this.cartService.items$.subscribe(items => this.cartItems = items);
  }

  public removerFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  public onQuantityChange(productId: number, event: any): void {
    const newQuantity = event.value?.value;
    if (!newQuantity || newQuantity < 1) {
      return;
    }
    this.cartService.updateQuantity(productId, newQuantity);
  }

  private getQuantityOption(qty: number): { name: string; value: number } {
    return this.quantityOptions.find(opt => opt.value === qty) ?? this.quantityOptions[0];
  }

}
