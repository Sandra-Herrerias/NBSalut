import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTreatmentsComponent } from './list-treatments.component';

describe('ListTreatmentsComponent', () => {
  let component: ListTreatmentsComponent;
  let fixture: ComponentFixture<ListTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTreatmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
