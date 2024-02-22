import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NormalPage } from './normal.page';

describe('NormalPage', () => {
  let component: NormalPage;
  let fixture: ComponentFixture<NormalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NormalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
