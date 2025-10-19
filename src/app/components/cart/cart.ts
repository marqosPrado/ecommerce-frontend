import {Component, OnInit, OnDestroy} from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Select} from 'primeng/select';
import {RadioButton} from 'primeng/radiobutton';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreditCard, CreditCardTypes} from '../../types/Payment/CreditCard';
import {CartService} from '../../services/cart/cart.service';
import {Observable, Subject, takeUntil} from 'rxjs';
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
import {PurchaseRequest} from '../../types/Purchase/Request/PurchaseRequest';
import {PurchaseOrderService} from '../../services/purchase-order/purchase-order.service';
import {DialogButton, DialogParams, Modal} from '../../common/modal/modal/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
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
    Modal,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit, OnDestroy {
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
  showDialog: boolean = false;
  dialogParams?: DialogParams;

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private addressService: AddressService,
    private creditCardService: CreditCardService,
    private purchaseOrderService: PurchaseOrderService,
    private router: Router
  ) {
    this.totalPrice$ = this.cartService.calculateTotalValue();

    this.newAddressForm = this.fb.group({
      typeResidence: [null, Validators.required],
      typePlace: [null, Validators.required],
      street: ['', [Validators.required, Validators.minLength(3)]],
      number: ['', Validators.required],
      neighborhood: ['', [Validators.required, Validators.minLength(3)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      stateId: [null, Validators.required],
      country: ['Brasil', Validators.required],
      observations: ['']
    });

    this.addressFormGroup = this.fb.group({
      address: [null, Validators.required]
    });

    this.newCreditCardForm = this.fb.group({
      number: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      printedName: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      birthDate: [null, Validators.required],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      cardFlag: new FormControl<CreditCardTypes | null>(null, Validators.required),
      securityCode: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      isMain: [false, Validators.required],
    });

    this.creditCardFormGroup = this.fb.group({
      creditCard: [null, Validators.required],
    });

    this.paymentForm = this.fb.group({
      creditCardId: new FormControl<number | null>(null, Validators.required),
      installments: new FormControl<{name: string, value: string} | null>(
        {name: '1x sem juros', value: '1'},
        Validators.required
      )
    });
  }

  ngOnInit(): void {
    this.addressService.getAddresses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (addresses) => {
          this.addresses = addresses;
          const main = this.addresses.find(a => a.isMain) ?? this.addresses[0];
          if (main) {
            this.addressFormGroup.patchValue({ address: main.id });
          }
        },
        error: (err) => console.error('Erro ao carregar endereços:', err)
      });

    this.creditCardService.getCreditCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cards) => {
          this.creditCards = cards;
          const main = this.creditCards.find(a => a.isMain) ?? this.creditCards[0];
          if (main) {
            this.creditCardFormGroup.patchValue({ creditCard: main.id });
            this.paymentForm.patchValue({ creditCardId: main.id });
          }
        },
        error: (err) => console.error('Erro ao carregar cartões:', err)
      });

    this.cartService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
        this.buildCartForm();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitNewAddress(): void {
    if (this.newAddressForm.invalid) {
      this.newAddressForm.markAllAsTouched();
      return;
    }

    const newAddress: Address = {
      ...(this.newAddressForm.value as Address),
      isMain: false
    };

    this.loading = true;

    this.addressService.registerAddress(newAddress)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (created) => {
          this.addresses.push(created);
          this.addressFormGroup.patchValue({ address: created.id });
          this.newAddressForm.reset();
          this.newAddressForm.patchValue({ country: 'Brasil' });
          this.showAddressForm = false;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao cadastrar endereço:', err);
          this.loading = false;
          this.showErrorDialog('Erro ao cadastrar endereço. Tente novamente.');
        }
      });
  }

  onSubmitNewCreditCard(): void {
    if (this.newCreditCardForm.invalid) {
      this.newCreditCardForm.markAllAsTouched();
      return;
    }

    const newCreditCard: CreditCard = {
      ...(this.newCreditCardForm.value as CreditCard),
    };

    this.loading = true;

    this.creditCardService.registerCreditCard(newCreditCard)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (created) => {
          this.creditCards.push(created);
          this.paymentForm.patchValue({ creditCardId: created.id });
          this.creditCardFormGroup.patchValue({ creditCard: created.id });
          this.newCreditCardForm.reset();
          this.newCreditCardForm.patchValue({ isMain: false });
          this.showCreditCardForm = false;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao cadastrar o cartão de crédito:', err);
          this.loading = false;
          this.showErrorDialog('Erro ao cadastrar cartão. Verifique os dados e tente novamente.');
        }
      });
  }

  private setupDialogSuccess(orderNumber: string): void {
    this.dialogParams = {
      header: "Sucesso!",
      iconClass: "pi pi-check-circle",
      iconColor: "#22c55e",
      title: "Pedido Realizado com Sucesso!",
      message: `Seu pedido #${orderNumber} foi processado e você receberá um e-mail de confirmação em breve.`,
      closable: false,
      buttons: [
        {
          label: "Ver Meus Pedidos",
          icon: "pi pi-shopping-bag",
          severity: "secondary",
          action: () => {
            this.router.navigate(['/meus-pedidos']);
          },
          closeOnClick: true
        },
        {
          label: "Continuar Comprando",
          icon: "pi pi-arrow-left",
          severity: "contrast",
          action: () => {
            this.router.navigate(['/']);
          },
          closeOnClick: true
        }
      ]
    };
  }

  private setupDialogError(errorMessage?: string): void {
    this.dialogParams = {
      header: "Erro",
      iconClass: "pi pi-times-circle",
      iconColor: "#ef4444",
      title: "Erro ao Processar Pedido",
      message: errorMessage || "Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.",
      closable: true,
      buttons: [
        {
          label: "Tentar Novamente",
          icon: "pi pi-refresh",
          severity: "primary",
          action: () => {
            this.finalizePurchase();
          },
          closeOnClick: true
        },
        {
          label: "Fechar",
          icon: "pi pi-times",
          severity: "secondary",
          action: () => {
            // Apenas fecha o modal
          },
          closeOnClick: true
        }
      ]
    };
  }

  private showErrorDialog(message: string): void {
    this.dialogParams = {
      header: "Atenção",
      iconClass: "pi pi-exclamation-triangle",
      iconColor: "#f59e0b",
      title: "Atenção",
      message: message,
      closable: true,
      buttons: [
        {
          label: "Entendi",
          icon: "pi pi-check",
          severity: "primary",
          closeOnClick: true
        }
      ]
    };
    this.showDialog = true;
  }

// Método melhorado de finalização de pedido
  finalizePurchase(): void {
    // Validações
    if (this.paymentForm.invalid || this.addressFormGroup.invalid || !this.cartItems.length) {
      this.paymentForm.markAllAsTouched();
      this.addressFormGroup.markAllAsTouched();
      this.showErrorDialog('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const selectedAddressId = this.addressFormGroup.get('address')?.value;
    const selectedCreditCardId = this.paymentForm.get('creditCardId')?.value;

    if (!selectedAddressId || !selectedCreditCardId) {
      this.showErrorDialog('Selecione um endereço e um cartão de crédito.');
      return;
    }

    const purchase: PurchaseRequest = {
      orderItem: this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      addressId: selectedAddressId,
      creditCardId: selectedCreditCardId,
      voucher: "DESC10"
    };

    this.loading = true;

    this.purchaseOrderService.registerNewPurchaseOrder(purchase)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Pedido realizado com sucesso:', response);

          this.cartService.clearCart();

          const orderNumber = String(response.data?.order_number || response.data?.id || 'N/A');
          this.setupDialogSuccess(orderNumber);
          this.showDialog = true;

          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao finalizar pedido:', error);

          // Extrai mensagem de erro
          let errorMessage = 'Ocorreu um erro ao processar seu pedido.';

          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.status === 0) {
            errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
          } else if (error.status === 400) {
            errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
          } else if (error.status === 404) {
            errorMessage = 'Produto não encontrado. Atualize o carrinho e tente novamente.';
          } else if (error.status === 409) {
            errorMessage = 'Conflito ao processar pedido. Alguns itens podem estar indisponíveis.';
          } else if (error.status === 500) {
            errorMessage = 'Erro no servidor. Tente novamente em alguns instantes.';
          }

          this.setupDialogError(errorMessage);
          this.showDialog = true;
          this.loading = false;
        }
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

    this.cartForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        value.items.forEach((item: any, index: number) => {
          if (this.cartItems[index]) {
            const productId = this.cartItems[index].product.id;
            const newQuantity = item.quantity?.value;
            if (newQuantity && newQuantity !== this.cartItems[index].quantity) {
              this.cartService.updateQuantity(productId, newQuantity);
            }
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

  paymentForm: FormGroup;

  nextStep(): void {
    if (this.activeStep === 1 && (!this.cartForm?.valid || this.cartItems.length === 0)) {
      this.cartForm?.markAllAsTouched();
      return;
    }

    if (this.activeStep === 2 && this.addressFormGroup.invalid) {
      this.addressFormGroup.markAllAsTouched();
      return;
    }

    if (this.activeStep < 3) {
      this.activeStep++;
    }
  }

  previousStep(): void {
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
    if (!this.showAddressForm) {
      this.newAddressForm.reset();
      this.newAddressForm.patchValue({ country: 'Brasil' });
    }
  }

  public handleCreditCardForm(): void {
    this.showCreditCardForm = !this.showCreditCardForm;
    if (!this.showCreditCardForm) {
      this.newCreditCardForm.reset();
      this.newCreditCardForm.patchValue({ isMain: false });
    }
  }

  public onDialogClose(): void {
    this.showDialog = false;
    this.dialogParams = undefined;
  }
}
