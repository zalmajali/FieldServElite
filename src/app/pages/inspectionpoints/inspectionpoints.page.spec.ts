import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionpointsPage } from './inspectionpoints.page';

describe('InspectionpointsPage', () => {
  let component: InspectionpointsPage;
  let fixture: ComponentFixture<InspectionpointsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InspectionpointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
