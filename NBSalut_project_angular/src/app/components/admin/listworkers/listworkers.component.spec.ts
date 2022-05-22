import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListworkersComponent } from './listworkers.component';

describe('ListworkersComponent', () => {
  let component: ListworkersComponent;
  let fixture: ComponentFixture<ListworkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListworkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
