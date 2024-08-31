import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Whatif } from '../../models/dsdm_models/whatif.model';

@Injectable({
  providedIn: 'root'
})
export class WhatifService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/whatif';

  constructor(private http: HttpClient) {}

  retrieveWhatifs(): Observable<Whatif[]> {
    return this.http.get<Whatif[]>(`${this.apiUrl}/showall`);
  }

  retrieveWhatif(id: string): Observable<Whatif> {
    return this.http.get<Whatif>(`${this.apiUrl}/show/${id}`);
  }

  addWhatif(formData: FormData): Observable<Whatif> {
    return this.http.post<Whatif>(`${this.apiUrl}/add`, formData);
  }

  updateWhatif(id: string, formData: FormData): Observable<Whatif> {
    return this.http.put<Whatif>(`${this.apiUrl}/update`, formData);
  }

  deleteWhatif(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
