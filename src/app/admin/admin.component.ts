import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { AdminService } from '../service/admin.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Price } from '../Price';


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
	) {}

	///
	prices: Price[] = [];
	priceExtension :Price[]= [];
	showModal = false;
	selectedPrice: Price =<Price>{} ;
	updatedPrice!: number;

	ngOnInit(): void {
		this.getAllPrices();
		this.getAllPricesExtension();
	}

	getAllPrices(): void {
		this.adminService.getAllPrices().then((value)=>{
			this.prices=value;
		}).catch((error)=>{
			console.warn(error);
		})
	}
	getAllPricesExtension(): void {
		this.adminService.getAllPricesExtension().then((value)=>{
			this.priceExtension=value;
		}).catch((error)=>{
			console.warn(error);	
		})
	}
	updatePrice() { 
		if(this.checkPriceValidity(this.updatedPrice)){
			this.adminService
			.updatePrice(this.selectedPrice.numOfDistance, this.updatedPrice).then((value)=>{
				console.log('Price updated successfully:', value);
				this.modalService.dismissAll();
				this.getAllPrices();
			}).catch((error)=>{
				console.warn(error);	
			})
		}
	
	}
	updatePriceExtension() { 
		if(this.checkPriceValidity(this.updatedPrice) ){
		this.adminService
			.updatePriceExtension(this.selectedPrice.numOfDistance, this.updatedPrice).then((value)=>{
				console.log('Price updated successfully:', value);
				this.modalService.dismissAll();
			 	this.getAllPricesExtension();
			}).catch((error)=>{
				console.warn(error);	
			})
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
