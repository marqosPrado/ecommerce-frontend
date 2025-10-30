import {Component} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {Authentication} from '../../services/authentication/authentication';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    InputText,
    Password,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

  authenticationError: boolean = false;
  loading: boolean = false;

  constructor(
    private authenticationService: Authentication,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  submitLogin(): void {
    this.loading = true;
    this.authenticationService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.authenticationService.setToken(response.data.token);
          this.router.navigate(['/']);
          console.log('login success');
        },

        error: err => {
          this.authenticationError = true;
          this.loading = false;
          console.log(err);
        },

        complete: () => {
          this.loading = false;
        }
      })
  }
}
