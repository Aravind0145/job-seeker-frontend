import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemployeeprofileComponent } from './updatemployeeprofile.component';

describe('UpdatemployeeprofileComponent', () => {
  let component: UpdatemployeeprofileComponent;
  let fixture: ComponentFixture<UpdatemployeeprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatemployeeprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatemployeeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
