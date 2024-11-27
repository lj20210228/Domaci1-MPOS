import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Troskovi } from '../service/data.service';
import { DodajTrosakPage } from '../dodaj-trosak/dodaj-trosak.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-troskovi',
  templateUrl: './troskovi.page.html',
  styleUrls: ['./troskovi.page.scss'],
})
export class TroskoviPage implements OnInit {

  Troskovi: any
  DodatniTroskovi: any
  izabranaOpcija: string = ''
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private modalCtrl: ModalController) { }
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getTrokoviById(id).subscribe(troskovi => {
      this.Troskovi = troskovi;
      if (troskovi.VrstaPrevoza) {
        this.dataService.getDodatniTroskovi(troskovi.VrstaPrevoza).subscribe(dodatniTroskovi => {
          this.DodatniTroskovi = dodatniTroskovi;
        });
      }

    });
  }
  prikaziDetalje(opcija: any) {
    this.izabranaOpcija = opcija;
  }


}
