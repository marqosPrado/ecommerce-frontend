import {Component, OnInit} from '@angular/core';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Banner} from '../../common/banner/banner';
import {ProductCard} from '../../common/product-card/product-card';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {Button} from 'primeng/button';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product/product.service';
import {ProductSummaryResponse} from '../../types/Product/Response/ProductSummaryResponse';

interface Brand {
  name: string;
  count: number;
}

interface SortOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    Header,
    LineSession,
    Banner,
    ProductCard,
    Carousel,
    PrimeTemplate,
    Button,
    Select,
    FormsModule
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit {
  watches: ProductSummaryResponse[] = [];
  featuredWatches: ProductSummaryResponse[] = [];
  brands: Brand[] = [];

  loadingAll: boolean = false;
  loadingFeatured: boolean = false;

  selectedSort: SortOption | null = null;
  sortOptions: SortOption[] = [
    { label: 'Mais Recentes', value: 'newest' },
    { label: 'Menor Preço', value: 'price_asc' },
    { label: 'Maior Preço', value: 'price_desc' },
    { label: 'A-Z', value: 'name_asc' },
    { label: 'Z-A', value: 'name_desc' }
  ];

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadFeaturedProducts();
  }

  /**
   * Carrega todos os produtos
   */
  private loadProducts(): void {
    this.loadingAll = true;

    this.productService.getAll().subscribe({
      next: response => {
        this.watches = response.data.content;
        this.extractBrands();
        this.loadingAll = false;
        console.log('Produtos carregados:', this.watches);
      },
      error: error => {
        console.error('Erro ao carregar produtos:', error);
        this.loadingAll = false;
      }
    });
  }

  /**
   * Carrega produtos em destaque (primeiros 8)
   */
  private loadFeaturedProducts(): void {
    this.loadingFeatured = true;

    this.productService.getAll().subscribe({
      next: response => {
        // Pega os primeiros 8 produtos como destaque
        this.featuredWatches = response.data.content.slice(0, 8);
        this.loadingFeatured = false;
      },
      error: error => {
        console.error('Erro ao carregar produtos em destaque:', error);
        this.loadingFeatured = false;
      }
    });
  }

  /**
   * Extrai marcas únicas dos produtos e conta quantos de cada
   */
  private extractBrands(): void {
    const brandMap = new Map<string, number>();

    this.watches.forEach(watch => {
      const brand = watch.brand || 'Outros';
      brandMap.set(brand, (brandMap.get(brand) || 0) + 1);
    });

    this.brands = Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count) // Ordena por quantidade (descendente)
      .slice(0, 6); // Pega as 6 marcas mais populares
  }

  /**
   * Filtra produtos por marca
   */
  filterByBrand(brandName: string): void {
    console.log('Filtrar por marca:', brandName);
    // Aqui você pode implementar a navegação para uma página de filtro
    // ou aplicar filtro localmente
    // Exemplo: this.router.navigate(['/produtos'], { queryParams: { brand: brandName } });
  }

  /**
   * Aplica ordenação aos produtos
   */
  private applySorting(): void {
    if (!this.selectedSort) return;

    switch (this.selectedSort.value) {
      case 'price_asc':
        this.watches.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price_desc':
        this.watches.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name_asc':
        this.watches.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name_desc':
        this.watches.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        // Se tiver campo de data, ordenar por ele
        // Caso contrário, manter ordem original
        break;
    }
  }

  /**
   * Observer para mudanças no filtro de ordenação
   */
  ngAfterViewInit(): void {
    // Se quiser aplicar ordenação automaticamente ao mudar o select
    // pode usar um watcher aqui
  }

  protected readonly Number = Number;
}
