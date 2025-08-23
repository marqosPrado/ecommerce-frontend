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
  watches: Watch[] = [];

  ngOnInit(): void {
    this.watches = this.getAllWatches();
  }

  getAllWatches(): Watch[] {
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
        dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h'
      },
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
        dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h'
      },
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
        dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h'
      },
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
        dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h'
      },
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
        dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h'
      },
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
        dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h'
      },
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
        dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h'
      },
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
        dial: 'Prata Sunray, indexes grandes e luminosos, calendário entre 4h e 5h'
      },
    ];
  }

}
