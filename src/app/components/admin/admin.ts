import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    Card,
    Button,
    PrimeTemplate,
    RouterLink
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

}
