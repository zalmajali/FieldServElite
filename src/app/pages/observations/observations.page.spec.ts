import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationsPage } from './observations.page';

describe('ObservationsPage', () => {
  let component: ObservationsPage;
  let fixture: ComponentFixture<ObservationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObservationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
