 import { Component } from '@angular/core';
import { TableModule, Table } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Card} from 'primeng/card';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

type ProductStatus = 'processing' | 'in_transit' | 'delivered' | 'canceled';

type ClientProductRow = {
  id: number;
  clientName: string;
  productName: string;
  sku: string;
  createdAt: string;
  status: ProductStatus;
};

@Component({
  selector: 'app-admin-product-management',
  standalone: true,
  imports: [TableModule, Tag, InputText, Select, ConfirmDialog, Toast, Card, DatePipe, FormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './admin-product-management.html'
})
export class AdminProductManagement {
  rows: ClientProductRow[] = [
    { id: 1001, clientName: 'John Doe',    productName: 'Relógio Omega', sku: 'FX200-PR',    createdAt: '2025-08-01T10:30:00Z', status: 'processing' },
    { id: 1002, clientName: 'Maria Silva', productName: 'Relógio Omega',   sku: 'NBP14-8GB',   createdAt: '2025-08-02T11:05:00Z', status: 'in_transit' },
    { id: 1003, clientName: 'Carlos P.',   productName: 'Relógio Omega',    sku: 'MSGR-RGB',    createdAt: '2025-08-03T09:12:00Z', status: 'delivered' },
    { id: 1004, clientName: 'Ana Souza',   productName: 'Relógio Omega',   sku: 'SWFS-BLK',    createdAt: '2025-08-04T14:42:00Z', status: 'canceled' },
    { id: 1005, clientName: 'Lucas A.',    productName: 'Relógio Omega',    sku: 'MN27-QHD',    createdAt: '2025-08-05T16:20:00Z', status: 'processing' },
  ];

  statusOptions = [
    { name: 'Em processamento', value: 'processing' as ProductStatus },
    { name: 'Em trânsito',      value: 'in_transit' as ProductStatus },
    { name: 'Entregue',         value: 'delivered' as ProductStatus },
    { name: 'Cancelado',        value: 'canceled' as ProductStatus },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getStatusLabel(status: ProductStatus): string {
    switch (status) {
      case 'processing': return 'Em processamento';
      case 'in_transit': return 'Em trânsito';
      case 'delivered':  return 'Entregue';
      case 'canceled':   return 'Cancelado';
    }
  }

  getStatusSeverity(status: ProductStatus): 'success' | 'danger' | 'warning' | 'info' {
    switch (status) {
      case 'processing': return 'info';
      case 'in_transit': return 'warning';
      case 'delivered':  return 'success';
      case 'canceled':   return 'danger';
    }
  }

  onGlobalFilter(dt: Table, event: Event) {
    const input = event.target as HTMLInputElement;
    dt.filterGlobal(input.value, 'contains');
  }

  onPickStatus(row: ClientProductRow, newStatus: ProductStatus) {
    if (newStatus === row.status) return;

    this.confirmationService.confirm({
      header: 'Confirmar alteração de status',
      message: `Deseja alterar o status de "${row.productName}" para "${this.getStatusLabel(newStatus)}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => this.updateStatus(row.id, newStatus)
    });
  }

  updateStatus(id: number, status: ProductStatus) {
    this.rows = this.rows.map(r => r.id === id ? { ...r, status } : r);
    const updated = this.rows.find(r => r.id === id);
    if (updated) {
      this.messageService.add({
        severity: 'success',
        life: 2000,
        summary: 'Status atualizado',
        detail: `Produto agora está "${this.getStatusLabel(updated.status)}".`
      });
    }
  }
}
