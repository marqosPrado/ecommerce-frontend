import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ConfirmationService, MessageService, PrimeTemplate } from 'primeng/api';
import { Tag } from 'primeng/tag';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Header } from '../../common/header/header';
import { LineSession } from '../../common/line-session/line-session';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Card } from 'primeng/card';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';
import { PurchaseOrderResponse } from '../../types/Purchase/Response/PurchaseOrderResponse';

@Component({
  selector: 'app-admin-orders-management',
  imports: [
    Dialog,
    PrimeTemplate,
    Tag,
    ConfirmDialog,
    Toast,
    Header,
    LineSession,
    Button,
    RouterLink,
    Card,
    TableModule,
    Tooltip,
    CommonModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './admin-orders-management.html',
  styleUrl: './admin-orders-management.css'
})
export class AdminOrdersManagement implements OnInit {
  orders: PurchaseOrderResponse[] = [];
  selectedOrder: PurchaseOrderResponse | null = null;
  displayOrderDetails: boolean = false;
  loading: boolean = false;
  totalRecords: number = 0;
  selectedStatus: string | null = null;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadOrders({ first: 0, rows: 10 });
  }

  loadOrders(event: TableLazyLoadEvent): void {
    this.loading = true;
    const page = event.first ? Math.floor(event.first / (event.rows || 10)) : 0;
    const size = event.rows || 10;

    this.purchaseOrderService.getAllSummaryPurchaseOrder(page, size).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.orders = response.data.content;
          this.totalRecords = response.data.totalElements;

          if (this.selectedStatus) {
            this.orders = this.orders.filter(
              order => order.order_status.code === this.selectedStatus
            );
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os pedidos'
        });
        this.loading = false;
      }
    });
  }

  filterByStatus(status: string | null): void {
    this.selectedStatus = status;
    this.loadOrders({ first: 0, rows: 10 });
  }

  confirmApprove(order: PurchaseOrderResponse): void {
    this.confirmationService.confirm({
      message: `Deseja aprovar o pagamento do pedido ${order.order_number}?`,
      header: 'Confirmar Aprovação',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.approveOrder(order.id);
      }
    });
  }

  approveOrder(orderId: number): void {
    this.purchaseOrderService.approveOrder(orderId).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Pagamento aprovado com sucesso'
          });
          this.loadOrders({ first: 0, rows: 10 });
        }
      },
      error: (error) => {
        console.error('Erro ao aprovar pedido:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível aprovar o pagamento'
        });
      }
    });
  }

  confirmInTransit(order: PurchaseOrderResponse): void {
    this.confirmationService.confirm({
      message: `Deseja marcar o pedido ${order.order_number} como em trânsito?`,
      header: 'Confirmar Envio',
      icon: 'pi pi-truck',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.markInTransit(order.id);
      }
    });
  }

  markInTransit(orderId: number): void {
    this.purchaseOrderService.markInTransit(orderId).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Pedido marcado como em trânsito'
          });
          this.loadOrders({ first: 0, rows: 10 });
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar pedido:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o status'
        });
      }
    });
  }

  confirmDelivery(order: PurchaseOrderResponse): void {
    this.confirmationService.confirm({
      message: `Deseja confirmar a entrega do pedido ${order.order_number}?`,
      header: 'Confirmar Entrega',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.markDelivered(order.id);
      }
    });
  }

  markDelivered(orderId: number): void {
    this.purchaseOrderService.markDelivered(orderId).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Entrega confirmada com sucesso'
          });
          this.loadOrders({ first: 0, rows: 10 });
        }
      },
      error: (error) => {
        console.error('Erro ao confirmar entrega:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível confirmar a entrega'
        });
      }
    });
  }

  showOrderDetails(order: PurchaseOrderResponse): void {
    this.selectedOrder = order;
    this.displayOrderDetails = true;
  }

  getStatusSeverity(status: string): string {
    const severityMap: { [key: string]: string } = {
      'PROCESSING': 'danger',
      'APPROVED': 'success',
      'IN_TRANSIT': 'info',
      'DELIVERED': 'success',
      'CANCELLED': 'danger'
    };
    return severityMap[status] || 'secondary';
  }

  getStatusIcon(status: string): string {
    const iconMap: { [key: string]: string } = {
      'PROCESSING': 'pi pi-clock',
      'APPROVED': 'pi pi-check',
      'IN_TRANSIT': 'pi pi-truck',
      'DELIVERED': 'pi pi-check-circle',
      'CANCELLED': 'pi pi-times-circle'
    };
    return iconMap[status] || 'pi pi-info-circle';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatCurrency(value: string | number): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  }
}
