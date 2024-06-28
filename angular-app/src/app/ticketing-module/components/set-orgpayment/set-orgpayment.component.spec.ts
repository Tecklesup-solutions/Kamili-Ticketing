import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOrgpaymentComponent } from './set-orgpayment.component';

describe('SetOrgpaymentComponent', () => {
  let component: SetOrgpaymentComponent;
  let fixture: ComponentFixture<SetOrgpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetOrgpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetOrgpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
