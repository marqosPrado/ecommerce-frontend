import {Component} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {Authentication} from '../../services/authentication/authentication';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
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
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulário Inválido',
        detail: 'Por favor, preencha todos os campos corretamente.',
        life: 3000
      });
      return;
    }

    this.loading = true;
    this.authenticationError = false;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authenticationService.login(email, password).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Login realizado!',
          detail: `Bem-vindo, ${data.user.fullName}!`,
          life: 3000
        });

        // Redireciona baseado na role do usuário retornada
        if (data.user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.authenticationError = true;
        this.loading = false;
        console.error('[Login] Erro ao fazer login:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
