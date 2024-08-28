import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Limitation } from '../models/limitation.model';

@Injectable({
  providedIn: 'root'
})
export class LimitationService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/limitation';

  constructor(private http: HttpClient) {}

  retrieveLimitations(): Observable<Limitation[]> {
    return this.http.get<Limitation[]>(`${this.apiUrl}/showall`);
  }

  retrieveLimitation(id: string): Observable<Limitation> {
    return this.http.get<Limitation>(`${this.apiUrl}/show/${id}`);
  }

  addLimitation(formData: FormData): Observable<Limitation> {
    return this.http.post<Limitation>(`${this.apiUrl}/add`, formData);
  }

  updateLimitation(id: string, formData: FormData): Observable<Limitation> {
    return this.http.put<Limitation>(`${this.apiUrl}/update`, formData);
  }

  deleteLimitation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
