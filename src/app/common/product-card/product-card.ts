import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [Button, DecimalPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() id!: number;
  @Input() title!: string;
  @Input() price!: number;
  @Input() url!: string;

  isHovered: boolean = false;
}
