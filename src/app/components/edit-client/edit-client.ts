import {Component, OnInit} from '@angular/core';
import {Header} from '../../common/header/header';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {Button} from 'primeng/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';

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
  ],
  providers: [ConfirmationService],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.css'
})
export class EditClient implements OnInit{
  editClientForm!: FormGroup;
  clientId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('id')!;

    const client = this.getClientById(this.clientId);

    this.editClientForm = this.fb.group({
      fullName: [client.fullName, Validators.required],
      cpf: [{value: client.cpf, disabled: true}, [Validators.required, Validators.pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}/)]],
      gender: [client.gender, Validators.required],
      birthDate: [{value: new Date(client.birthDate), disabled: true}, Validators.required],
      phone: [client.phone, Validators.required],
      email: [{value: client.email, disabled: true}, [Validators.required, Validators.email]],
    });
  }

  getClientById(id: string) {
    return {
      id: id,
      fullName: 'John Doe',
      cpf: '123.456.789-00',
      gender: 'M',
      birthDate: '1990-01-15',
      phone: '(11) 91234-5678',
      email: 'john.doe@example.com',
    };
  }

  editClient() {
    this.confirmationService.confirm({
      message: 'Tem certeza que salvar essa alteração?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          life: 2000,
          summary: 'Sucesso!',
          detail: 'Alteração realizado com sucesso!'
        });
        setTimeout(() => {
          this.router.navigate(['/client/all']);
        }, 2000)
      }
    });
  }
}
