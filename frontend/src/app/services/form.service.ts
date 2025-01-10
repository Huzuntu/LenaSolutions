import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = `${environment.apiUrl}/api/form`;

  constructor(private http: HttpClient) {}

  getForms(): Observable<any> 
  {
    return this.http.get(`${this.apiUrl}/list`);
  }

  createForm(form: any): Observable<any> 
  {
    return this.http.post(`${this.apiUrl}/create`, form);
  }

  getFormById(formId: number): Observable<any> 
  {
    return this.http.get(`${this.apiUrl}/view/${formId}`);
  }

  deleteForm(id: number): Observable<any> 
  {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
