import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-header',
  template: `
    <header class="app-header">
      <span class="app-title">Poke App</span>
      <nav>
        <a class="nav-link" routerLink="/">Home</a>
        <a class="nav-link" routerLink="/pokedex">PokéDex</a>
        <button
          *ngIf="!auth.isLoggedIn()"
          (click)="login()"
          class="btn"
        >
          Login
        </button>
        <button
          *ngIf="auth.isLoggedIn()"
          (click)="logout()"
          class="btn btn-danger"
        >
          Logout
        </button>
      </nav>
    </header>
  `,
  styleUrls: ['./header.css'],
  standalone: false,
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}