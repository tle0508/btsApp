import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/prices/';

  constructor(private http: HttpClient) {}
  getAllPrices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'getAllPrices');
  }

  updatePrice(numOfDistance: number, price: number): Observable<any> {
    const url = `${this.apiUrl}${numOfDistance}?price=${price}`;
    return this.http.put<any>(url, {});
  }
}
