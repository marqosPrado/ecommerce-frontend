import {Component, OnInit} from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Select} from 'primeng/select';
import {RadioButton} from 'primeng/radiobutton';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreditCard, CreditCardTypes} from '../../types/CreditCard';
import {CartService} from '../../services/cart/cart.service';
import {Observable} from 'rxjs';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {Textarea} from 'primeng/textarea';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {InputMask} from 'primeng/inputmask';

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
    Textarea,
    FloatLabel,
    InputText,
    InputMask,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  public cartForm!: FormGroup;
  cartItems: CartItem[] = [];
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
  showAddressForm: boolean = false;
  loading: boolean = false;

  constructor(private cartService: CartService, private fb: FormBuilder) {
    this.totalPrice$ = this.cartService.calculateTotalValue();
  }

  ngOnInit(): void {
    this.creditCards = this.getAllCreditCards();
    const main = this.addresses.find(a => a.isMain) ?? this.addresses[0];
    if (main) {
      this.addressFormGroup.patchValue({ address: main.id });
    }

    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.buildCartForm();
    });
  }

  private buildCartForm(): void {
    this.cartForm = this.fb.group({
      items: this.fb.array(
        this.cartItems.map(item =>
          this.fb.group({
            productId: [item.product.id],
            quantity: [this.getQuantityOption(item.quantity), Validators.required]
          })
        )
      )
    });

    this.cartForm.valueChanges.subscribe(value => {
      value.items.forEach((item: any, index: number) => {
        const productId = this.cartItems[index].product.id;
        const newQuantity = item.quantity?.value;
        if (newQuantity) {
          this.cartService.updateQuantity(productId, newQuantity);
        }
      });
    });
  }

  get cartItemsFormArray(): FormArray {
    return this.cartForm?.get('items') as FormArray;
  }

  getItemFormGroup(index: number): FormGroup {
    return this.cartItemsFormArray.at(index) as FormGroup;
  }

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
    if (this.activeStep === 1) return !this.cartForm?.valid || this.cartItems.length === 0;
    if (this.activeStep === 2) return this.addressFormGroup.invalid;
    return !this.cartForm?.valid || this.addressFormGroup.invalid || this.paymentForm.invalid;
  }

  public removerFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  private getQuantityOption(qty: number): { name: string; value: number } {
    return this.quantityOptions.find(opt => opt.value === qty) ?? this.quantityOptions[0];
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  public handleAddressForm(): void {
    this.showAddressForm = !this.showAddressForm;
    console.log(this.showAddressForm);
  }
}
