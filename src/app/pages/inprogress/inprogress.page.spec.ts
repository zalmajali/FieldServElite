import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InprogressPage } from './inprogress.page';

describe('InprogressPage', () => {
  let component: InprogressPage;
  let fixture: ComponentFixture<InprogressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InprogressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
