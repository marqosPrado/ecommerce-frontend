import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { Header } from '../../common/header/header';
import { LineSession } from '../../common/line-session/line-session';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';
import { PurchaseOrderResponse } from '../../types/Purchase/Response/PurchaseOrderResponse';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Tag,
    Dialog,
    Divider,
    Header,
    LineSession
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  orders: PurchaseOrderResponse[] = [];
  selectedOrder: PurchaseOrderResponse | null = null;
  showDetailsDialog: boolean = false;
  loading: boolean = false;

  currentPage: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private purchaseOrderService: PurchaseOrderService
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
        console.error('Erro ao carregar pedidos:', error);
        this.loading = false;
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
