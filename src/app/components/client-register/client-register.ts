import { Component } from '@angular/core';
import {Header} from '../../common/header/header';
import { ButtonModule } from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {Toast} from 'primeng/toast';
import {MessageService, ToastMessageOptions} from 'primeng/api';
import {Password} from 'primeng/password';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Textarea} from 'primeng/textarea';
import {InputMask} from 'primeng/inputmask';

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
  constructor(private messageService: MessageService) {
  }

  clientRegisterForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(11)
    ]),
    gender: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)
    ]),
    birthDate: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
      ]
    ),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  onSubmit() {
    setTimeout(() => {
      this.showMessage()
    }, 1000)
  }

  showMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Cliente registrado com sucesso!'
    })
  }
}
