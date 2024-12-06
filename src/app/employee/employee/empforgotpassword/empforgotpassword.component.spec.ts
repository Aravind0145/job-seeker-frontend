import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpforgotpasswordComponent } from './empforgotpassword.component';

describe('EmpforgotpasswordComponent', () => {
  let component: EmpforgotpasswordComponent;
  let fixture: ComponentFixture<EmpforgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpforgotpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
