import {Component, OnInit, signal} from '@angular/core';
import {Header} from '../../common/header/header';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {InputMask} from 'primeng/inputmask';
import {Textarea} from 'primeng/textarea';
import {ClientService} from '../../services/client.service';
import {Client} from '../../types/Client';
import {Address} from '../../types/Address';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    Select,
    DatePicker,
    Button,
    ConfirmDialog,
    Toast,
    RouterLink,
    InputMask,
    Textarea,
    ButtonDirective,
    ButtonLabel,
    ButtonIcon,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.css'
})
export class EditClient implements OnInit{
  editClientForm!: FormGroup;
  newClientAddressForm!: FormGroup;
  clientId!: string;
  showAddressForm = signal(false);
  loading = false;
  clientAddresses = signal<Address[]>([]);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('id')!;

    this.editClientForm = this.fb.group({
      fullName: ['', Validators.required],
      cpf: [{ value: '', disabled: true }, [Validators.required]],
      gender: ['', Validators.required],
      birthDate: [{ value: '', disabled: true }, Validators.required],
      phoneNumber: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    });

    this.newClientAddressForm = this.fb.group({
      typeResidence: new FormControl('', [Validators.required]),
      typePlace: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      neighbourhood: new FormControl('', [Validators.required]),
      number: new FormControl<number | null>(null, [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      stateId: new FormControl<number | null>(null, [Validators.required]),
      country: new FormControl('', [Validators.required]),
      observations: new FormControl('', [])
    })

    this.loadClient();
  }

  loadClient() {
    this.clientService.getClientById(Number(this.clientId)).subscribe({
      next: (client: Client) => {
        this.editClientForm.patchValue({
          fullName: client.fullName,
          cpf: client.cpf,
          gender: client.gender,
          birthDate: new Date(client.birthDate),
          phoneNumber: client.phoneNumber,
          email: client.email,
        });

        this.clientAddresses.set(client.addresses);
      },
      error: (err) => {
        console.error('Erro ao buscar cliente:', err);
      }
    });
  }

  editClient() {
    if (this.editClientForm.invalid) {
      this.editClientForm.markAllAsTouched();
      return;
    }

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja salvar essa alteração?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        const payload = {
          fullName: this.editClientForm.get('fullName')?.value,
          phoneNumber: this.editClientForm.get('phoneNumber')?.value,
          gender: this.editClientForm.get('gender')?.value,
        };

        this.loading = true;

        this.clientService.updateClientBasicData(Number(this.clientId), payload).subscribe({
          next: () => {
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              life: 2000,
              summary: 'Sucesso!',
              detail: 'Alterações salvas com sucesso!'
            });

            this.loadClient();
          },
          error: (err) => {
            this.loading = false;
            console.error('Erro ao salvar alterações:', err);
            this.messageService.add({
              severity: 'error',
              life: 4000,
              summary: 'Erro!',
              detail: 'Não foi possível salvar as alterações.'
            });
          }
        });
      }
    });
  }

  editAddress(address: Address) {
    this.showAddressForm.set(true);
    this.newClientAddressForm.patchValue({
      typeResidence: address.typeResidence,
      typePlace: address.typePlace,
      street: address.street,
      number: address.number,
      neighbourhood: address.neighborhood,
      cep: address.cep,
      city: address.city,
      stateId: address.stateId,
      country: address.country,
      observations: address.observations
    });
  }

  registerNewAddress() {
    if (this.newClientAddressForm.invalid) {
      this.newClientAddressForm.markAllAsTouched();
      return;
    }

    this.confirmationService.confirm({
      message: 'Deseja cadastrar este novo endereço?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        const payload: Address = {
          typeResidence: this.newClientAddressForm.get('typeResidence')?.value!,
          typePlace: this.newClientAddressForm.get('typePlace')?.value!,
          street: this.newClientAddressForm.get('street')?.value!,
          number: Number(this.newClientAddressForm.get('number')?.value),
          neighborhood: this.newClientAddressForm.get('neighbourhood')?.value!, // cuidado com o nome
          cep: this.newClientAddressForm.get('cep')?.value!,
          city: this.newClientAddressForm.get('city')?.value!,
          stateId: Number(this.newClientAddressForm.get('stateId')?.value),
          country: this.newClientAddressForm.get('country')?.value!,
          observations: this.newClientAddressForm.get('observations')?.value || undefined
        };

        this.loading = true;

        this.clientService.registerNewAddress(Number(this.clientId), payload).subscribe({
          next: () => {
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              life: 2000,
              summary: 'Sucesso!',
              detail: 'Endereço cadastrado com sucesso!'
            });

            this.newClientAddressForm.reset();
            this.showAddressForm.set(false);
            this.loadClient();
          },
          error: (err) => {
            this.loading = false;
            console.error('Erro ao cadastrar endereço:', err);
            this.messageService.add({
              severity: 'error',
              life: 4000,
              summary: 'Erro!',
              detail: 'Não foi possível cadastrar o endereço.'
            });
          }
        });
      }
    });
  }

  addNewAddress() {
    this.newClientAddressForm.reset();
    this.showAddressForm.set(true)
  }

  cancelNewAddress() {
    this.newClientAddressForm.reset();
    this.showAddressForm.set(false)
  }
}
