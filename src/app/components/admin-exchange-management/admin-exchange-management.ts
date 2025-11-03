import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Tag } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { Header } from '../../common/header/header';
import { LineSession } from '../../common/line-session/line-session';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  ExchangeRequestService,
  ExchangeRequestResponse
} from '../../services/exchange-request/exchange-request.service';

@Component({
  selector: 'app-admin-exchange-management',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialog,
    Toast,
    Tag,
    Dialog,
    Button,
    Tooltip,
    TableModule,
    Card,
    RouterLink,
    Header,
    LineSession
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './admin-exchange-management.html',
  styleUrl: './admin-exchange-management.css'
})
export class AdminExchangesManagement implements OnInit {
  exchanges: ExchangeRequestResponse[] = [];
  totalRecords = 0;
  loading = false;
  selectedStatus: string | null = 'PENDING';
  displayExchangeDetails = false;
  selectedExchange: ExchangeRequestResponse | null = null;

  constructor(
    private exchangeService: ExchangeRequestService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Carrega exchanges ao inicializar
    this.loadExchanges({ first: 0, rows: 10 });
  }

  loadExchanges(event: TableLazyLoadEvent) {
    this.loading = true;
    const page = event.first! / event.rows!;
    const size = event.rows!;

    this.exchangeService.getAll(page, size, this.selectedStatus || undefined).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.exchanges = response.data.content;
          this.totalRecords = response.data.totalElements;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar trocas:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar as solicitações de troca.',
          life: 3000
        });
        this.loading = false;
      }
    });
  }

  filterByStatus(status: string | null) {
    this.selectedStatus = status;
    this.loadExchanges({ first: 0, rows: 10 });
  }

  confirmApprove(exchange: ExchangeRequestResponse) {
    this.confirmationService.confirm({
      header: 'Aprovar Solicitação',
      message: `Confirmar aprovação da solicitação ${exchange.exchangeNumber}?`,
      icon: 'pi pi-question-circle',
      acceptLabel: 'Aprovar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => this.approveExchange(exchange.id)
    });
  }

  confirmReject(exchange: ExchangeRequestResponse) {
    this.confirmationService.confirm({
      header: 'Rejeitar Solicitação',
      message: `Confirmar rejeição da solicitação ${exchange.exchangeNumber}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Rejeitar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.rejectExchange(exchange.id)
    });
  }

  confirmInTransit(exchange: ExchangeRequestResponse) {
    this.confirmationService.confirm({
      header: 'Marcar Em Trânsito',
      message: 'Confirmar que o produto está retornando?',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-info',
      accept: () => this.markInTransit(exchange.id)
    });
  }

  confirmReceived(exchange: ExchangeRequestResponse) {
    this.confirmationService.confirm({
      header: 'Confirmar Recebimento',
      message: 'Confirmar que os itens foram recebidos?',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-info',
      accept: () => this.confirmItemsReceived(exchange.id)
    });
  }

  confirmComplete(exchange: ExchangeRequestResponse) {
    this.confirmationService.confirm({
      header: 'Finalizar e Gerar Cupom',
      message: `Finalizar a troca e gerar cupom de ${this.formatCurrency(exchange.exchangeValue)}?`,
      icon: 'pi pi-ticket',
      acceptLabel: 'Gerar Cupom',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => this.completeExchange(exchange.id)
    });
  }

  approveExchange(exchangeId: number) {
    this.exchangeService.approve(exchangeId).subscribe({
      next: (response) => {
        if (response.success) {
          this.updateExchangeInList(response.data);
          this.messageService.add({
            severity: 'success',
            summary: 'Aprovada',
            detail: `Solicitação ${response.data.exchangeNumber} aprovada com sucesso!`,
            life: 3000
          });
        }
      },
      error: (err) => {
        console.error('Erro ao aprovar:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível aprovar a solicitação.',
          life: 3000
        });
      }
    });
  }

  rejectExchange(exchangeId: number) {
    this.exchangeService.reject(exchangeId).subscribe({
      next: (response) => {
        if (response.success) {
          this.updateExchangeInList(response.data);
          this.messageService.add({
            severity: 'warn',
            summary: 'Rejeitada',
            detail: `Solicitação ${response.data.exchangeNumber} foi rejeitada.`,
            life: 3000
          });
        }
      },
      error: (err) => {
        console.error('Erro ao rejeitar:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível rejeitar a solicitação.',
          life: 3000
        });
      }
    });
  }

  markInTransit(exchangeId: number) {
    this.exchangeService.markInTransit(exchangeId).subscribe({
      next: (response) => {
        if (response.success) {
          this.updateExchangeInList(response.data);
          this.messageService.add({
            severity: 'info',
            summary: 'Em Trânsito',
            detail: 'Status atualizado: produto está retornando.',
            life: 3000
          });
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar status:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o status.',
          life: 3000
        });
      }
    });
  }

  confirmItemsReceived(exchangeId: number) {
    this.exchangeService.confirmItemsReceived(exchangeId).subscribe({
      next: (response) => {
        if (response.success) {
          this.updateExchangeInList(response.data);
          this.messageService.add({
            severity: 'success',
            summary: 'Recebido',
            detail: 'Recebimento dos itens confirmado com sucesso!',
            life: 3000
          });
        }
      },
      error: (err) => {
        console.error('Erro ao confirmar recebimento:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível confirmar o recebimento.',
          life: 3000
        });
      }
    });
  }

  completeExchange(exchangeId: number) {
    this.exchangeService.complete(exchangeId).subscribe({
      next: (response) => {
        if (response.success) {
          this.updateExchangeInList(response.data);
          this.messageService.add({
            severity: 'success',
            summary: 'Concluída!',
            detail: `Cupom ${response.data.voucherGenerated} gerado com sucesso!`,
            life: 5000
          });
        }
      },
      error: (err) => {
        console.error('Erro ao finalizar:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível finalizar a troca.',
          life: 3000
        });
      }
    });
  }

  showExchangeDetails(exchange: ExchangeRequestResponse) {
    this.selectedExchange = exchange;
    this.displayExchangeDetails = true;
  }

  private updateExchangeInList(updatedExchange: ExchangeRequestResponse) {
    const index = this.exchanges.findIndex(e => e.id === updatedExchange.id);
    if (index !== -1) {
      this.exchanges[index] = updatedExchange;
    }
  }

  getPendingCount(): number {
    return this.exchanges.filter(e => e.exchangeStatus === 'PENDING').length;
  }

  getStatusSeverity(status: string): 'success' | 'danger' | 'warning' | 'info' {
    const map: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
      'PENDING': 'warning',
      'APPROVED': 'success',
      'REJECTED': 'danger',
      'IN_TRANSIT': 'info',
      'ITEMS_RECEIVED': 'info',
      'COMPLETED': 'success',
      'CANCELLED': 'danger'
    };
    return map[status] || 'info';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'Pendente',
      'APPROVED': 'Aprovada',
      'REJECTED': 'Rejeitada',
      'IN_TRANSIT': 'Em Trânsito',
      'ITEMS_RECEIVED': 'Recebida',
      'COMPLETED': 'Concluída',
      'CANCELLED': 'Cancelada'
    };
    return map[status] || status;
  }

  getStatusIcon(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'pi pi-clock',
      'APPROVED': 'pi pi-check',
      'REJECTED': 'pi pi-times',
      'IN_TRANSIT': 'pi pi-truck',
      'ITEMS_RECEIVED': 'pi pi-inbox',
      'COMPLETED': 'pi pi-check-circle',
      'CANCELLED': 'pi pi-ban'
    };
    return map[status] || 'pi pi-info-circle';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
