import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQueriesComponent } from './show-queries.component';

describe('ShowQueriesComponent', () => {
  let component: ShowQueriesComponent;
  let fixture: ComponentFixture<ShowQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQueriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
