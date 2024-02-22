import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkordersPage } from './workorders.page';

describe('WorkordersPage', () => {
  let component: WorkordersPage;
  let fixture: ComponentFixture<WorkordersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WorkordersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
