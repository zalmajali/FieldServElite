import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetpestsPage } from './targetpests.page';

describe('TargetpestsPage', () => {
  let component: TargetpestsPage;
  let fixture: ComponentFixture<TargetpestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TargetpestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
