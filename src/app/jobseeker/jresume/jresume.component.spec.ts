import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JresumeComponent } from './jresume.component';

describe('JresumeComponent', () => {
  let component: JresumeComponent;
  let fixture: ComponentFixture<JresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JresumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
