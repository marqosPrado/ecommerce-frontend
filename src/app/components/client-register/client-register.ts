import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { Header } from '../../common/header/header';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Password } from 'primeng/password';
import { Step, StepList, StepPanel, StepPanels, Stepper } from 'primeng/stepper';
import { Textarea } from 'primeng/textarea';
import { InputMask } from 'primeng/inputmask';
import { Client } from '../../types/Client';
import { ClientService } from '../../services/client.service';
import { CreditCardTypes } from '../../types/Payment/CreditCard';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [
    Header,
    FloatLabel,
    InputText,
    ButtonModule,
    ReactiveFormsModule,
    SelectModule,
    FormsModule,
    DatePicker,
    Toast,
    Password,
    Stepper,
    Step,
    StepList,
    StepPanel,
    StepPanels,
    Textarea,
    InputMask
  ],
  templateUrl: './client-register.html',
  styleUrl: './client-register.css'
})
export class ClientRegister {
  clientRegisterForm: FormGroup;
  clientAddressForm: FormGroup;
  clientPaymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private clientService: ClientService
  ) {

    this.clientRegisterForm = this.fb.nonNullable.group({
      fullName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      typePhoneNumber: ['CELULAR', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    this.clientAddressForm = this.fb.nonNullable.group({
      typeResidence: ['', Validators.required],
      typePlace: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      cep: ['', Validators.required],
      city: ['', Validators.required],
      stateId: ['', Validators.required],
      country: ['', Validators.required],
      observations: ['']
    });

    this.clientPaymentForm = this.fb.nonNullable.group({
      number: ['', Validators.required],
      printedName: ['', Validators.required],
      cardFlag: ['', Validators.required],
      securityCode: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.isValid()) return;

    const payload: Client = this.makePayload();

    this.clientService.registerClient(payload).subscribe({
      next: () => {
        this.showMessage('success', 'Cliente registrado com sucesso!');
        this.resetForms();
      },
      error: (err) => {
        this.showMessage('error', 'Erro ao registrar cliente', err?.message || 'Tente novamente mais tarde.');
      }
    });
  }

  private isValid(): boolean {
    if (
      this.clientRegisterForm.invalid ||
      this.clientAddressForm.invalid ||
      this.clientPaymentForm.invalid
    ) {
      this.showMessage('warn', 'Preencha todos os campos obrigatórios!');
      return false;
    }
    return true;
  }

  private makePayload(): Client {
    return {
      ...this.clientRegisterForm.value,
      phoneNumber: this.clientRegisterForm.value.phoneNumber.replace(/\D/g, ''),
      addresses: [{
        typeResidence: this.clientAddressForm.value.typeResidence,
        typePlace: this.clientAddressForm.value.typePlace,
        street: this.clientAddressForm.value.street,
        number: Number(this.clientAddressForm.value.number),
        neighborhood: this.clientAddressForm.value.neighborhood,
        cep: this.clientAddressForm.value.cep.replace(/-/g, ''),
        city: this.clientAddressForm.value.city,
        country: this.clientAddressForm.value.country,
        observations: this.clientAddressForm.value.observations,
        stateId: Number(this.clientAddressForm.value.stateId)
      }],
      creditCards: [{
        number: this.clientPaymentForm.value.number.replace(/\s+/g, ''),
        printedName: this.clientPaymentForm.value.printedName,
        cardFlag: this.clientPaymentForm.value.cardFlag as CreditCardTypes,
        securityCode: this.clientPaymentForm.value.securityCode
      }]
    };
  }

  private resetForms(): void {
    this.clientRegisterForm.reset();
    this.clientAddressForm.reset();
    this.clientPaymentForm.reset();
  }

  private showMessage(severity: 'success' | 'error' | 'warn', summary: string, detail?: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
