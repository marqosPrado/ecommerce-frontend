import { Component, OnInit } from '@angular/core';
import { Header } from '../../common/header/header';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { ExchangeVoucherSummary } from '../../types/ExchangeVoucher/exchange-voucher-summary.type';
import { ExchangeVoucherService } from '../../services/exchange-voucher/exchange-voucher.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-client-exchange-vouchers',
  standalone: true,
  imports: [Header, Button, ProgressSpinner],
  templateUrl: './client-exchange-vouchers.html',
  styleUrl: './client-exchange-vouchers.css'
})
export class ClientExchangeVouchers implements OnInit {
  loading: boolean = false;
  protected exchangeVouchersSummary: ExchangeVoucherSummary[] = [];
  
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 6;
  totalElements: number = 0;
  
  constructor(
    private router: Router,
    private exchangeVoucherService: ExchangeVoucherService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadExchangeVouchers(this.currentPage);
  }

  loadExchangeVouchers(page: number): void {
    this.loading = true;
    
    this.exchangeVoucherService.getExchangeVouchers(page, this.pageSize).subscribe({
      next: (response) => {
        this.exchangeVouchersSummary = response.data.content;
        this.currentPage = response.data.number;
        this.totalPages = response.data.totalPages;
        this.totalElements = response.data.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar cupons:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os cupons de troca.'
        });
      }
    });
  }

  isNegative(amount: string): boolean {
    return parseFloat(amount) < 0;
  }

  formatCurrency(amount: string): string {
    const value = Math.abs(parseFloat(amount));
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  async copyCode(code: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      this.messageService.add({
        severity: 'success',
        summary: 'Copiado!',
        detail: `Código ${code} copiado para a área de transferência.`,
        life: 3000
      });
    } catch (error) {
      console.error('Erro ao copiar código:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível copiar o código.'
      });
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadExchangeVouchers(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadExchangeVouchers(this.currentPage + 1);
    }
  }

  goBack(): void {
    this.router.navigate(['/minha-conta']);
  }
}