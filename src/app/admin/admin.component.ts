import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { AdminService } from '../service/admin.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private location : Location
  ) {}

  prices: any[] = [];
  showModal = false;
  selectedPrice: any;
  updatedPrice!: number;

  ngOnInit(): void {
    this.getAllPrices();
  }

  getAllPrices(): void {
    this.adminService.getAllPrices().subscribe(
      (data) => {
        this.prices = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updatePrice() {
    this.adminService
      .updatePrice(this.selectedPrice.id, this.updatedPrice)
      .subscribe(
        (data) => {
          console.log('Price updated successfully:', data);
          this.modalService.dismissAll();
          this.getAllPrices();
        },
        (error) => {
          console.error('Error updating price:', error);
        }
      );
  }
  formatDateTime(dateTimeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false, // 24-hour format
    };

    return new Date(dateTimeString).toLocaleString('th-TH', options);
  }
  open(content: TemplateRef<any>, price: any): void {
    this.selectedPrice = price;
    this.updatedPrice = price.price;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  goback(){
    this.location.back()
  }
}
