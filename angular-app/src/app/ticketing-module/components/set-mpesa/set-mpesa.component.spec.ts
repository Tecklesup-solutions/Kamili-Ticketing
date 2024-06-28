import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMpesaComponent } from './set-mpesa.component';

describe('SetMpesaComponent', () => {
  let component: SetMpesaComponent;
  let fixture: ComponentFixture<SetMpesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetMpesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetMpesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
