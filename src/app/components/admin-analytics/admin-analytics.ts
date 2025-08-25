import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { InputText } from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {DecimalPipe} from '@angular/common';

type Period = 'daily' | 'weekly' | 'monthly';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [Card, Button, Select, ChartModule, InputText, FormsModule, DecimalPipe],
  templateUrl: './admin-analytics.html',
  styleUrl: './admin-analytics.css'
})
export class AdminAnalytics implements OnInit {
  periodOptions = [
    { name: 'Diário', value: 'daily' as Period },
    { name: 'Semanal', value: 'weekly' as Period },
    { name: 'Mensal', value: 'monthly' as Period },
  ];
  categoryOptions = [
    { name: 'Todos', value: 'all' },
    { name: 'Eletrônicos', value: 'electronics' },
    { name: 'Moda', value: 'fashion' },
    { name: 'Casa & Jardim', value: 'home' },
    { name: 'Esportes', value: 'sports' },
  ];
  regionOptions = [
    { name: 'Todas', value: 'all' },
    { name: 'Sudeste', value: 'southeast' },
    { name: 'Sul', value: 'south' },
    { name: 'Centro-Oeste', value: 'midwest' },
    { name: 'Nordeste', value: 'northeast' },
    { name: 'Norte', value: 'north' },
  ];

  selectedPeriod: Period = 'monthly';
  selectedCategory = 'all';
  selectedRegion = 'all';

  overview = {
    totalPurchases: 0,
    avgTicket: 0,
    activeCustomers: 0,
    repurchaseRate: 0
  };

  salesLineData: any;
  salesLineOptions: any;

  categoryDoughnutData: any;
  categoryDoughnutOptions: any;

  customerProfileBarData: any;
  customerProfileBarOptions: any;

  trendsStackedAreaData: any;
  trendsStackedAreaOptions: any;

  behaviorRadarData: any;
  behaviorRadarOptions: any;

  funnelBarData: any;
  funnelBarOptions: any;

  textColor = '';
  textColorSecondary = '';
  surfaceBorder = '';
  gridColor = '';

  ngOnInit(): void {
    this.resolveThemeColors();
    this.buildAll();
  }

  onFiltersChanged(): void {
    this.buildAll();
  }

  private resolveThemeColors() {
    const docStyle = getComputedStyle(document.documentElement);
    this.textColor = docStyle.getPropertyValue('--text-color').trim() || '#111827';
    this.textColorSecondary = docStyle.getPropertyValue('--text-color-secondary').trim() || '#6b7280';
    this.surfaceBorder = docStyle.getPropertyValue('--surface-border').trim() || '#e5e7eb';
    this.gridColor = docStyle.getPropertyValue('--surface-400').trim() || 'rgba(0,0,0,0.08)';
  }

  private buildAll() {
    const labels = this.getLabels(this.selectedPeriod);

    this.updateOverview();

    const sales = this.generateSeries(labels.length, 300, 2000);
    this.salesLineData = {
      labels,
      datasets: [
        {
          label: 'Vendas',
          data: sales,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.15)',
          tension: 0.35,
          fill: true,
        }
      ]
    };
    this.salesLineOptions = this.baseLineOptions('Volume de vendas no período');

    const catData = this.mockCategoryDistribution();
    this.categoryDoughnutData = {
      labels: ['Eletrônicos', 'Moda', 'Casa & Jardim', 'Esportes'],
      datasets: [
        {
          data: catData,
          backgroundColor: ['#6366f1', '#06b6d4', '#22c55e', '#f59e0b'],
          hoverBackgroundColor: ['#4f46e5', '#0891b2', '#16a34a', '#d97706']
        }
      ]
    };
    this.categoryDoughnutOptions = this.basePieOptions();

    const ages = ['18-24','25-34','35-44','45-54','55+'];
    const male = this.generateSeries(ages.length, 20, 200);
    const female = this.generateSeries(ages.length, 20, 220);
    this.customerProfileBarData = {
      labels: ages,
      datasets: [
        { label: 'Masculino', data: male, backgroundColor: '#3b82f6' },
        { label: 'Feminino',  data: female, backgroundColor: '#ef4444' }
      ]
    };
    this.customerProfileBarOptions = this.baseBarOptions('Volume de compras por faixa etária e gênero');

    const prodA = this.generateSeries(labels.length, 50, 300);
    const prodB = this.generateSeries(labels.length, 30, 240);
    const prodC = this.generateSeries(labels.length, 20, 200);
    this.trendsStackedAreaData = {
      labels,
      datasets: [
        { label: 'Produto A', data: prodA, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.25)', tension: 0.35, fill: true, stack: 'stack1' },
        { label: 'Produto B', data: prodB, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.25)',  tension: 0.35, fill: true, stack: 'stack1' },
        { label: 'Produto C', data: prodC, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.25)', tension: 0.35, fill: true, stack: 'stack1' },
      ]
    };
    this.trendsStackedAreaOptions = this.baseLineOptions('Produtos mais vendidos (área empilhada)', true);

    const behaviorLabels = ['Freq. Compras', 'Valor Médio', 'Variedade', 'Fidelidade', 'Carrinhos Abandonados', 'Devoluções'];
    this.behaviorRadarData = {
      labels: behaviorLabels,
      datasets: [
        {
          label: 'Perfil Geral',
          data: this.generateSeries(behaviorLabels.length, 20, 100),
          backgroundColor: 'rgba(99,102,241,0.25)',
          borderColor: '#6366f1',
          pointBackgroundColor: '#6366f1'
        }
      ]
    };
    this.behaviorRadarOptions = this.baseRadarOptions();

    const funnelStages = ['Visitantes', 'Carrinho', 'Checkout', 'Compra'];
    const funnelValues = this.mockFunnelData();
    this.funnelBarData = {
      labels: funnelStages,
      datasets: [
        {
          label: 'Etapas do funil',
          data: funnelValues,
          backgroundColor: ['#6366f1','#06b6d4','#22c55e','#3b82f6']
        }
      ]
    };
    this.funnelBarOptions = this.baseHorizontalBarOptions('Taxa de conversão por etapa');
  }

  private getLabels(period: Period): string[] {
    const now = new Date();
    if (period === 'daily') {
      return Array.from({ length: 14 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (13 - i));
        return d.toLocaleDateString();
      });
    }
    if (period === 'weekly') {
      return Array.from({ length: 8 }, (_, i) => `Sem ${i + 1}`);
    }
    return ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  }

  private generateSeries(n: number, min: number, max: number) {
    const arr = [] as number[];
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(min + Math.random() * (max - min)));
    }
    return arr;
  }

  private mockCategoryDistribution() {
    const base = [35, 25, 20, 20];
    if (this.selectedCategory !== 'all') {
      const map: any = { electronics: 0, fashion: 1, home: 2, sports: 3 };
      const idx = map[this.selectedCategory] ?? 0;
      base[idx] = base[idx] + 10;
    }
    return base;
  }

  private mockFunnelData() {
    const visitors = 10000;
    const cart = Math.round(visitors * 0.35);
    const checkout = Math.round(cart * 0.60);
    const purchase = Math.round(checkout * 0.85);
    return [visitors, cart, checkout, purchase];
  }

  private updateOverview() {
    const mult = this.selectedPeriod === 'daily' ? 1 : this.selectedPeriod === 'weekly' ? 5 : 22;
    this.overview = {
      totalPurchases: 4200 * mult,
      avgTicket: 278.45,
      activeCustomers: 860 * mult,
      repurchaseRate: 23.4
    };
  }

  private baseLineOptions(title?: string, stacked = false) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: this.textColor } },
        tooltip: { enabled: true },
        title: title ? { display: true, text: title, color: this.textColor } : undefined
      },
      scales: {
        x: {
          ticks: { color: this.textColorSecondary },
          grid: { color: this.gridColor }
        },
        y: {
          stacked,
          ticks: { color: this.textColorSecondary },
          grid: { color: this.gridColor }
        }
      }
    };
  }

  private basePieOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: this.textColor } },
        tooltip: { enabled: true }
      }
    };
  }

  private baseBarOptions(title?: string) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: this.textColor } },
        tooltip: { enabled: true },
        title: title ? { display: true, text: title, color: this.textColor } : undefined
      },
      scales: {
        x: {
          ticks: { color: this.textColorSecondary },
          grid: { color: this.gridColor }
        },
        y: {
          ticks: { color: this.textColorSecondary },
          grid: { color: this.gridColor }
        }
      }
    };
  }

  private baseHorizontalBarOptions(title?: string) {
    const opt = this.baseBarOptions(title);
    return {
      ...opt,
      indexAxis: 'y' as const
    };
  }

  private baseRadarOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: this.textColor } },
        tooltip: { enabled: true }
      },
      scales: {
        r: {
          grid: { color: this.gridColor },
          pointLabels: { color: this.textColorSecondary },
          angleLines: { color: this.gridColor }
        }
      }
    };
  }

  exportSalesCSV() {
    const rows = [['Período', 'Vendas']];
    this.salesLineData?.labels?.forEach((label: string, i: number) => {
      rows.push([label, this.salesLineData.datasets[0].data[i]]);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'vendas_por_periodo.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  get insightMessage(): string {
    return this.selectedCategory === 'electronics'
      ? 'Aumento de 20% nas vendas de eletrônicos na última semana.'
      : 'Tendência estável nas últimas 2 semanas.';
  }
}
