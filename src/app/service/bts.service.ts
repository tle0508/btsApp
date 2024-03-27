import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../Station';
import { Trip } from '../Trip';


@Injectable({
  providedIn: 'root',
})
export class BtsService {

  public static API_URL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}


  getStatioByLimeGreenLineColor(): Observable<Station[]> {
    return this.http.get<Station[]>(`${BtsService.API_URL}bts/getStationByLineColor/limegreen`);
  }

  getStatioByBlueLineColor(): Observable<Station[]> {
    return this.http.get<Station[]>(`${BtsService.API_URL}bts/getStationByLineColor/blue`);
  }

  getTripsByStartAndEndStation(startStationId: number, endStationId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${BtsService.API_URL}trip/getTripsByStartAndEndStationId/${startStationId}/${endStationId}?startStationId=${startStationId}&endStationId=${endStationId}`);
  }

}
