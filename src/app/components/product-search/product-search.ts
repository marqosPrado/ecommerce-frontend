import {Component, OnInit} from '@angular/core';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {ProductCard} from '../../common/product-card/product-card';
import {Slider} from 'primeng/slider';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-product-search',
  imports: [
    Header,
    LineSession,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    ProductCard,
    Slider
  ],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css'
})
export class ProductSearch implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.products = this.getAllWatches();
  }

  getAllWatches(): Product[] {
    return this.productService.getAll();
  }
}
