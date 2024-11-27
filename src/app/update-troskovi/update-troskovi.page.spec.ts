import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateTroskoviPage } from './update-troskovi.page';

describe('UpdateTroskoviPage', () => {
  let component: UpdateTroskoviPage;
  let fixture: ComponentFixture<UpdateTroskoviPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTroskoviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
