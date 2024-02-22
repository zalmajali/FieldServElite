import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutemapPage } from './routemap.page';

describe('RoutemapPage', () => {
  let component: RoutemapPage;
  let fixture: ComponentFixture<RoutemapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RoutemapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
