import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService } from '../service/bts.service';
import { Station } from '../Station';
import { Trip } from '../Trip';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LineStation } from '../LineStation';

@Component({
  selector: 'app-bts-home',
  templateUrl: './bts-home.component.html',
  styleUrl: './bts-home.component.css',
})
export class BtsHomeComponent implements OnInit {
  constructor(private modalService: NgbModal, private btsService: BtsService) {}

  tripForm = new FormGroup({
    StartLineStation: new FormControl('', [Validators.required]),
    StartStation: new FormControl('', [Validators.required]),
    EndLineStation: new FormControl('', [Validators.required]),
    EndStation: new FormControl('', [Validators.required]),
  });

  limeGreenLineBts: Station[] = [];
  blueLineBts: Station[] = [];
  selectedStartLineColor: string = 'เลือกสายต้นทาง';
  selectedStartLineStations: Station[] = [];
  selectedStartStation: number = 0;

  selectedEndLineColor: string = 'เลือกสายปลายทาง';
  selectedEndLineStations: Station[] = [];
  selectedEndStation!: number;
  price: number = <number>{};
  tripResult: Trip = <Trip>{};

  lineStation: LineStation[] = [];

 

  ngOnInit(): void {
    this.getByLimeGreenLineColor();
    this.getByBlueLineColor();
    console.log(this.tripForm);
	this.getAllLineStations();
    this.tripForm.get('StartStation')?.disable();
    this.tripForm.get('EndStation')?.disable();
  }

  open(content: TemplateRef<any>) {
    if (!this.areStationsEqual()) {
      if (
        this.selectedStartStation != null &&this.selectedEndStation != null
      ) {
        this.modalService.open(content, {
          ariaLabelledBy: 'modal-basic-title',
        });
        this.getData(this.selectedStartStation, this.selectedEndStation);
      }
    }
  }
  closeModal() {
		this.modalService.dismissAll();
	  }

  onStartLineColorChange() {
    if (
      this.tripForm.get('StartLineStation')?.value == this.lineStation[0].color
    ) {
      this.selectedStartLineStations = this.limeGreenLineBts;
    } else {
      this.selectedStartLineStations = this.blueLineBts;
    }
    this.tripForm.get('StartStation')?.reset();
    this.tripForm.updateValueAndValidity();
    this.tripForm.get('StartStation')?.enable();
  }

  onEndLineColorChange() {
    if (this.selectedEndLineColor === this.lineStation[0].color) {
      this.selectedEndLineStations = this.limeGreenLineBts;
    } else {
      this.selectedEndLineStations = this.blueLineBts;
    }
    this.tripForm.get('EndStation')?.reset();
    this.tripForm.updateValueAndValidity();
    this.tripForm.get('EndStation')?.enable();
  }

  getData(startStationId: number, endStationId: number): void {
    this.btsService
      .getTripsByStartAndEndStation(startStationId, endStationId)
      .subscribe({
        next: (value) => {
          this.tripResult = value;
          console.log(this.tripResult);
          this.price = this.tripResult.priceModel.price;
        },
        error: (error) => {
          console.error('Error', error);
        },
      });
  }

  getByLimeGreenLineColor(): void {
    this.btsService.getStatioByLimeGreenLineColor().subscribe({
      next: (value) => {
        this.limeGreenLineBts = value;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getAllLineStations(): void {
    this.btsService.getAllLineStations().subscribe({
      next: (value) => {
        this.lineStation = value;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getByBlueLineColor(): void {
    this.btsService.getStatioByBlueLineColor().subscribe({
      next: (value) => {
        this.blueLineBts = value;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  areStationsEqual(): boolean {
    return this.selectedStartStation == this.selectedEndStation;
  }
}
