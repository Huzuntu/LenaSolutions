import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/account`;
  

  constructor(private http: HttpClient) {}

  getUserId(): string {
    const userIdString = localStorage.getItem('user_id');
    if (userIdString) 
    {
      console.log(userIdString); 
      return userIdString; 
    }
    return ''; 
  }

  login(username: string, password: string): Observable<any> 
  {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.token); 
        localStorage.setItem('user_id', response.userId); 
      })
    );
  }

  signup(email: string, password: string): Observable<any> 
  {
    const body = { email, password }; 
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  register(user: User): Observable<AuthResponse> 
  {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  
  storeToken(token: string): void 
  {
    localStorage.setItem('auth_token', token);
  }

  storeUserId(userId: string): void 
  {
    console.log("User Id: " + userId);
    localStorage.setItem('user_id', userId);
  }

  
  getToken(): string | null 
  {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean 
  {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean 
  {
    console.log("Is logged: ", !!localStorage.getItem('user_id'));
    return !!localStorage.getItem('user_id');  
  }

  logout(): void 
  {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id'); 
    localStorage.removeItem('auth_token');
  }
}
