import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateReceiptComponent } from './template-receipt.component';

describe('TemplateReceiptComponent', () => {
  let component: TemplateReceiptComponent;
  let fixture: ComponentFixture<TemplateReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
