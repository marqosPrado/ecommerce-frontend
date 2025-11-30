import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Authentication } from '../../services/authentication/authentication';
import { UserInfoResponse, UserInfoService } from '../../services/user/user-info.service';
import { ChatSidebar } from '../chat-sidebar/chat-sidebar';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CartService } from '../../services/cart/cart.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ChatSidebar, BadgeModule, OverlayBadgeModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  currentUser: UserInfoResponse | null = null;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  showUserMenu: boolean = false;
  showChatSidebar: boolean = false;

  cartItemCount$: Observable<number>;

  constructor(
    private userInfoService: UserInfoService,
    private authService: Authentication,
    private router: Router,
    private cartService: CartService
  ) {
    this.cartItemCount$ = this.cartService.items$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadUserInfo();
  }

  private checkAuthentication(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (!isAuth) {
        this.currentUser = null;
        this.isAdmin = false;
      }
    });
  }

  private loadUserInfo(): void {
    if (!this.isAuthenticated) return;

    this.userInfoService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isAdmin = this.userInfoService.isAdmin();
        console.log('[Header] Usuário atualizado:', {
          user: user?.fullName,
          role: user?.role,
          isAdmin: this.isAdmin
        });
      }
    });

    const currentUser = this.userInfoService.getCurrentUserValue();
    if (!currentUser && this.isAuthenticated) {
      this.userInfoService.getCurrentUser().subscribe({
        error: (err) => {
          console.error('[Header] Erro ao carregar usuário:', err);
        }
      });
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
    this.currentUser = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.showUserMenu = false;
    this.router.navigate(['/login']);
  }

  get userInitials(): string {
    const name = this.currentUser?.fullName || this.currentUser?.name;
    if (!name) return 'U';

    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  }

  get userName(): string {
    return this.currentUser?.fullName || this.currentUser?.name || 'Usuário';
  }

  get userEmail(): string {
    return this.currentUser?.email || '';
  }

  toggleChatSidebar(): void {
    this.showChatSidebar = !this.showChatSidebar;
  }

  closeChatSidebar(): void {
    this.showChatSidebar = false;
  }
}
