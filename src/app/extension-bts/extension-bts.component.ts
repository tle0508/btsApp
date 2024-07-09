import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService } from '../service/bts.service';
import { Station } from '../Station';
import { TripExtension } from '../TripExtension';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LineStation } from '../LineStation';

@Component({
  selector: 'app-extension-bts',
  templateUrl: './extension-bts.component.html',
  styleUrl: './extension-bts.component.css',
})
export class ExtensionBtsComponent implements OnInit {
  constructor(private modalService: NgbModal, private btsService: BtsService) {}

  tripForm = new FormGroup({
    StartLineStation: new FormControl('', [Validators.required]),
    StartStation: new FormControl(null, [Validators.required]),
    EndLineStation: new FormControl('', [Validators.required]),
    EndStation: new FormControl(null, [Validators.required]),
  });

  selectedStartLineStations: Station[] = [];
  selectedEndLineStations: Station[] = [];
  tripResult: TripExtension = <TripExtension>{};
  lineStation: LineStation[] = [];
  price!:number;
  googlePath: String = "https://maps.app.goo.gl/";

  ngOnInit(): void {
    this.getAllLineStations();
    this.tripForm.get('StartLineStation')?.setValue("เลือกสายต้นทาง");
    this.tripForm.get('EndLineStation')?.setValue("เลือกสายปลายทาง");
    this.tripForm.get('StartStation')?.disable();
    this.tripForm.get('EndStation')?.disable();
  }

  getPriceLabel(): string {
    return this.price === 0 ? 'ฟรี' : `${this.price} บาท`;
  }

  open(content: TemplateRef<any>) {
    const startStation = this.tripForm.get('StartStation')?.value;
    const endStation = this.tripForm.get('EndStation')?.value; 
    if (!this.areStationsEqual()) {
      if ( startStation != null && endStation != null) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',});
        this.getData(startStation, endStation);
      }
    }
  }

  closeModal() {
		this.modalService.dismissAll();
	}

  onStartLineColorChange() {
    if (this.tripForm.get('StartLineStation')?.value == this.lineStation[0].color) {
      this.getStartStationsByLineId(1);
    } else {
      this.getStartStationsByLineId(2);
    }
    this.tripForm.get('StartStation')?.reset();
    this.tripForm.get('StartStation')?.enable();
  }

  onEndLineColorChange() {
    if (this.tripForm.get('EndLineStation')?.value === this.lineStation[0].color) {
      this.getEndStationsByLineId(1);
    } else {
      this.getEndStationsByLineId(2);
    }
    this.tripForm.get('EndStation')?.reset();
    this.tripForm.get('EndStation')?.enable();
  }
  
  getEndStationsByLineId(id: number) {
    this.btsService.getStationByid(id).then((value) => {
      this.selectedEndLineStations = value;
    }).catch((error)=>{
      throw error;
  })
  }

  getStartStationsByLineId(id: number) {
    this.btsService.getStationByid(id).then((value) => {
      this.selectedStartLineStations = value;
    }).catch((error)=>{
      throw error;
  })
  }

  getData(startStationId: number, endStationId: number): void {
    this.btsService.getTripsByStartAndEndStation(startStationId, endStationId).then((value)=>{
        this.tripResult = value;
         this.calculatePrice(this.tripResult.priceModel.price);
      }).catch((error)=>{
        throw error;
    })
  }

  calculatePrice(calPrice:number){
    if(this.tripResult.startStation.extension == true && this.tripResult.endStation.extension == true){
      if (this.tripResult.startStation.extensionGroupNumber == this.tripResult.endStation.extensionGroupNumber) {
        calPrice = 0
      }
    }
  this.price=calPrice;
  }


  getAllLineStations(): void {
    this.btsService.getAllLineStations().then((value)=>{
      this.lineStation=value;
    }).catch((error)=>{
      throw error;
  })
  }


  areStationsEqual(): boolean {
    return  this.tripForm.get('StartStation')?.value ==this.tripForm.get('EndStation')?.value;
  }
}
