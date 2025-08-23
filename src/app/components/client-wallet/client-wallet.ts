import { Component } from '@angular/core';
import {Header} from '../../common/header/header';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-client-wallet',
  imports: [
    Header,
    Button,
    Card
  ],
  templateUrl: './client-wallet.html',
  styleUrl: './client-wallet.css'
})
export class ClientWallet {

}
