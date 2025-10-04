import {Component, OnInit} from '@angular/core';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Banner} from '../../common/banner/banner';
import {ProductCard} from '../../common/product-card/product-card';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {ProductService} from '../../services/product/product.service';

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
  watches: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.watches = this.getAllWatches();
  }

  getAllWatches(): Product[] {
    return this.productService.getAll()
  }

}
