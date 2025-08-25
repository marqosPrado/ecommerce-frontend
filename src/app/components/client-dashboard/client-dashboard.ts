import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {Header} from '../../common/header/header';
import {LineSession} from '../../common/line-session/line-session';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  imports: [
    Button,
    Header,
    LineSession,
    RouterLink
  ],
  templateUrl: './client-dashboard.html',
  styleUrl: './client-dashboard.css'
})
export class ClientDashboard {

}
