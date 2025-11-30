import {Component, inject, OnInit} from '@angular/core';
import {Header} from "../../common/header/header";
import {LineSession} from "../../common/line-session/line-session";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Gallery} from '../../common/gallery/gallery';
import {ProductTableDetails} from '../../common/product-table-details/product-table-details';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {ProductCard} from '../../common/product-card/product-card';
import {CartService} from '../../services/cart/cart.service';
import {ProductService} from '../../services/product/product.service';
import {ProductSummaryResponse} from '../../types/Product/Response/ProductSummaryResponse';
import {ProgressSpinner} from 'primeng/progressspinner';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [
    Header,
    LineSession,
    Gallery,
    ProductTableDetails,
    Button,
    InputText,
    Carousel,
    PrimeTemplate,
    ProductCard,
    RouterLink,
    ProgressSpinner,
    DecimalPipe
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  protected product?: Product;

  protected productRecommendedByAi?: ProductSummaryResponse[] = [];
  protected errorAiRecommendations: string[] = []

  protected loading = false;
  protected loadingAiRecommendations = false; // Novo estado para IA
  protected error = '';

  protected addedToCart = false;

  private cartService: CartService = inject(CartService);

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.getProductById(id);
      }
    });
    this.getAiRecommendations();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.addedToCart = true;
    setTimeout(() => this.addedToCart = false, 2000);
  }

  private getProductById(id: number): void {
    this.loading = true;
    this.productService.getById(id).subscribe({
      next: response => {
        this.product = response.data;
        this.loading = false;
      },
      error: error => {
        console.error('Erro ao buscar produto:', error);
        this.error = 'Erro ao carregar produto';
        this.loading = false;
      }
    });
  }

  private getAiRecommendations() {
    this.loadingAiRecommendations = true;
    this.productService.getIARecommendation().subscribe({
      next: response => {
        this.productRecommendedByAi = response.data;
        this.loadingAiRecommendations = false;
      },

      error: error => {
        console.error('Erro ao buscar recomendações da IA:', error);
        this.errorAiRecommendations = error.message;
        this.loadingAiRecommendations = false;
      }
    })
  }
}
