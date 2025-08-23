import {Component, OnInit} from '@angular/core';
import {Header} from "../../common/header/header";
import {LineSession} from "../../common/line-session/line-session";
import {ActivatedRoute} from '@angular/router';
import {Gallery} from '../../common/gallery/gallery';
import {ProductTableDetails} from '../../common/product-table-details/product-table-details';

@Component({
  selector: 'app-product-details',
  imports: [
    Header,
    LineSession,
    Gallery,
    ProductTableDetails,
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  protected product!: Product;
  private productId!: number;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')!);
    this.product = this.getProductById(this.productId);
  }

  private getProductById(id: number): Product {
    return {
      id: 1,
      title: 'Relógio Orient Submariner',
      price: 1999.00,
      gender: 'Masculino',
      line: 'Automático',
      style: 'Diver',
      mechanism: 'Cronógrafo',
      boxFormat: 'Redonda – 40 mm de diâmetro, 11 mm de espessura',
      boxMaterial: 'Aço Inox',
      dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h',
      images: [
        'https://golden.vtexassets.com/arquivos/ids/2939097-800-800/Relogio-Masculino-Solar-Tech-Orient-Prata-MBSS1448-P2SX.jpg?v=638914216648270000',
        'https://golden.vtexassets.com/arquivos/ids/2939098-800-800/Relogio-Masculino-Solar-Tech-Orient-Prata-MBSS1448-P2SX.jpg?v=638914216676130000',
        'https://golden.vtexassets.com/arquivos/ids/2939099-800-800/Relogio-Masculino-Solar-Tech-Orient-Prata-MBSS1448-P2SX.jpg?v=638914216696300000',
        'https://golden.vtexassets.com/arquivos/ids/2939100-800-800/Relogio-Masculino-Solar-Tech-Orient-Prata-MBSS1448-P2SX.jpg?v=638914216717570000',
        'https://golden.vtexassets.com/arquivos/ids/2939101-800-800/Relogio-Masculino-Solar-Tech-Orient-Prata-MBSS1448-P2SX.jpg?v=638914216788900000',
      ]
    };
  }

}
