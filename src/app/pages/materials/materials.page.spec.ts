import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsPage } from './materials.page';

describe('MaterialsPage', () => {
  let component: MaterialsPage;
  let fixture: ComponentFixture<MaterialsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaterialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
