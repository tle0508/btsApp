import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, takeLast } from 'rxjs';
import { Station } from '../Station';
import { Trip } from '../Trip';
import { TripExtension } from '../TripExtension';
import { environment } from '../API_URL/environments/environment.dev';
import { LineStation } from '../LineStation';

@Injectable({
	providedIn: 'root',
})
export class BtsService {

	public static API_URL = environment.apiUrl;

	constructor(private http: HttpClient) {}


	getStationByLimeGreenLineColor(): Promise<Station[]> {
		return lastValueFrom( this.http.get<Station[]>(`${BtsService.API_URL}bts/LineStation/1`));
	}

	getStationByBlueLineColor(): Promise<Station[]> {
		return lastValueFrom(this.http.get<Station[]>(`${BtsService.API_URL}bts/LineStation/2`));
	}
	
	getAllLineStations(): Promise<LineStation[]> {
		return lastValueFrom(this.http.get<LineStation[]>(`${BtsService.API_URL}lineStations/allLineStation`));
	  }

	getTripsByStartAndEndStation(startStationId: number, endStationId: number): Promise<Trip> {
		return lastValueFrom(this.http.get<Trip>(`${BtsService.API_URL}trip/TripsByStartAndEndStationId/${startStationId}/${endStationId}?startStationId=${startStationId}&endStationId=${endStationId}`));
	}
	getTripsExtensionByStartAndEndStation(startStationId: number, endStationId: number): Promise<TripExtension> {
		return lastValueFrom(this.http.get<TripExtension>(`${BtsService.API_URL}tripExtension/TripsByStartAndEndStationId/${startStationId}/${endStationId}?startStationId=${startStationId}&endStationId=${endStationId}`));
	}
}
