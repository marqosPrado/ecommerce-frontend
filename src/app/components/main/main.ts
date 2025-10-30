import {Component, OnInit} from '@angular/core';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Banner} from '../../common/banner/banner';
import {ProductCard} from '../../common/product-card/product-card';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {ProductService} from '../../services/product/product.service';
import {ProductSummaryResponse} from '../../types/Product/Response/ProductSummaryResponse';

@Component({
  selector: 'app-main',
  imports: [
    Header,
    LineSession,
    Banner,
    ProductCard,
    Carousel,
    PrimeTemplate
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit {
  watches: ProductSummaryResponse[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: response => {
        this.watches = response.data.content
        console.log(this.watches);
      },

      error: error => {
        console.log(error);
      }
    })
  }

}
