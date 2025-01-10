import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent 
{
  username: string = "";
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() 
  {
    this.authService.login(this.username, this.password).subscribe(
    {
      next: (response) => {
        console.log(response);
        if (response.token) 
        {  
          this.authService.storeToken(response.token); 
          this.authService.storeUserId(response.userId);
          this.router.navigate(['/form-list']);
        }
        else
        {
          this.errorMessage = 'Invalid credentials!';
        }
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Something went wrong. Please try again.';
      },
      complete: () => {
        console.log('Login request completed.');
      }
    });
  }
}
