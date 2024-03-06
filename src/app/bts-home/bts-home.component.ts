import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bts-home',
  templateUrl: './bts-home.component.html',
  styleUrl: './bts-home.component.css',
})
export class BtsHomeComponent {
  
  constructor(
    private modalService: NgbModal,
  ) {}

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
 
}
