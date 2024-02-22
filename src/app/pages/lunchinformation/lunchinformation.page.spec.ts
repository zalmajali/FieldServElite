import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LunchinformationPage } from './lunchinformation.page';

describe('LunchinformationPage', () => {
  let component: LunchinformationPage;
  let fixture: ComponentFixture<LunchinformationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LunchinformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
