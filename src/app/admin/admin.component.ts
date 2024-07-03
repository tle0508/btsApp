import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Price } from '../Price';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  priceForm = new FormGroup({
    price: new FormControl(0, [Validators.required]),
  });

  prices: Price[] = [];
 
  selectedPrice: Price = {} as Price;

  constructor(private adminService: AdminService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllPrices();
  }

  getAllPrices(): void {
    this.adminService.getAllPrices().then((value) => {
      this.prices = value;
    }).catch((error) => {
      console.warn(error);
    });
  }


  updatePrice(): void {
    const updatedPrice = this.priceForm.get('price')?.value;
    if (this.checkPriceValidity(updatedPrice)) {
      this.adminService.updatePrice(this.selectedPrice.id, updatedPrice!).then((value) => {
        this.modalService.dismissAll();
        this.getAllPrices();
      }).catch((error) => {
        console.warn(error);
      });
    }
  }

  checkPriceValidity(updatedPrice: number | null | undefined): boolean {
    if (updatedPrice === null || updatedPrice === undefined) {
      return false;
    }
    const price = this.priceForm.get('price')?.value;
    return price !== null && price !== undefined && price >= 0 && updatedPrice < 100;
  }

  formatDateTime(dateTimeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    return new Date(dateTimeString).toLocaleString('th-TH', options);
  }

  open(content: TemplateRef<any>, price: Price): void {
    this.selectedPrice = price;
    this.priceForm.get('price')?.setValue(price.price);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }
}
