import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService  } from '../service/bts.service';
import { Price } from '../Price';
import { Station } from '../Station';
import { Trip } from '../Trip';


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
  price: number | undefined;
  tripResult!: Trip[];
  extensionPrice!: number;

	lastIdStationOfExtension_1:number =17;
	firstIdStationOfExtension_2:number =34;
	lastIdStationOfExtension_2:number=49;
	firstIdStationOfExtension_3:number=58;

  ngOnInit(): void {
    this.getByLimeGreenLineColor();
    this.getByBlueLineColor();
  }

  getPriceLabel(): string {
    return this.price === undefined ? 'ฟรี' : `${this.price} บาท`;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
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
      .getTripsByStartAndEndStation(startStationId, endStationId)
      .subscribe({
        next: (value) => {
          this.tripResult = value;
          this.calculatePriceSpecial(
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


  calculatePriceSpecial(startStation: Station, endStation: Station, prices: Price): void {
    this.price = prices.price;
    if (startStation.extension && endStation.extension) {
      if (!((startStation.id < this.lastIdStationOfExtension_1 && endStation.id > this.lastIdStationOfExtension_1) ||
          (startStation.id > this.firstIdStationOfExtension_2 &&startStation.id < this.lastIdStationOfExtension_2 &&(endStation.id < this.firstIdStationOfExtension_2 || endStation.id > this.firstIdStationOfExtension_3)) ||
          (startStation.id > this.firstIdStationOfExtension_3 && endStation.id < this.firstIdStationOfExtension_3)
      ) ){
        this.price = this.extensionPrice;
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
    return (
      this.selectedStartStation &&
      this.selectedEndStation &&
      this.selectedStartStation.idStation ===
        this.selectedEndStation.idStation
    );
  }
}
