import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Why } from '../models/why.model';

@Injectable({
  providedIn: 'root'
})
export class WhyService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/why';

  constructor(private http: HttpClient) {}

  retrieveWhys(): Observable<Why[]> {
    return this.http.get<Why[]>(`${this.apiUrl}/showall`);
  }

  retrieveWhy(id: string): Observable<Why> {
    return this.http.get<Why>(`${this.apiUrl}/show/${id}`);
  }

  addWhy(formData: FormData): Observable<Why> {
    return this.http.post<Why>(`${this.apiUrl}/add`, formData);
  }

  updateWhy(id: string, formData: FormData): Observable<Why> {
    return this.http.put<Why>(`${this.apiUrl}/update`, formData);
  }

  deleteWhy(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
