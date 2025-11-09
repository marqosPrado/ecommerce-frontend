import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { ButtonDirective } from 'primeng/button';
import {Analytics} from '../../services/analytics/analytics';
import {SalesChartResponse} from '../../types/Analytics/sales-chart-response.type';
import {Header} from '../../common/header/header';
import {RouterLink} from '@angular/router';
import {LineSession} from '../../common/line-session/line-session';

interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    RouterLink,
    DatePicker,
    Select,
    ButtonDirective,
    Header,
    LineSession
  ],
  templateUrl: './admin-analytics.html',
  styleUrl: './admin-analytics.css'
})
export class AdminAnalytics implements OnInit {
  // Dados do gráfico
  salesChartData: any;
  salesChartOptions: any;

  // Filtros
  startDate: Date;
  endDate: Date;
  maxDate: Date = new Date(); // ← ADICIONE ESTA LINHA
  selectedFilter: string = 'BRAND';

  filterOptions: FilterOption[] = [
    { label: 'Por Produto', value: 'PRODUCT' },
    { label: 'Por Marca', value: 'BRAND' },
    { label: 'Por Linha', value: 'LINE' },
    { label: 'Por Estilo', value: 'STYLE' },
    { label: 'Por Mecanismo', value: 'MECHANISM' },
    { label: 'Por Gênero', value: 'GENDER' }
  ];

  // Estado
  loading: boolean = false;
  hasData: boolean = false;

  // Cores para as linhas do gráfico
  private chartColors: string[] = [
    '#2563eb', // Azul
    '#22c55e', // Verde
    '#f43f5e', // Vermelho
    '#fb923c', // Laranja
    '#8b5cf6', // Roxo
    '#3b82f6', // Azul claro
    '#facc15', // Amarelo
    '#4ade80', // Verde claro
  ];

  constructor(private analyticsService: Analytics) {
    // Define período padrão (últimos 90 dias)
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 90);
  }

  ngOnInit(): void {
    this.configureChartOptions();
    this.loadSalesData();
  }

  loadSalesData(): void {
    if (!this.startDate || !this.endDate) {
      return;
    }

    this.loading = true;
    this.hasData = false;

    const startDateStr = this.formatDate(this.startDate);
    const endDateStr = this.formatDate(this.endDate);

    this.analyticsService
      .getSalesVolume(startDateStr, endDateStr, this.selectedFilter)
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.buildChartData(response.data);
            this.hasData = response.data.series.length > 0;
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar dados de vendas:', error);
          this.loading = false;
        }
      });
  }

  buildChartData(data: SalesChartResponse): void {
    this.salesChartData = {
      labels: data.dates,
      datasets: data.series.map((serie, index) => ({
        label: serie.name,
        data: serie.values,
        borderColor: this.chartColors[index % this.chartColors.length],
        backgroundColor: this.addAlphaToColor(
          this.chartColors[index % this.chartColors.length],
          0.1
        ),
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: this.chartColors[index % this.chartColors.length],
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }))
    };
  }

  configureChartOptions(): void {
    this.salesChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15,
            color: '#e0e0e0',
            font: {
              size: 13,
              weight: '500',
              family: 'Inter'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          titleColor: '#e0e0e0',
          bodyColor: '#e0e0e0',
          borderColor: '#3f3f46',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (context: any) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${value} ${value === 1 ? 'unidade' : 'unidades'}`;
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Período',
            color: '#e0e0e0',
            font: {
              size: 14,
              weight: '600',
              family: 'Inter'
            }
          },
          ticks: {
            color: '#a0a0a0',
            maxRotation: 45,
            minRotation: 0,
            font: {
              family: 'Inter'
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Volume de Vendas',
            color: '#e0e0e0',
            font: {
              size: 14,
              weight: '600',
              family: 'Inter'
            }
          },
          beginAtZero: true,
          ticks: {
            color: '#a0a0a0',
            font: {
              family: 'Inter'
            },
            callback: (value: any) => {
              return value.toLocaleString('pt-BR');
            }
          },
          grid: {
            color: '#3f3f46',
            drawBorder: false
          }
        }
      }
    };
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addAlphaToColor(color: string, alpha: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  setLastMonth(): void {
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.loadSalesData();
  }

  setLast3Months(): void {
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 3);
    this.loadSalesData();
  }

  setLast6Months(): void {
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 6);
    this.loadSalesData();
  }

  setLastYear(): void {
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setFullYear(this.startDate.getFullYear() - 1);
    this.loadSalesData();
  }
}
