import {Component, Input} from '@angular/core';
import { Button } from 'primeng/button';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [Button, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() title!: string;
  @Input() price!: number;
}
