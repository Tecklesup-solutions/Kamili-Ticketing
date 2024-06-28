import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQueriesComponent } from './create-queries.component';

describe('CreateQueriesComponent', () => {
  let component: CreateQueriesComponent;
  let fixture: ComponentFixture<CreateQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQueriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
