import { Component } from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [
    InputText,
    Password,
    Button
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
