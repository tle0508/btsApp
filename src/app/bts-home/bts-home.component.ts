import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService } from '../service/bts.service';
import { Station } from '../Station';
import { Trip } from '../Trip';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-bts-home',
	templateUrl: './bts-home.component.html',
	styleUrl: './bts-home.component.css',
})
export class BtsHomeComponent implements OnInit {

onSubmit() {
throw new Error('Method not implemented.');
}

	constructor(
		private modalService: NgbModal,
		private btsService: BtsService	
	) {}

	public colorLineStation :Array<string> = ['green', 'limegreen'];

	tripForm = new FormGroup({	
		  StartLineStation: new FormControl("", [
			Validators.required,
		  ]),
		  StartStation: new FormControl("", [
			Validators.required,
		  ]),
		  EndLineStation: new FormControl("", [
			Validators.required,
		  ]),
			EndStation: new FormControl("", [
			Validators.required,
		  ]),	  
		  
	  });	
	  


	limeGreenLineBts: Station[] = [];
	blueLineBts: Station[] = [];
	selectedStartLineColor: string = 'เลือกสายต้นทาง';
	selectedStartLineStations: Station[] = [];
	selectedStartStation!: number;

	selectedEndLineColor: string = 'เลือกสายปลายทาง';
	selectedEndLineStations: Station[] = [];
	selectedEndStation!: number;
	price: number = <number>{};
	tripResult: Trip[]= [];
	
	
	lineColorSukhumvit:string ="limegreen";

	formSubmitted: boolean = false;
	
	ngOnInit(): void {
		this.getByLimeGreenLineColor();
		this.getByBlueLineColor();
		console.log(this.tripForm);
		
	}

	open(content: TemplateRef<any>) {
		if(!this.areStationsEqual()){
			this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
		}
		
	}
	

	onStartLineColorChange() {
		if (this.tripForm.get('StartLineStation')?.value == this.lineColorSukhumvit) {
			this.selectedStartLineStations = this.limeGreenLineBts;
		} else {
			this.selectedStartLineStations = this.blueLineBts;
		}
		// this.selectedStartStation =0;
		// this.tripForm.get('StartStation')?.reset();
		// this.tripForm.get('StartStation')?.enable();
		// this.formSubmitted = false; 
		
		console.log(this.tripForm);
		console.log(this.selectedStartStation);
	}

	
	onEndLineColorChange() {
		if (this.selectedEndLineColor === this.lineColorSukhumvit) {
			this.selectedEndLineStations = this.limeGreenLineBts;
		} else {
			this.selectedEndLineStations = this.blueLineBts;
		}
		this.selectedEndStation =0;
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
				this.getData(this.selectedStartStation, this.selectedEndStation); 
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
			this.selectedStartStation ===
				this.selectedEndStation
		);
	}

}