import { Component } from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { InputText } from 'primeng/inputtext';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from '../list-clients/type/client';
import {Card} from 'primeng/card';

type AdminClient = Client & { active: boolean };

@Component({
  selector: 'app-admin-client-management',
  standalone: true,
  imports: [TableModule, Button, Tag, InputText, ConfirmDialog, Toast, Card],
  providers: [ConfirmationService, MessageService],
  templateUrl: './admin-client-management.html'
})
export class AdminClientManagement {
  clients: AdminClient[] = [
    { id: 1, fullName: 'John Doe',   cpf: '123.456.789-00', gender: 'M', birthDate: '1990-01-15', phone: '(11) 91234-5678', email: 'john.doe@example.com',  active: true },
    { id: 2, fullName: 'Maria Silva',cpf: '987.654.321-11', gender: 'F', birthDate: '1988-07-22', phone: '(21) 99876-5432', email: 'maria.silva@example.com', active: false },
    { id: 3, fullName: 'Carlos Pereira', cpf: '111.222.333-44', gender: 'M', birthDate: '1995-03-09', phone: '(31) 98765-4321', email: 'carlos.pereira@example.com', active: true },
    { id: 4, fullName: 'Ana Souza',  cpf: '555.666.777-88', gender: 'F', birthDate: '1992-11-30', phone: '(41) 97654-3210', email: 'ana.souza@example.com',   active: true },
    { id: 5, fullName: 'Lucas Almeida', cpf: '222.333.444-55', gender: 'M', birthDate: '1998-05-05', phone: '(51) 96543-2109', email: 'lucas.almeida@example.com', active: false },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getStatusSeverity(active: boolean): 'success' | 'danger' | 'warning' | 'info' {
    return active ? 'success' : 'danger';
  }

  confirmToggle(client: AdminClient) {
    const acao = client.active ? 'desativar' : 'reativar';
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: `Tem certeza que deseja ${acao} o cliente "${client.fullName}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => this.toggleActive(client.id)
    });
  }

  toggleActive(id: number) {
    this.clients = this.clients.map(c => c.id === id ? { ...c, active: !c.active } : c);
    const updated = this.clients.find(c => c.id === id);
    if (updated) {
      this.messageService.add({
        severity: 'success',
        life: 2000,
        summary: 'Sucesso',
        detail: updated.active ? 'Cliente reativado.' : 'Cliente desativado.'
      });
    }
  }

  onGlobalFilter(dt: Table, event: Event) {
    const input = event.target as HTMLInputElement;
    dt.filterGlobal(input.value, 'contains');
  }
}
