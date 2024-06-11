import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Price } from '../Price';
import { BtsService } from './bts.service';


@Injectable({
	providedIn: 'root',
})
export class AdminService {

	constructor(private http: HttpClient) {}

	getAllPrices(): Observable<Price[]> {
		return this.http.get<Price[]>(`${BtsService.API_URL}prices/getAllPrices`);
	}

	updatePrice(numOfDistance: number, price: number): Observable<Price> {
		return this.http.put<Price>(`${BtsService.API_URL}prices/${numOfDistance}/${price}`, {});
	}

	

	getAllPricesExtension(): Observable<Price[]> {
		return this.http.get<Price[]>(`${BtsService.API_URL}pricesExtension/getAllPrices`);
	}

	updatePriceExtension(numOfDistance: number, price: number): Observable<Price> {
		return this.http.put<Price>(`${BtsService.API_URL}pricesExtension/${numOfDistance}/${price}`, {});
	}

	
}
