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
import {AddressService} from '../../services/address/address.service';
import {Address} from '../../types/Address';
import {Checkbox} from 'primeng/checkbox';
import {DatePicker} from 'primeng/datepicker';
import {CreditCardService} from '../../services/credit-card/credit-card.service';
import {Purchase, PurchaseStatus} from '../../types/Purchase';
import {Dialog} from 'primeng/dialog';

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
    Checkbox,
    DatePicker,
    Dialog,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  public cartForm!: FormGroup;
  creditCards: CreditCard[] = [];
  cartItems: CartItem[] = [];
  addresses: Address[] = [];

  totalPrice$: Observable<number>;
  activeStep: number = 1;
  quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    name: `${i + 1}`,
    value: i + 1
  }));

  newAddressForm: FormGroup;
  addressFormGroup: FormGroup;

  newCreditCardForm: FormGroup;
  creditCardFormGroup: FormGroup;

  showAddressForm: boolean = false;
  showCreditCardForm: boolean = false;
  loading: boolean = false;
  showSuccessDialog: boolean = false;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private addressService: AddressService,
    private creditCardService: CreditCardService,
  ) {
    this.totalPrice$ = this.cartService.calculateTotalValue();
    this.newAddressForm = this.fb.group({
      typeResidence: [null, Validators.required],
      typePlace: [null, Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      cep: ['', Validators.required],
      city: ['', Validators.required],
      stateId: [null, Validators.required],
      country: ['', Validators.required],
      observations: ['']
    });

    this.addressFormGroup = this.fb.group({
      address: [null, Validators.required]
    });

    this.newCreditCardForm = this.fb.group({
      number: ['', Validators.required],
      printedName: ['', Validators.required],
      cpf: ['', Validators.required],
      birthDate: ['', Validators.required],
      surname: ['', Validators.required],
      cardFlag: new FormControl<CreditCardTypes | null>(null, Validators.required),
      securityCode: ['', Validators.required],
      isMain: [false, Validators.required],
    })

    this.creditCardFormGroup = this.fb.group({
      creditCard: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
      const main = this.addresses.find(a => a.isMain) ?? this.addresses[0];
      if (main) {
        this.addressFormGroup.patchValue({ address: main.id });
      }
    });

    this.creditCardService.getCreditCards().subscribe(cards => {
      this.creditCards = cards;
      const main = this.creditCards.find(a => a.isMain) ?? this.creditCards[0];
      if (main) {
        this.creditCardFormGroup.patchValue({ creditCard: main.id });
      }
    })

    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.buildCartForm();
    });
  }

  onSubmitNewAddress() {
    if (this.newAddressForm.invalid) {
      this.newAddressForm.markAllAsTouched();
      return;
    }

    const newAddress: Address = {
      ...(this.newAddressForm.value as Address),
      isMain: false
    };

    this.loading = true;

    this.addressService.registerAddress(newAddress).subscribe({
      next: (created) => {
        this.addresses.push(created);
        this.loading = false;
        this.showAddressForm = false;
        this.addressFormGroup.patchValue({ address: created.id });
        this.newAddressForm.reset();
      },
      error: (err) => {
        console.error('Erro ao cadastrar endereço:', err);
        this.loading = false;
      }
    });
  }

  onSubmitNewCreditCard() {
    if (this.newCreditCardForm.invalid) {
      this.newCreditCardForm.markAllAsTouched();
      return;
    }

    const newCreditCard: CreditCard = {
      ...(this.newCreditCardForm.value as CreditCard),
    }

    this.loading = true;

    this.creditCardService.registerCreditCard(newCreditCard).subscribe({
      next: (created) => {
        this.creditCards.push(created);
        this.paymentForm.patchValue({ creditCardId: created.id });
        this.newCreditCardForm.reset();
        this.newCreditCardForm.patchValue({ isMain: false });
        this.loading = false;
        this.showCreditCardForm = false;
      },
      error: (err) => {
        console.log('Erro ao cadastrar o cartão de crédito:', err);
        this.loading = false;
      }
    });
  }

  finalizePurchase(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const purchase: Purchase = {
      id: `PED-${Date.now()}`,
      date: new Date().toISOString(),
      items: this.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity
      })),
      address: this.addresses.find(addr => addr.id === this.addressFormGroup.get('address')?.value)!,
      creditCard: this.creditCards.find(card => card.id === this.paymentForm.get('creditCardId')?.value)!,
      totalValue: this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      status: PurchaseStatus.PROCESSING
    };

    const existingPurchases: Purchase[] = JSON.parse(localStorage.getItem('purchases') || '[]');
    existingPurchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(existingPurchases));

    this.cartService.clearCart();
    this.showSuccessDialog = true;
  }

  closeSuccessDialog(): void {
    this.showSuccessDialog = false;
    // Opcional: redirecionar para página inicial ou pedidos
    // this.router.navigate(['/']);
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

  public handleCreditCardForm(): void {
    this.showCreditCardForm = !this.showCreditCardForm;
  }
}
