import {Component} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Tag} from 'primeng/tag';
import {InputText} from 'primeng/inputtext';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {RadioButton} from 'primeng/radiobutton';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AdminService, ClientFilter} from '../../services/admin/admin.service';


@Component({
  selector: 'app-admin-client-management',
  standalone: true,
  imports: [TableModule, Button, Tag, InputText, ConfirmDialog, Toast, Card, FloatLabel, RadioButton, ReactiveFormsModule, ButtonLabel, ButtonDirective, ButtonIcon],
  providers: [ConfirmationService, MessageService],
  templateUrl: './admin-client-management.html'
})
export class AdminClientManagement {
  clients: ClientFilter[] = [];
  clientFilterForm: FormGroup;
  totalRecords = 0;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.clientFilterForm = this.fb.group({
      name: [''],
      cpf: [''],
      email: [''],
      phoneNumber: [''],
      gender: [null],
      active: [null]
    })
  }

  onFilterSubmit() {
    this.loadClients({ first: 0, rows: 10 });
  }

  loadClients(event: TableLazyLoadEvent) {
    this.loading = true;
    const page = event.first! / event.rows!;
    const size = event.rows!;

    const filter: Partial<ClientFilter> = this.clientFilterForm.value;

    this.adminService.getClients(filter, page, size).subscribe({
      next: (res) => {
        this.clients = res.content;
        this.totalRecords = res.totalElements;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os clientes. Tente novamente mais tarde.'
        });
        console.error('Erro ao buscar clientes:', err);
      }
    });
  }


  getStatusSeverity(active: boolean): 'success' | 'danger' | 'warning' | 'info' {
    return active ? 'success' : 'danger';
  }

  confirmToggle(client: ClientFilter) {
    const action = client.active ? 'desativar' : 'reativar';
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: `Tem certeza que deseja ${action} o cliente "${client.fullName}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => this.toggleActive(client)
    });
  }

  toggleActive(client: ClientFilter) {
    this.adminService.handleClientStatus(!client.active, client.id!).subscribe({
      next: () => {
        client.active = !client.active;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: client.active ? 'Cliente reativado.' : 'Cliente desativado.',
          life: 2000
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o status do cliente.',
          life: 3000
        });
        console.error('Erro ao atualizar status:', err);
      }
    });
  }

}
