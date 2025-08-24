import {Component, OnInit} from '@angular/core';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {ProductCard} from '../../common/product-card/product-card';
import {Slider} from 'primeng/slider';

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

  ngOnInit(): void {
    this.products = this.getAllWatches();
  }

  getAllWatches(): Product[] {
    return [
      {
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
      },
      {
        id: 2,
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
      },
      {
        id: 3,
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
      },
      {
        id: 4,
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
      },
      {
        id: 5,
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
      },
      {
        id: 6,
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
      },
      {
        id: 7,
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
      },
      {
        id: 8,
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
      },
      {
        id: 9,
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
      },
      {
        id: 10,
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
      },
      {
        id: 11,
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
      },
      {
        id: 12,
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
      },
      {
        id: 13,
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
      },
    ];
  }
}
