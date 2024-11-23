import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinacijaPage } from './destinacija.page';

describe('DestinacijaPage', () => {
  let component: DestinacijaPage;
  let fixture: ComponentFixture<DestinacijaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinacijaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
