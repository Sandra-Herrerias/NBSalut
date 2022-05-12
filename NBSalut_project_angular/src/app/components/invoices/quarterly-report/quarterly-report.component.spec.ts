import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyReportComponent } from './quarterly-report.component';

describe('QuarterlyReportComponent', () => {
  let component: QuarterlyReportComponent;
  let fixture: ComponentFixture<QuarterlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarterlyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
