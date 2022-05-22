import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkersComponent } from './edit-workers.component';

describe('EditWorkersComponent', () => {
  let component: EditWorkersComponent;
  let fixture: ComponentFixture<EditWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
