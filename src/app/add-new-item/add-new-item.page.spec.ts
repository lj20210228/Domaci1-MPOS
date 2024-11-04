import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewItemPage } from './add-new-item.page';

describe('AddNewItemPage', () => {
  let component: AddNewItemPage;
  let fixture: ComponentFixture<AddNewItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
