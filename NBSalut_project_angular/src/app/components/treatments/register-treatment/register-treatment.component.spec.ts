import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTreatmentComponent } from './register-treatment.component';

describe('RegisterTreatmentComponent', () => {
  let component: RegisterTreatmentComponent;
  let fixture: ComponentFixture<RegisterTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
