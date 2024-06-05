import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService  } from '../service/bts.service';
import { Price } from '../Price';
import { Station } from '../Station';
import { Trip } from '../Trip';
import { TripExtension } from '../TripExtension';


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

  limeGreenLineBts: Station[] = [];
  blueLineBts: Station[] = [];
  selectedStartLineColor: string = 'เลือกสายต้นทาง';
  selectedStartLineStations: Station[] = [];
  selectedStartStation!: Station;

  selectedEndLineColor: string = 'เลือกสายปลายทาง';
  selectedEndLineStations: Station[] = [];
  selectedEndStation!: Station;
  price!: number ;
  tripResult!: TripExtension[];
  extensionPrice!: number;


  formSubmitted: boolean = false;

  ngOnInit(): void {
    this.getByLimeGreenLineColor();
    this.getByBlueLineColor();
  }

  getPriceLabel(): string {
    return this.price === 0 ? 'ฟรี' : `${this.price} บาท`;
  }

  open(content: TemplateRef<any>) {
		if(!this.areStationsEqual()){
			this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
		}
		
	}

  onStartLineColorChange() {
    if (this.selectedStartLineColor === 'limegreen') {
      this.selectedStartLineStations = this.limeGreenLineBts;
    } else {
      this.selectedStartLineStations = this.blueLineBts;
    }
  }

  onEndLineColorChange() {
    if (this.selectedEndLineColor === 'limegreen') {
      this.selectedEndLineStations = this.limeGreenLineBts;
    } else {
      this.selectedEndLineStations = this.blueLineBts;
    }
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
