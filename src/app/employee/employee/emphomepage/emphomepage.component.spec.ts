import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmphomepageComponent } from './emphomepage.component';

describe('EmphomepageComponent', () => {
  let component: EmphomepageComponent;
  let fixture: ComponentFixture<EmphomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmphomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmphomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
