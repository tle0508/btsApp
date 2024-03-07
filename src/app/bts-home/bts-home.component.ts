import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtsService } from '../service/bts.service';

@Component({
  selector: 'app-bts-home',
  templateUrl: './bts-home.component.html',
  styleUrl: './bts-home.component.css',
})
export class BtsHomeComponent implements OnInit {
  constructor(private modalService: NgbModal, private btsService: BtsService) {}

  LimeGreenLineBts: any[] = [];
  BlueLineBts: any[] = [];
  selected_Start_LineColor: string = 'เลือกสายต้นทาง';
  selected_Start_LineStations: any[] = [];
  selected_Start_Station: any;

  selected_End_LineColor: string = 'เลือกสายปลายทาง';
  selected_End_LineStations: any[] = [];
  selected_End_Station: any ;

  price! :number ;

  ngOnInit(): void {
    this.getByLimeGreenLineColor();
    this.getByBlueLineColor();
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
    return this.selected_Start_Station && this.selected_End_Station 
           && this.selected_Start_Station.idStation === this.selected_End_Station.idStation;
  }
}
