import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user: User = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void 
  {
    this.authService.register(this.user).subscribe(() => 
      {
        this.router.navigate(['/login']);
      },
      (error) => 
      {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error(error);
      }
    );
  }
}
