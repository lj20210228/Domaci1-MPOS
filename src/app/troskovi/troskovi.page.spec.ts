import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TroskoviPage } from './troskovi.page';

describe('TroskoviPage', () => {
  let component: TroskoviPage;
  let fixture: ComponentFixture<TroskoviPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TroskoviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
