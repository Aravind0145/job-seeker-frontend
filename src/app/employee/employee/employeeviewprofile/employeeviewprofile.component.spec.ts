import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeviewprofileComponent } from './employeeviewprofile.component';

describe('EmployeeviewprofileComponent', () => {
  let component: EmployeeviewprofileComponent;
  let fixture: ComponentFixture<EmployeeviewprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeviewprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeviewprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
