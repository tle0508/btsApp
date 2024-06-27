import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Price } from '../Price';
import { BtsService } from './bts.service';


@Injectable({
	providedIn: 'root',
})
export class AdminService {

	constructor(private http: HttpClient) {}

	getAllPrices(): Promise<Price[]> {
		return lastValueFrom(this.http.get<Price[]>(`${BtsService.API_URL}prices/AllPrices`));
	}
	updatePrice(id: number, price: number): Promise<Price> {
		return lastValueFrom(this.http.put<Price>(`${BtsService.API_URL}prices/${id}?price=${price}`, {}));
		
	}
	getAllPricesExtension(): Promise<Price[]> {
		return lastValueFrom(this.http.get<Price[]>(`${BtsService.API_URL}pricesExtension/AllPrices`));
	}
	updatePriceExtension(id: number, price: number): Promise<Price> {
		return lastValueFrom(this.http.put<Price>(`${BtsService.API_URL}pricesExtension/${id}?price=${price}`, {}));
	}
}
