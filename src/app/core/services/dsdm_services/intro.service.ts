import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intro } from '../../models/dsdm_models/intro.model';

@Injectable({
  providedIn: 'root'
})
export class IntroService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/introduction';

  constructor(private http: HttpClient) {}

  retrieveIntros(): Observable<Intro[]> {
    return this.http.get<Intro[]>(`${this.apiUrl}/showall`);
  }


  addIntro(formData: FormData): Observable<any> {
    return this.http.post<Intro>(`${this.apiUrl}/add`, formData);
  }



  // updateIntro(id: string, formData: FormData): Observable<Intro> {
  //   return this.http.put<Intro>(`${this.apiUrl}/update`, formData);
  // }

  updateIntro(formData: FormData): Observable<Intro> {
    return this.http.put<Intro>(`${this.apiUrl}/update`, formData);
  }


  deleteIntro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

}
