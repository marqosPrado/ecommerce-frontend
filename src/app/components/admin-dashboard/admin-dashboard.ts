import {Component, OnInit} from '@angular/core';
import {Header} from "../../common/header/header";
import {LineSession} from "../../common/line-session/line-session";
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    Header,
    LineSession,
    RouterLink,
    Button
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit{

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}
