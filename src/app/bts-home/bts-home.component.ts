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
	
	
	lineColorSukhumvit:string ="limegreen";

	lastIdStationOfExtension_1:number =17;
	firstIdStationOfExtension_2:number =34;
	lastIdStationOfExtension_2:number=49;
	firstIdStationOfExtension_3:number=58;

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
		
	}

	onEndLineColorChange() {
		if (this.selectedEndLineColor === this.lineColorSukhumvit) {
			this.selectedEndLineStations = this.limeGreenLineBts;
		} else {
			this.selectedEndLineStations = this.blueLineBts;
		}
		
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
			this.getData(this.selectedStartStation.id, this.selectedEndStation.id); 
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
		return (
			this.selectedStartStation &&
			this.selectedEndStation &&
			this.selectedStartStation.idStation ===
				this.selectedEndStation.idStation
		);
	}

}