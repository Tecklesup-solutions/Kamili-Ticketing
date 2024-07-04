import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCardpaymentComponent } from './set-cardpayment.component';

describe('SetCardpaymentComponent', () => {
  let component: SetCardpaymentComponent;
  let fixture: ComponentFixture<SetCardpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetCardpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetCardpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
