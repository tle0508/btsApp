import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService } from '../service/bts.service';
import { AdminService } from '../service/admin.service';
import { Station } from '../Station';
import { Price } from '../Price';
import { Trip } from '../Trip';

@Component({
	selector: 'app-bts-home',
	templateUrl: './bts-home.component.html',
	styleUrl: './bts-home.component.css',
})
export class BtsHomeComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private btsService: BtsService,
		private adminService: AdminService
	) {}

	limeGreenLineBts: Station[] = [];
	blueLineBts: Station[] = [];
	selectedStartLineColor: string = 'เลือกสายต้นทาง';
	selectedStartLineStations: Station[] = [];
	selectedStartStation!: Station;

	selectedEndLineColor: string = 'เลือกสายปลายทาง';
	selectedEndLineStations: Station[] = [];
	selectedEndStation!: Station;
	price!: number;
	tripResult!: Trip[];
	extensionPrice!: number;
	
	lineColorSukhumvit:string ="limegreen";

	lastIdStationOfExtension_1:number =17;
	firstIdStationOfExtension_2:number =34;
	lastIdStationOfExtension_2:number=49;
	firstIdStationOfExtension_3:number=58;


	ngOnInit(): void {
		this.getByLimeGreenLineColor();
		this.getByBlueLineColor();
		this.getPriceExtension();
	}

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

	onStartLineColorChange() {
		if (this.selectedStartLineColor === this.lineColorSukhumvit) {
			this.selectedStartLineStations = this.limeGreenLineBts;
		} else {
			this.selectedStartLineStations = this.blueLineBts;
		}
	}

	onEndLineColorChange() {
		if (this.selectedEndLineColor === this.lineColorSukhumvit) {
			this.selectedEndLineStations = this.limeGreenLineBts;
		} else {
			this.selectedEndLineStations = this.blueLineBts;
		}
	}

	getPriceExtension(): void {
		this.adminService.getPriceByNumOfDistance(0).subscribe({
			next: (value) => {
				this.extensionPrice = value.price;
			},
			error: (error) => {
				console.error('Error', error);
			},
		});
	}

	getData(startStationId: number, endStationId: number): void {
		this.btsService
			.getTripsByStartAndEndStation(startStationId, endStationId)
			.subscribe({
				next: (value) => {
					this.tripResult = value;
					this.calculatePrice(
								this.tripResult[0].startStation,
								this.tripResult[0].endStation,
								this.tripResult[0].priceModel
							);
				},
				error: (error) => {
					console.error('Error', error);
				},
			}
			);
	}

	calculatePrice(startStation: Station,endStation: Station,prices: Price): void {
		this.price = prices.price;
		if (startStation.extension && endStation.extension) {
			if (
				(startStation.id < this.lastIdStationOfExtension_1 && endStation.id > this.lastIdStationOfExtension_1) ||
				(startStation.id > this.firstIdStationOfExtension_2 && startStation.id < this.lastIdStationOfExtension_2 && (endStation.id <  this.firstIdStationOfExtension_2 || endStation.id > this.firstIdStationOfExtension_3)) ||
				(startStation.id >  this.firstIdStationOfExtension_3 && endStation.id <  this.firstIdStationOfExtension_3)
			) {
				this.price += this.extensionPrice;
			}
		}
		//
		if(startStation.extension != endStation.extension){
			if (endStation.id != this.lastIdStationOfExtension_1 && 
				endStation.id != this.firstIdStationOfExtension_2 && 
				endStation.id !=  this.firstIdStationOfExtension_3) 
				{
				this.price += this.extensionPrice;
			}else if(
				startStation.id != this.lastIdStationOfExtension_1 &&
				startStation.id != this.firstIdStationOfExtension_2 && 
				startStation.id !=  this.firstIdStationOfExtension_3)
				{
				this.price += this.extensionPrice;
			}
		}
	}

	// calculatePrice(startStation: Station,endStation: Station,prices: Price): void {
	// 	this.price = prices.price;
	// 	if (startStation.extension && endStation.extension) {
	// 		if (
	// 			(startStation.id < 17 && endStation.id > 17) ||
	// 			(startStation.id > 34 && startStation.id < 49 && (endStation.id < 34 || endStation.id > 58)) ||
	// 			(startStation.id > 58 && endStation.id < 58)
	// 		) {
	// 			this.price += this.extensionPrice;
	// 		}
	// 	}
	// 	if(startStation.extension && !endStation.extension){
	// 		if (endStation.id != 17 && endStation.id != 34 && endStation.id != 58) {
	// 			this.price += this.extensionPrice;
	// 		}
	// 	}
	// 	if(!startStation.extension && endStation.extension){
	// 		 if(startStation.id != 17 &&startStation.id != 34 && startStation.id != 58){
	// 			this.price += this.extensionPrice;
	// 		}
	// 	}
	// }

	getByLimeGreenLineColor(): void {
		this.btsService.getStatioByLimeGreenLineColor().subscribe({
			next: (value) => {
				this.limeGreenLineBts = value;     
			},
			error: (error) => {
				console.error(error);
			}
		});
	}
	getByBlueLineColor(): void {
		this.btsService.getStatioByBlueLineColor().subscribe({
			next: (value) => {
				this.blueLineBts = value;     
			},
			error: (error) => {
				console.error(error);
			}
		});
	}

	areStationsEqual(): boolean {
		return (
			this.selectedStartStation &&
			this.selectedEndStation &&
			this.selectedStartStation.idStation ===
				this.selectedEndStation.idStation
		);
	}
}
