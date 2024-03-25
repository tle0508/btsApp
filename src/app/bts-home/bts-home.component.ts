import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService } from '../service/bts.service';
import { AdminService } from '../service/admin.service';

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

  LimeGreenLineBts: any[] = [];
  BlueLineBts: any[] = [];
  selected_Start_LineColor: string = 'เลือกสายต้นทาง';
  selected_Start_LineStations: any[] = [];
  selected_Start_Station: any;

  selected_End_LineColor: string = 'เลือกสายปลายทาง';
  selected_End_LineStations: any[] = [];
  selected_End_Station: any;
  price!: number;
  TripResult: any;
  extensionPrice!: number;

  ngOnInit(): void {
    this.getByLimeGreenLineColor();
    this.getByBlueLineColor();
    this.getPriceExtension();
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onStartLineColorChange() {
    if (this.selected_Start_LineColor === 'limegreen') {
      this.selected_Start_LineStations = this.LimeGreenLineBts;
    } else {
      this.selected_Start_LineStations = this.BlueLineBts;
    }
  }

  onEndLineColorChange() {
    if (this.selected_End_LineColor === 'limegreen') {
      this.selected_End_LineStations = this.LimeGreenLineBts;
    } else {
      this.selected_End_LineStations = this.BlueLineBts;
    }
  }

  getPriceExtension(): void {
    const numOfDistance = 0; 
    this.adminService
    .getPriceByNumOfDistance(numOfDistance)
    .subscribe(
      (data) => {
        this.extensionPrice=data.price;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  getData(startStationId: number, endStationId: number): void {
    this.btsService
      .getTripsByStartAndEndStation(startStationId, endStationId)
      .subscribe(
        (data) => {
          this.TripResult = data;

          this.calculatePrice(
            this.TripResult[0].startStationId,
            this.TripResult[0].endStationId,
            this.TripResult[0].priceModel
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }

  calculatePrice(startStation: any, endStation: any, prices: any): void {
    this.price = prices.price;
    if (startStation.extension && endStation.extension) {
      if (
        (startStation.id < 17 && endStation.id > 17) ||
        (startStation.id > 34 &&
          startStation.id < 49 &&
          (endStation.id < 34 || endStation.id > 58)) ||
        (startStation.id > 58 && endStation.id < 58)
      ) {
         this.price += this.extensionPrice;
      }
    }
    if (startStation.extension && !endStation.extension) {
      if (!(endStation.id == 17) && !(endStation.id == 34)) {
         this.price += this.extensionPrice;
      }
    } else if (!startStation.extension && endStation.extension) {
      if (
        !(startStation.id == 17) &&
        !(startStation.id == 34) &&
        !(startStation.id == 58)
      ) {
        if (
          (endStation.id > 0 && endStation.id < 17) ||
          (endStation.id > 34 && endStation.id < 49) ||
          (endStation.id > 58 && endStation.id < 63)
        ) {
           this.price += this.extensionPrice;
        }
      } else {
        if (
          (startStation.id == 17 && endStation.id > 17) ||
          (startStation.id == 34 &&
            (endStation.id < 34 || endStation.id > 58)) ||
          (startStation.id == 58 && !(endStation.id > 58))
        ) {
           this.price += this.extensionPrice;
        }
      }
    }
  }

  getByLimeGreenLineColor(): void {
    this.btsService.findByLimeGreenLineColor().subscribe(
      (data) => {
        this.LimeGreenLineBts = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getByBlueLineColor(): void {
    this.btsService.findByBlueLineColor().subscribe(
      (data) => {
        this.BlueLineBts = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  areStationsEqual(): boolean {
    return (
      this.selected_Start_Station &&
      this.selected_End_Station &&
      this.selected_Start_Station.idStation ===
        this.selected_End_Station.idStation
    );
  }
}
