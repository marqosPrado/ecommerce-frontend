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
  protected product!: Product | undefined;
  protected aiRecommendations!: Product[];
  private productId!: number;
  private cartService: CartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')!);
    this.product = this.getProductById(this.productId);
    this.aiRecommendations = this.getAiRecommendations();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product)
  }

  private getProductById(id: number): Product | undefined {
    return this.productService.getById(id);
  }

  private getAiRecommendations(): Product[] {
    return [];
  }

}
