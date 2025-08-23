import {Component, OnInit} from '@angular/core';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {Banner} from '../../common/banner/banner';
import {ProductCard} from '../../common/product-card/product-card';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';

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

  ngOnInit(): void {
    this.watches = this.getAllWatches();
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
    ];
  }

}
