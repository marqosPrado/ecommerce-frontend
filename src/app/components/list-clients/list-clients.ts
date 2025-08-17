import { Component } from '@angular/core';
import {Client} from './type/client';
import {Header} from '../../common/header/header';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-list-clients',
  imports: [Header, TableModule, Button, ConfirmDialog, Toast],
  providers: [ConfirmationService],
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.css'
})
export class ListClients {
  mockData: Client[];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.mockData = [
      {
        id: 1,
        fullName: 'John Doe',
        cpf: '123.456.789-00',
        gender: 'M',
        birthDate: '1990-01-15',
        phone: '(11) 91234-5678',
        email: 'john.doe@example.com',
      },
      {
        id: 2,
        fullName: 'Maria Silva',
        cpf: '987.654.321-11',
        gender: 'F',
        birthDate: '1988-07-22',
        phone: '(21) 99876-5432',
        email: 'maria.silva@example.com',
      },
      {
        id: 3,
        fullName: 'Carlos Pereira',
        cpf: '111.222.333-44',
        gender: 'M',
        birthDate: '1995-03-09',
        phone: '(31) 98765-4321',
        email: 'carlos.pereira@example.com',
      },
      {
        id: 4,
        fullName: 'Ana Souza',
        cpf: '555.666.777-88',
        gender: 'F',
        birthDate: '1992-11-30',
        phone: '(41) 97654-3210',
        email: 'ana.souza@example.com',
      },
      {
        id: 5,
        fullName: 'Lucas Almeida',
        cpf: '222.333.444-55',
        gender: 'M',
        birthDate: '1998-05-05',
        phone: '(51) 96543-2109',
        email: 'lucas.almeida@example.com',
      },
    ];
  }

  deleteClient(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este cliente?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.mockData = this.mockData.filter(client => client.id !== id);
        this.messageService.add({
          severity: 'success',
          life: 2000,
          summary: 'Sucesso!',
          detail: 'Cliente deletedo com sucesso!'
        });
      }
    });
  }

}
