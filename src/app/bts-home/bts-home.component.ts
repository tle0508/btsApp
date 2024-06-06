import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService } from '../service/bts.service';
import { Station } from '../Station';
import { Trip } from '../Trip';

@Component({
	selector: 'app-bts-home',
	templateUrl: './bts-home.component.html',
	styleUrl: './bts-home.component.css',
})
export class BtsHomeComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private btsService: BtsService	) {}

	limeGreenLineBts: Station[] = [];
	blueLineBts: Station[] = [];
	selectedStartLineColor: string = 'เลือกสายต้นทาง';
	selectedStartLineStations: Station[] = [];
	selectedStartStation: Station =<Station>{};

	selectedEndLineColor: string = 'เลือกสายปลายทาง';
	selectedEndLineStations: Station[] = [];
	selectedEndStation: Station =<Station>{};
	price: number = <number>{};
	tripResult: Trip[]= [];
	
	
	lineColorSukhumvit:string ="limegreen";

	formSubmitted: boolean = false;

	ngOnInit(): void {
		this.getByLimeGreenLineColor();
		this.getByBlueLineColor();
		
	}

	open(content: TemplateRef<any>) {
		if(!this.areStationsEqual()){
			this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
		}
		
	}

	onStartLineColorChange() {
		if (this.selectedStartLineColor === this.lineColorSukhumvit) {
			this.selectedStartLineStations = this.limeGreenLineBts;
		} else {
			this.selectedStartLineStations = this.blueLineBts;
		}
		this.selectedStartStation =<Station>{}
		this.formSubmitted = false; 
	}

	
	onEndLineColorChange() {
		if (this.selectedEndLineColor === this.lineColorSukhumvit) {
			this.selectedEndLineStations = this.limeGreenLineBts;
		} else {
			this.selectedEndLineStations = this.blueLineBts;
		}
		this.selectedEndStation =<Station>{}
		this.formSubmitted = false; 
	}

	

	getData(startStationId: number, endStationId: number): void {		
		this.btsService
			.getTripsByStartAndEndStation(startStationId, endStationId)
			.subscribe({
				next: (value) => {
					this.tripResult = value;
					console.log(this.tripResult);
					this.price = this.tripResult[0].priceModel.price;
					
				},
				error: (error) => {
					console.error('Error', error);
				},
			}
			);
	}

	submitForm()  {
		this.formSubmitted = true; // ตั้งค่าเป็น true เมื่อฟอร์มถูกส่ง
		if(!this.areStationsEqual()){
			if (this.selectedStartStation !== null && this.selectedEndStation !== null) {
				this.getData(this.selectedStartStation.id, this.selectedEndStation.id); 
			}
		}
		
	}
	



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
		return !!(
			this.selectedStartStation &&
			this.selectedEndStation &&
			this.selectedStartStation.idStation ===
				this.selectedEndStation.idStation
		);
	}

}