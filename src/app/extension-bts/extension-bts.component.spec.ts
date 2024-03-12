import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionBtsComponent } from './extension-bts.component';

describe('ExtensionBtsComponent', () => {
  let component: ExtensionBtsComponent;
  let fixture: ComponentFixture<ExtensionBtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtensionBtsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtensionBtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
