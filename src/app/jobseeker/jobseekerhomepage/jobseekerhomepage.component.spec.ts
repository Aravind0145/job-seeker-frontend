import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerhomepageComponent } from './jobseekerhomepage.component';

describe('JobseekerhomepageComponent', () => {
  let component: JobseekerhomepageComponent;
  let fixture: ComponentFixture<JobseekerhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobseekerhomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
