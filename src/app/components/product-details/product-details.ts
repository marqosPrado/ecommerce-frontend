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
    RouterLink
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  protected product?: Product;
  protected loading = true;
  protected error = '';

  protected aiRecommendations!: Product[];
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
    // this.aiRecommendations = this.getAiRecommendations();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
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

  private getAiRecommendations(): Product[] {
    return [];
  }

}
