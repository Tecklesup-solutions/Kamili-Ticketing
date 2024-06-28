import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCheckComponent } from './organization-check.component';

describe('OrganizationCheckComponent', () => {
  let component: OrganizationCheckComponent;
  let fixture: ComponentFixture<OrganizationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
