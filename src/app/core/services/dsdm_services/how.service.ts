import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { How } from '../../models/dsdm_models/how.model';

@Injectable({
  providedIn: 'root'
})
export class HowService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/how';

  constructor(private http: HttpClient) {}

  retrieveHows(): Observable<How[]> {
    return this.http.get<How[]>(`${this.apiUrl}/showall`);
  }

  retrieveHow(id: string): Observable<How> {
    return this.http.get<How>(`${this.apiUrl}/show/${id}`);
  }

  addHow(formData: FormData): Observable<How> {
    return this.http.post<How>(`${this.apiUrl}/add`, formData);
  }

  updateHow(id: string, formData: FormData): Observable<How> {
    return this.http.put<How>(`${this.apiUrl}/update`, formData);
  }

  deleteHow(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
