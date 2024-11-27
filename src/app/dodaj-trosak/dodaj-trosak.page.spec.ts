import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DodajTrosakPage } from './dodaj-trosak.page';

describe('DodajTrosakPage', () => {
  let component: DodajTrosakPage;
  let fixture: ComponentFixture<DodajTrosakPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajTrosakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
