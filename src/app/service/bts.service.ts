import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../Station';
import { Trip } from '../Trip';
import { TripExtension } from '../TripExtension';
import { environment } from '../../environments/environment.dev';

@Injectable({
	providedIn: 'root',
})
export class BtsService {

	// public static API_URL = 'http://localhost:8080/api/';

	public static API_URL = environment.apiUrl;

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
	getTripsExtensionByStartAndEndStation(startStationId: number, endStationId: number): Observable<TripExtension[]> {
		return this.http.get<TripExtension[]>(`${BtsService.API_URL}tripExtension/getTripsByStartAndEndStationId/${startStationId}/${endStationId}?startStationId=${startStationId}&endStationId=${endStationId}`);
	}
}
