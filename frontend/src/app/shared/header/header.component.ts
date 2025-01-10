import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent 
{
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void 
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean 
  {
    return this.authService.isAuthenticated();
  }


  get isLoggedIn(): boolean 
  {
    return this.authService.isLoggedIn();
  }
}
