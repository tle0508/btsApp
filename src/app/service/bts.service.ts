import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BtsService {
  private apiUrl = 'http://localhost:8080/api/bts/';
  constructor(private http: HttpClient) {}

  findByLimeGreenLineColor(): Observable<any[]> {
    const url = `${this.apiUrl}findByLineColor/limegreen`;
    return this.http.get<any[]>(url);
  }
  findByBlueLineColor(): Observable<any[]> {
    const url = `${this.apiUrl}findByLineColor/blue`;
    return this.http.get<any[]>(url);
  }
}
