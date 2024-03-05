import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsHomeComponent } from './bts-home.component';

describe('BtsHomeComponent', () => {
  let component: BtsHomeComponent;
  let fixture: ComponentFixture<BtsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
