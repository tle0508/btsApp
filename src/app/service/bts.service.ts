import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BtsService {
  private apiUrl = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {}

  findByLimeGreenLineColor(): Observable<any[]> {
    const url = `${this.apiUrl}bts/findByLineColor/limegreen`;
    return this.http.get<any[]>(url);
  }
  findByBlueLineColor(): Observable<any[]> {
    const url = `${this.apiUrl}bts/findByLineColor/blue`;
    return this.http.get<any[]>(url);
  }
  getTripsByStartAndEndStationNormalType(startStationId: number, endStationId: number): Observable<any[]> {
    const url = `${this.apiUrl}trip/findByStartAndEndStationNormalType/{startStationId}/{endStationId}?startStationId=${startStationId}&endStationId=${endStationId}`;
    return this.http.get<any[]>(url);
  }
  getTripsByStartAndEndStationSpecialType(startStationId: number, endStationId: number): Observable<any[]> {
    const url = `${this.apiUrl}trip/findTripsByStartAndEndStationSpecialType/{startStationId}/{endStationId}?startStationId=${startStationId}&endStationId=${endStationId}`;
    return this.http.get<any[]>(url);
  }
}
