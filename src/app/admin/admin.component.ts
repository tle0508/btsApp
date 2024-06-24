import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { AdminService } from '../service/admin.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {

	priceForm = new FormGroup({	
		price: new FormControl("", [
		  Validators.required,
		]),
	});
	
	constructor(
		private adminService: AdminService,
		private modalService: NgbModal,
		private location : Location
	) {}

	prices: any[] = [];
	priceExtension :any[]= [];
	showModal = false;
	selectedPrice: any;
	updatedPrice!: number;

	ngOnInit(): void {
		this.getAllPrices();
		this.getAllPricesExtension();
	}

	getAllPrices(): void {
		this.adminService.getAllPrices()
			.subscribe({
				next: (value) => {
					this.prices = value;
				},
				error: (error) => {
					console.error('Error', error);
				},
			}
		);
	}
	getAllPricesExtension(): void {
		this.adminService.getAllPricesExtension()
			.subscribe({
				next: (value) => {
					this.priceExtension = value;
				},
				error: (error) => {
					console.error('Error', error);
				},
			}
		);
	}
	updatePrice() { 
		if(this.checkPriceValidity(this.updatedPrice)){
			this.adminService
			.updatePrice(this.selectedPrice.numOfDistance, this.updatedPrice)
			.subscribe({
				next: (value) => {
					console.log('Price updated successfully:', value);
					this.modalService.dismissAll();
					this.getAllPrices();
				},
				error: (error) => {
					console.error('Error', error);
				},
			}
			);
		}
	
	}
	updatePriceExtension() { 
		if(this.checkPriceValidity(this.updatedPrice) ){
		this.adminService
			.updatePriceExtension(this.selectedPrice.numOfDistance, this.updatedPrice)
			.subscribe({
				next: (value) => {
					console.log('Price updated successfully:', value);
					this.modalService.dismissAll();
					this.getAllPricesExtension();
				},
				error: (error) => {
					console.error('Error', error);
				},
			}
			);
		}
	}
	
	checkPriceValidity(updatePrice: number): boolean {
		return (updatePrice >= 0) && (updatePrice < 100);
	}

	formatDateTime(dateTimeString: string): string {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: 'numeric',
			minute: 'numeric',
			hour12: false, 
		};

		return new Date(dateTimeString).toLocaleString('th-TH', options);
	}
	
	open(content: TemplateRef<any>, price: any): void {
		this.selectedPrice = price;
		this.updatedPrice = price.price;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

	closeModal() {
		this.modalService.dismissAll();
	  }

}
