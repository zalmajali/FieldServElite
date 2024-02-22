import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionpointsaddPage } from './inspectionpointsadd.page';

describe('InspectionpointsaddPage', () => {
  let component: InspectionpointsaddPage;
  let fixture: ComponentFixture<InspectionpointsaddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InspectionpointsaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
