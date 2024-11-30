import { ChangeDetectorRef, Component, Input, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DataService } from '../service/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
@Component({
  selector: 'app-update-troskovi',
  templateUrl: './update-troskovi.page.html',
  styleUrls: ['./update-troskovi.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTroskoviPage implements OnInit {
  @Input() troskovi: any = {
    BoravisnaTaksa: '',
    Izleti: '',
    Prevoz: '',
    Smestaj: '',
    VrstaPrevoza: '',
    tipTroska: '',
    doplata: '',

  };
  @Input() troskoviId: string = '';


  izabranaOpcija: any = {};
  DodatniTroskovi: any;
  constructor(private firestore: Firestore, private service: DataService, private modalCtrl: ModalController, private alertCtrl: AlertController, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private router: Router) {

  }

  ngOnInit() {
    this.service.getDodatniTroskovi("dodatni").subscribe(dodatniTroskovi => {
      this.DodatniTroskovi = dodatniTroskovi.doplata;
      console.log('DodatniTroskovi:', this.DodatniTroskovi);
      this.loadTroskoviDetails();
    });
    console.log('Ucitani id mi je:', this.troskoviId);
  }
  loadTroskoviDetails() {
    if (this.troskoviId) {

      const docRef = doc(this.firestore, `Troskovi/${this.troskoviId}`);

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const troskoviData = docSnap.data();
          console.log('Podaci ucitani:', troskoviData);
          this.troskovi = {
            ...troskoviData,
            VrstaPrevoza: troskoviData['VrstaPrevoza'],
            tipTroska: troskoviData['tipTroska'],
            doplata: troskoviData['doplata']
          };
          console.log("ucitani troskovi", this.troskovi);
          if (this.DodatniTroskovi && this.DodatniTroskovi.length > 0) {
            this.izabranaOpcija = this.DodatniTroskovi.find(
              (trosak: any) => trosak.naziv === this.troskovi.VrstaPrevoza
            );
          }
          console.log('Izabrana opcija:', this.izabranaOpcija);
        } else {
          console.log('Dokument nije pronadjen');
        }
      }).catch((error) => {
        console.error('Greske prilikom ucitavanja podataka', error);
      });

    } else {
      console.error('Id troskova nije postavljen!');
    }
  }
  updateItem() {
    console.log('Pre azuriranja,troskoviId', this.troskoviId);
    console.log('Podaci o troskovima za azuriranje:', this.troskovi);
    if (this.troskovi && this.troskoviId) {

      this.alertCtrl.create({
        header: 'Potvrda',
        message: 'Da li zelite da sacuvate promene',
        buttons: [{
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Azuriranje otkazano');
          }
        },
        {
          text: 'Azuriraj',
          role: 'confirm',
          handler: () => {
            this.service.updateTroskovi(this.troskoviId, {
              BoravisnaTaksa: this.troskovi.BoravisnaTaksa,
              Izleti: this.troskovi.Izleti,
              Prevoz: this.troskovi.Prevoz,
              Smestaj: this.troskovi.Smestaj,
              VrstaPrevoza: this.izabranaOpcija.naziv,
              tipTroska: this.izabranaOpcija.tipTroska,
              doplata: this.izabranaOpcija.doplata

            }).then(() => {
              this.modalCtrl.dismiss();
              this.changeDetectorRef.detectChanges();
            }).catch((error) => {
              console.error('Greska prilikom azuriranja troskova:', error);
            });
          }
        }]
      }).then((alert) => alert.present());
    }
  }
  cancel() {
    this.modalCtrl.dismiss();
  }
  goToTroskoviPage() {

    this.modalCtrl.dismiss();
  }
  prikaziDetalje(opcija: any) {
    this.izabranaOpcija = opcija;
  }



}
