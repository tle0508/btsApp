import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService  } from '../service/bts.service';
import { Station } from '../Station';
import { TripExtension } from '../TripExtension';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-extension-bts',
  templateUrl: './extension-bts.component.html',
  styleUrl: './extension-bts.component.css'
})
export class ExtensionBtsComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private btsService: BtsService,
  ) {}
  
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
  selectedStartStation!: number | null;

  selectedEndLineColor: string = 'เลือกสายปลายทาง';
  selectedEndLineStations: Station[] = [];
  selectedEndStation!: number | null;
	price: number = <number>{};
	tripResult: TripExtension[]= [];
  
  lineColorSukhumvit:string ="limegreen";

  formSubmitted: boolean = false;

  ngOnInit(): void {
    this.getByLimeGreenLineColor();
    this.getByBlueLineColor();
    this.tripForm.get('StartStation')?.disable()
		this.tripForm.get('EndStation')?.disable()
  }

  getPriceLabel(): string {
    return this.price === 0 ? 'ฟรี' : `${this.price} บาท`;
  }

  open(content: TemplateRef<any>) {
		if(!this.areStationsEqual()){	
			if (this.selectedStartStation != null &&this.selectedEndStation != null) {
			this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });		
			}
		}
	}

  onStartLineColorChange() {
		if (this.tripForm.get('StartLineStation')?.value == this.lineColorSukhumvit) {
			this.selectedStartLineStations = this.limeGreenLineBts;
		} else {
			this.selectedStartLineStations = this.blueLineBts;
		}
		this.tripForm.get('StartStation')?.reset();
		this.tripForm.updateValueAndValidity();
		this.formSubmitted = false; 
    this.tripForm.get('StartStation')?.enable()
	}

  onEndLineColorChange() {
		if (this.selectedEndLineColor === this.lineColorSukhumvit) {
			this.selectedEndLineStations = this.limeGreenLineBts;
		} else {
			this.selectedEndLineStations = this.blueLineBts;
		}
		this.tripForm.get('EndStation')?.reset();
		this.tripForm.updateValueAndValidity();
		this.formSubmitted = false; 
    this.tripForm.get('EndStation')?.enable()
	}

  getData(startStationId: number, endStationId: number): void {
    this.btsService
      .getTripsExtensionByStartAndEndStation(startStationId, endStationId)
      .subscribe({
        next: (value) => {
          this.tripResult = value;
          console.log(this.tripResult);
          this.price = this.tripResult[0].priceExtensionModel.price;
          console.log(this.price);
          
        },
        error: (error) => {
          console.error('Error', error);
        },
      }
      );
  }

  submitForm()  {
		console.log(this.selectedStartStation);
		
		this.formSubmitted = true; // ตั้งค่าเป็น true เมื่อฟอร์มถูกส่ง
		if(!this.areStationsEqual()){
			if (this.selectedStartStation != null &&this.selectedEndStation != null) {
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
      return  this.selectedStartStation ===this.selectedEndStation
    }
}
