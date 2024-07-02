import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, takeLast } from 'rxjs';
import { Station } from '../Station';
import { Trip } from '../Trip';
import { TripExtension } from '../TripExtension';
import { environment } from '../API_URL/environments/environment.dev';
import { LineStation } from '../LineStation';
import { Price } from '../Price';

@Injectable({
	providedIn: 'root',
})
export class BtsService {

	public static API_URL = environment.apiUrl;

	constructor(private http: HttpClient) {}


	getStationByid(id:number): Promise<Station[]> {
		return lastValueFrom( this.http.get<Station[]>(`${BtsService.API_URL}bts/LineStation/${id}`));
	}

	getAllLineStations(): Promise<LineStation[]> {
		return lastValueFrom(this.http.get<LineStation[]>(`${BtsService.API_URL}LineStations/AllLineStation`));
	  }

	getTripsByStartAndEndStation(startStationId: number, endStationId: number): Promise<Trip> {
		return lastValueFrom(this.http.get<Trip>(`${BtsService.API_URL}trip/TripsByStartAndEndStationId/${startStationId}/${endStationId}?startStationId=${startStationId}&endStationId=${endStationId}`));
	}
	
	getPricebyId(id:number):Promise<Price>{
		return lastValueFrom(this.http.get<Price>(`${BtsService.API_URL}prices/Price/${id}`))
	}
}
