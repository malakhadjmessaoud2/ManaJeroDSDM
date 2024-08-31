import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advantage } from '../../models/dsdm_models/advantage.model';

@Injectable({
  providedIn: 'root'
})
export class AdvantageService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/advantage';

  constructor(private http: HttpClient) {}

  retrieveAdvantages(): Observable<Advantage[]> {
    return this.http.get<Advantage[]>(`${this.apiUrl}/showall`);
  }

  retrieveAdvantage(id: string): Observable<Advantage> {
    return this.http.get<Advantage>(`${this.apiUrl}/show/${id}`);
  }

  addAdvantage(formData: FormData): Observable<Advantage> {
    return this.http.post<Advantage>(`${this.apiUrl}/add`, formData);
  }

  updateAdvantage(id: string, formData: FormData): Observable<Advantage> {
    return this.http.put<Advantage>(`${this.apiUrl}/update`, formData);
  }

  deleteAdvantage(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
