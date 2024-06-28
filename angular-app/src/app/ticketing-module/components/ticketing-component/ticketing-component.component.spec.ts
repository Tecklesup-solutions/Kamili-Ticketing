import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingComponentComponent } from './ticketing-component.component';

describe('TicketingComponentComponent', () => {
  let component: TicketingComponentComponent;
  let fixture: ComponentFixture<TicketingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketingComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
