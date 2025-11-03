import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Header} from "../../common/header/header";
import {LineSession} from "../../common/line-session/line-session";
import {Button} from 'primeng/button';
import {UserInfoResponse, UserInfoService} from '../../services/user/user-info.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    LineSession,
    RouterLink,
    Button
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  currentUser: UserInfoResponse | null = null;
  isAdmin: boolean = false;
  loading: boolean = true;

  constructor(
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    this.userInfoService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isAdmin = this.userInfoService.isAdmin();
        this.loading = false;

        // Se não for admin, redireciona para área do cliente
        if (!this.isAdmin && user) {
          console.warn('[Dashboard] Usuário não é admin, redirecionando...');
          this.router.navigate(['/minha-conta']);
        }
      },
      error: (error) => {
        console.error('[Dashboard] Erro ao carregar usuário:', error);
        this.loading = false;
        this.router.navigate(['/login']);
      }
    });
  }

  get userName(): string {
    return this.currentUser?.name || 'Administrador';
  }

  get userEmail(): string {
    return this.currentUser?.email || '';
  }
}
