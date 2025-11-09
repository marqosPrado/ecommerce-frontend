import {afterNextRender, Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button, ButtonDirective, ButtonLabel} from 'primeng/button';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Select} from 'primeng/select';
import {RadioButton} from 'primeng/radiobutton';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
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
import {CreditCardService} from '../../services/credit-card/credit-card.service';
import {PurchaseRequest} from '../../types/Purchase/Request/PurchaseRequest';
import {PurchaseOrderService} from '../../services/purchase-order/purchase-order.service';
import {DialogParams, Modal} from '../../common/modal/modal/modal';
import {Router, RouterLink} from '@angular/router';
import {Authentication} from '../../services/authentication/authentication';
import {Checkbox} from 'primeng/checkbox';
import {ApiResponse} from '../../types/Api/ApiResponse';
import {VoucherSummaryResponse} from '../../types/Voucher/Response/VoucherSummaryResponse';
import {ExchangeVoucherService} from '../../services/exchange-voucher/exchange-voucher.service';
import {ExchangeVoucherSummary} from '../../types/ExchangeVoucher/exchange-voucher-summary.type';
import {ProgressSpinner} from 'primeng/progressspinner';

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
    Modal,
    RouterLink,
    ButtonDirective,
    ButtonLabel,
    FormsModule,
    ProgressSpinner,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit, OnDestroy {
  public cartForm!: FormGroup;
  creditCards: CreditCard[] = [];
  cartItems: CartItem[] = [];
  addresses: Address[] = [];
  exchangeVouchers: ExchangeVoucherSummary[] = [];

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

  paymentForm: FormGroup;
  voucherForm: FormGroup;

  showAddressForm: boolean = false;
  showCreditCardForm: boolean = false;
  loading: boolean = false;
  loadingExchangeVouchers: boolean = false;
  showDialog: boolean = false;
  hasLogin: boolean = false;

  voucherState = {
    isApplied: false,
    isLoading: false,
    data: {
      code: '',
      discount_percentage: '0',
      type: ''
    },
    error: ''
  };

  dialogParams?: DialogParams;

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private addressService: AddressService,
    private creditCardService: CreditCardService,
    private purchaseOrderService: PurchaseOrderService,
    private exchangeVoucherService: ExchangeVoucherService,
    private router: Router,
    private authenticationService: Authentication,
    private injector: Injector
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

    this.voucherForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.creditCardFormGroup = this.fb.group({
      creditCard: [null, Validators.required],
    });

    this.paymentForm = this.fb.group({
      selectedCardIds: this.fb.array([]),
      selectedExchangeVouchers: this.fb.array([]),
      installments: new FormControl<{name: string, value: string} | null>(
        {name: '1x sem juros', value: '1'},
        Validators.required
      )
    });

    afterNextRender(() => {
      this.hasLogin = this.isAuthenticated();
      console.log('Autenticado:', this.hasLogin);
    }, { injector: this.injector });
  }

  get selectedCardIdsArray(): FormArray {
    return this.paymentForm.get('selectedCardIds') as FormArray;
  }

  get selectedExchangeVouchersArray(): FormArray {
    return this.paymentForm.get('selectedExchangeVouchers') as FormArray;
  }

  // Calcula o valor total dos cupons selecionados
  get totalVouchersValue(): number {
    return this.selectedExchangeVouchersArray.value.reduce((sum: number, voucherId: number) => {
      const voucher = this.exchangeVouchers.find(v => v.id === voucherId);
      return sum + (voucher ? parseFloat(voucher.amount) : 0);
    }, 0);
  }

  // Calcula o valor restante após aplicar os cupons
  get remainingValue(): Observable<number> {
    return new Observable(observer => {
      this.totalPrice$.subscribe(total => {
        const remaining = total - this.totalVouchersValue;
        observer.next(Math.max(0, remaining));
      });
    });
  }

  // Verifica se é necessário adicionar cartão de crédito
  get requiresCreditCard(): boolean {
    let totalPrice = 0;
    this.totalPrice$.pipe(takeUntil(this.destroy$)).subscribe(price => totalPrice = price);
    return this.totalVouchersValue < totalPrice;
  }

  onCardCheckboxChange(cardId: number | undefined, checked: boolean): void {
    if (!cardId) return;

    const selectedIds = this.selectedCardIdsArray;

    if (checked) {
      selectedIds.push(this.fb.control(cardId));
    } else {
      const index = selectedIds.controls.findIndex(control => control.value === cardId);
      if (index !== -1) {
        selectedIds.removeAt(index);
      }
    }

    console.log('Cartões selecionados:', selectedIds.value);
  }

  isCardSelected(cardId: number | undefined): boolean {
    if (!cardId) return false;
    return this.selectedCardIdsArray.value.includes(cardId);
  }

  onVoucherCheckboxChange(voucherId: number | undefined, checked: boolean): void {
    if (!voucherId) return;

    const selectedVouchers = this.selectedExchangeVouchersArray;

    if (checked) {
      selectedVouchers.push(this.fb.control(voucherId));
    } else {
      const index = selectedVouchers.controls.findIndex(control => control.value === voucherId);
      if (index !== -1) {
        selectedVouchers.removeAt(index);
      }
    }

    console.log('Cupons selecionados:', selectedVouchers.value);
    console.log('Valor total dos cupons:', this.totalVouchersValue);
    console.log('Requer cartão de crédito:', this.requiresCreditCard);
  }

  isVoucherSelected(voucherId: number | undefined): boolean {
    if (!voucherId) return false;
    return this.selectedExchangeVouchersArray.value.includes(voucherId);
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
          console.log('Cartões carregados:', this.creditCards);
        },
        error: (err) => console.error('Erro ao carregar cartões:', err)
      });

    // Carrega cupons de troca ativos
    this.loadingExchangeVouchers = true;
    this.exchangeVoucherService.getExchangeVoucherActive(0, 100)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.exchangeVouchers = response.data.content;
          console.log('Cupons de troca carregados:', this.exchangeVouchers);
          this.loadingExchangeVouchers = false;
        },
        error: (err) => {
          console.error('Erro ao carregar cupons de troca:', err);
          this.loadingExchangeVouchers = false;
        }
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

  finalizePurchase(): void {
    if (this.addressFormGroup.invalid || !this.cartItems.length) {
      this.addressFormGroup.markAllAsTouched();
      this.showErrorDialog('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const selectedAddressId = this.addressFormGroup.get('address')?.value;
    const selectedCardIds = this.selectedCardIdsArray.value;
    const selectedVoucherIds = this.selectedExchangeVouchersArray.value;

    if (this.requiresCreditCard && selectedCardIds.length === 0) {
      this.showErrorDialog('O valor dos cupons não cobre o total da compra. Adicione pelo menos um cartão de crédito.');
      return;
    }

    if (!selectedAddressId) {
      this.showErrorDialog('Selecione um endereço de entrega.');
      return;
    }

    const purchase: PurchaseRequest = {
      orderItem: this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      addressId: selectedAddressId,
      creditCardId: selectedCardIds,
      exchangeVouchersId: selectedVoucherIds,
      voucher: this.voucherState.isApplied ? this.voucherState.data.code : ''
    };

    console.log('📦 Purchase Order:', JSON.stringify(purchase, null, 2));

    this.loading = true;

    this.purchaseOrderService.registerNewPurchaseOrder(purchase)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('✅ Pedido realizado com sucesso:', response);
          this.cartService.clearCart();
          this.removeVoucher();

          // Limpa cupons selecionados
          this.selectedExchangeVouchersArray.clear();

          const orderNumber = String(response.data?.order_number || response.data?.id || 'N/A');
          this.setupDialogSuccess(orderNumber);
          this.showDialog = true;
          this.loading = false;
        },
        error: (error) => {
          console.error('❌ Erro ao finalizar pedido:', error);

          let errorMessage = 'Ocorreu um erro ao processar seu pedido.';

          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.status === 400) {
            errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
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
    if (this.activeStep === 3) {
      if (!this.requiresCreditCard) {
        return false;
      }
      return this.selectedCardIdsArray.length === 0;
    }
    return true;
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

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  applyVoucher(): void {
    const voucherCode = this.voucherForm.get('code')?.value?.trim().toUpperCase();
    console.log(voucherCode);

    if (!voucherCode || this.voucherForm.invalid) {
      this.voucherState.error = 'Digite um código de voucher válido (6 caracteres)';
      return;
    }

    this.voucherState.isLoading = true;
    this.voucherState.error = '';

    this.cartService.applyVoucher(voucherCode).subscribe({
      next: (response: ApiResponse<VoucherSummaryResponse>) => {
        if (response.success && response.data) {
          this.voucherState.isApplied = true;
          this.voucherState.data = {
            code: response.data.code,
            discount_percentage: response.data.discount_percentage,
            type: response.data.type
          };
          this.voucherState.error = '';
          this.voucherForm.disable();
        }
        this.voucherState.isLoading = false;
      },
      error: (error) => {
        this.voucherState.isApplied = false;
        this.voucherState.error = error.error?.message || 'Erro ao aplicar voucher. Tente novamente.';
        this.voucherState.isLoading = false;
      }
    });
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }

  removeVoucher(): void {
    this.voucherState.isApplied = false;
    this.voucherState.data = {
      code: '',
      discount_percentage: '0',
      type: ''
    };
    this.voucherState.error = '';
    this.voucherForm.reset();
    this.voucherForm.enable();
  }
}
