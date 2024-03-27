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
  price!: number;
  tripResult!: Trip[];
  extensionPrice!: number;


  ngOnInit(): void {
    this.getByLimeGreenLineColor();
    this.getByBlueLineColor();
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
      if (!((startStation.id < 17 && endStation.id > 17) ||(startStation.id > 34 &&startStation.id < 49 
           &&
          (endStation.id < 34 || endStation.id > 58)) ||(startStation.id > 58 && endStation.id < 58)
      ) ){
        this.price = this.extensionPrice;
      }
    }
    }
  

  getByLimeGreenLineColor(): void {
    this.btsService.getStatioByLimeGreenLineColor().subscribe(
      (data) => {
        this.limeGreenLineBts = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getByBlueLineColor(): void {
    this.btsService.getStatioByBlueLineColor().subscribe(
      (data) => {
        this.blueLineBts = data;
      },
      (error) => {
        console.error(error);
      }
    );
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
