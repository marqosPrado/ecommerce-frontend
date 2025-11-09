import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {Tag} from 'primeng/tag';
import {Dialog} from 'primeng/dialog';
import {Divider} from 'primeng/divider';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {Toast} from 'primeng/toast';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {PurchaseOrderService} from '../../services/purchase-order/purchase-order.service';
import {ExchangeRequestService} from '../../services/exchange-request/exchange-request.service';
import {PurchaseOrderResponse} from '../../types/Purchase/Response/PurchaseOrderResponse';
import {MessageService} from 'primeng/api';
import {FormsModule} from '@angular/forms';

interface ExchangeRequestPayload {
  purchaseOrder: number;
  orderItensId: number[];
  exchangeType: 'EXCHANGE' | 'RETURN';
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Tag,
    Dialog,
    Divider,
    CheckboxModule,
    RadioButtonModule,
    Toast,
    FormsModule,
    Header,
    LineSession
  ],
  providers: [MessageService],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  orders: PurchaseOrderResponse[] = [];
  selectedOrder: PurchaseOrderResponse | null = null;
  showDetailsDialog: boolean = false;
  showExchangeDialog: boolean = false;
  loading: boolean = false;
  submittingExchange: boolean = false;

  selectedItems: number[] = [];
  exchangeType: 'EXCHANGE' | 'RETURN' = 'EXCHANGE';

  currentPage: number = 0;
  pageSize: number = 2;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private exchangeRequestService: ExchangeRequestService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(page: number = 0): void {
    this.loading = true;
    this.currentPage = page;

    this.purchaseOrderService.getAllPurchaseOrders(page, this.pageSize).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.orders = response.data.content;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os pedidos',
          life: 3000
        });
      }
    });
  }

  openDetails(order: PurchaseOrderResponse): void {
    this.selectedOrder = order;
    this.showDetailsDialog = true;
  }

  closeDetails(): void {
    this.showDetailsDialog = false;
    this.selectedOrder = null;
  }

  openExchangeDialog(order: PurchaseOrderResponse): void {
    this.selectedOrder = order;
    this.selectedItems = [];
    this.exchangeType = 'EXCHANGE';
    this.showExchangeDialog = true;
  }

  closeExchangeDialog(): void {
    this.showExchangeDialog = false;
    this.selectedOrder = null;
    this.selectedItems = [];
    this.exchangeType = 'EXCHANGE';
  }

  toggleItemSelection(itemId: number): void {
    const index = this.selectedItems.indexOf(itemId);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(itemId);
    }
  }

  isItemSelected(itemId: number): boolean {
    return this.selectedItems.includes(itemId);
  }

  canRequestExchange(order: PurchaseOrderResponse): boolean {
    return order.order_status.code === 'DELIVERED';
  }

  submitExchangeRequest(): void {
    if (!this.selectedOrder || this.selectedItems.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Selecione pelo menos um item para a solicitação',
        life: 3000
      });
      return;
    }

    this.submittingExchange = true;

    const payload: ExchangeRequestPayload = {
      purchaseOrder: this.selectedOrder.id,
      orderItensId: this.selectedItems,
      exchangeType: this.exchangeType
    };

    this.exchangeRequestService.createExchangeRequest(payload).subscribe({
      next: (response) => {
        this.submittingExchange = false;
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Solicitação Enviada!',
            detail: `Sua solicitação ${response.data.exchangeNumber} foi registrada com sucesso`,
            life: 5000
          });
          this.closeExchangeDialog();
        }
      },
      error: (error) => {
        this.submittingExchange = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível enviar a solicitação. Tente novamente.',
          life: 3000
        });
      }
    });
  }

  getSelectedItemsTotal(): number {
    if (!this.selectedOrder) return 0;

    return this.selectedOrder.items
      .filter(item => this.selectedItems.includes(item.id))
      .reduce((sum, item) => sum + parseFloat(item.subtotal.toString()), 0);
  }

  getTotalExchangeVouchersValue(): number {
    if (!this.selectedOrder || !this.selectedOrder.payment.exchange_vouchers) {
      return 0;
    }

    return this.selectedOrder.payment.exchange_vouchers.reduce((sum, voucher) => {
      return sum + parseFloat(voucher.amount);
    }, 0);
  }

  getStatusSeverity(statusCode: string): 'success' | 'info' | 'warning' | 'danger' {
    switch (statusCode) {
      case 'DELIVERED':
        return 'success';
      case 'SHIPPED':
        return 'info';
      case 'PROCESSING':
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'info';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  formatCurrency(value: string | number): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  }

  goBack(): void {
    this.router.navigate(['/minha-conta']);
  }

  getTotalItems(order: PurchaseOrderResponse): number {
    return order.pricing.total_items;
  }

  loadNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadOrders(this.currentPage + 1);
    }
  }

  loadPreviousPage(): void {
    if (this.currentPage > 0) {
      this.loadOrders(this.currentPage - 1);
    }
  }
}
