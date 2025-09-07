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
  clientId!: string;
  showAddressForm = signal(false);
  loading = false;

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

        console.log('Endereços do cliente:', client.addresses);
      },
      error: (err) => {
        console.error('Erro ao buscar cliente:', err);
      }
    });
  }

  newClientAddressForm = new FormGroup({
    residenceType: new FormControl('', [Validators.required]),
    logradouroType: new FormControl('', [Validators.required]),
    logradouro: new FormControl('', [Validators.required]),
    neighbourhood: new FormControl('', [Validators.required]),
    residenceNumber: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    observations: new FormControl('', [])
  })

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

  addNewAddress() {
    this.showAddressForm.set(true)
  }

  cancelNewAddress() {
    this.showAddressForm.set(false)
  }
}
