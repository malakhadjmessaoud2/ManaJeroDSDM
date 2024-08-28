import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Composant } from '../models/composant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComposantService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/composant';

  constructor(private http: HttpClient) {}


  updateComposant(id: string, formData: FormData): Observable<Composant> {
    return this.http.put<Composant>(`${this.apiUrl}/update`, formData);
  }


  addComposant(formData: FormData): Observable<any>{
    return this.http.post<Composant>(`${this.apiUrl}/add`, formData);
  }


  retrieveComposant(idComposant: string): Observable<Composant> {
    return this.http.get<Composant>(`${this.apiUrl}/show/${idComposant}`);
  }

  retrieveComposants(): Observable<Composant[]> {
    return this.http.get<Composant[]>(`${this.apiUrl}/showall`);
  }

  // updateComposant(composant: Composant): Observable<Composant> {
  //   return this.http.put<Composant>(`${this.apiUrl}/update`, composant);
  // }


  // updateComposant(id: string, formData: FormData): Observable<any> {
  //   return this.http.put(`http://localhost:9090/composant/update/${id}`, formData);
  // }



  removeComposant(idComposant: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idComposant}`);
  }
}
