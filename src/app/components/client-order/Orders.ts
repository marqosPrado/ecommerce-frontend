import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { Header } from '../../common/header/header';
import { LineSession } from '../../common/line-session/line-session';
import { Purchase, PurchaseStatus } from '../../types/Purchase';

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
  purchases: Purchase[] = [];
  selectedPurchase: Purchase | null = null;
  showDetailsDialog: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    const storedPurchases = localStorage.getItem('purchases');
    if (storedPurchases) {
      this.purchases = JSON.parse(storedPurchases);
      // Ordena por data (mais recente primeiro)
      this.purchases.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }

  openDetails(purchase: Purchase): void {
    this.selectedPurchase = purchase;
    this.showDetailsDialog = true;
  }

  closeDetails(): void {
    this.showDetailsDialog = false;
    this.selectedPurchase = null;
  }

  getStatusSeverity(status?: PurchaseStatus): 'success' | 'info' | 'warning' | 'danger' {
    switch (status) {
      case PurchaseStatus.DELIVERED:
        return 'success';
      case PurchaseStatus.SHIPPED:
        return 'info';
      case PurchaseStatus.PROCESSING:
      case PurchaseStatus.PENDING:
        return 'warning';
      case PurchaseStatus.CANCELLED:
        return 'danger';
      default:
        return 'info';
    }
  }

  getStatusLabel(status?: PurchaseStatus): string {
    return status || PurchaseStatus.CONFIRMED;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  goBack(): void {
    this.router.navigate(['/minha-conta']);
  }

  getTotalItems(purchase: Purchase): number {
    return purchase.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
