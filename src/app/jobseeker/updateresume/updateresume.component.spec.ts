import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateresumeComponent } from './updateresume.component';

describe('UpdateresumeComponent', () => {
  let component: UpdateresumeComponent;
  let fixture: ComponentFixture<UpdateresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateresumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
