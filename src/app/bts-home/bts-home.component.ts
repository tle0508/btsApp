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
    StartStation: new FormControl(null, [Validators.required]),
    EndLineStation: new FormControl('', [Validators.required]),
    EndStation: new FormControl(null, [Validators.required]),
  });

  limeGreenLineBts: Station[] = [];
  blueLineBts: Station[] = [];
  selectedStartLineStations: Station[] = [];
  selectedEndLineStations: Station[] = [];
  price: number = <number>{};
  tripResult: Trip = <Trip>{};
  lineStation: LineStation[] = [];

 

  ngOnInit(): void {
    this.getByLimeGreenLineColor();
    this.getByBlueLineColor();
    console.log(this.tripForm);
	  this.getAllLineStations();
    this.tripForm.get('StartLineStation')?.setValue("เลือกสายต้นทาง");
    this.tripForm.get('EndLineStation')?.setValue("เลือกสายปลายทาง");
    this.tripForm.get('StartStation')?.disable();
    this.tripForm.get('EndStation')?.disable();
  }

  open(content: TemplateRef<any>) {
    const startStation = this.tripForm.get('StartStation')?.value;
    const endStation = this.tripForm.get('EndStation')?.value; 
    if (!this.areStationsEqual()) {
      if ( startStation != null &&  endStation != null) {
        this.modalService.open(content, {
          ariaLabelledBy: 'modal-basic-title',
        });
        this.getData(startStation, endStation);
      } else {
        console.log('ข้อมูลไม่ครบ');
      }
    }
  }
  

   closeModal() {
		this.modalService.dismissAll();
	  }
 //
  onStartLineColorChange() {
    if (
      this.tripForm.get('StartLineStation')?.value == this.lineStation[0].color
    ) {
      this.selectedStartLineStations = this.limeGreenLineBts;
    } else {
      this.selectedStartLineStations = this.blueLineBts;
    }
    this.tripForm.get('StartStation')?.reset();
    this.tripForm.get('StartStation')?.enable();
  }

  //
  onEndLineColorChange() {
    if (this.tripForm.get('EndLineStation')?.value === this.lineStation[0].color) {
      this.selectedEndLineStations = this.limeGreenLineBts;
    } else {
      this.selectedEndLineStations = this.blueLineBts;
    }
    this.tripForm.get('EndStation')?.reset();
    this.tripForm.get('EndStation')?.enable();
  }

  getData(startStationId: number, endStationId: number): void {
    this.btsService
      .getTripsByStartAndEndStation(startStationId, endStationId)
      .then((value)=>{
        this.tripResult = value;
        this.price = this.tripResult.priceModel.price;
      }).catch((error)=>{
        console.warn(error);
    })
  }
//
  getByLimeGreenLineColor(): void {
    this.btsService.getStationByLimeGreenLineColor().then((value)=>{
      this.limeGreenLineBts=value
    }).catch((error)=>{
        console.warn(error);
    })
  }

  getAllLineStations(): void {
    this.btsService.getAllLineStations().then((value)=>{
      this.lineStation=value;
    }).catch((error)=>{
      console.warn(error);
  })
  }
//
  getByBlueLineColor(): void {
    this.btsService.getStationByBlueLineColor().then((value=>{
      this.blueLineBts=value;
    })).catch((error)=>{
      console.warn(error);
  })
  }

  areStationsEqual(): boolean {
    return this.tripForm.get('StartStation')?.value  == this.tripForm.get('EndStation')?.value ;
  }
}
