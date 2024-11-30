import { Component } from '@angular/core';
import { Firestore, addDoc, collection, doc } from '@angular/fire/firestore';
import { DataService } from '../service/data.service';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { getDoc, updateDoc } from 'firebase/firestore';


@Component({
  selector: 'app-dodaj-trosak',
  templateUrl: './dodaj-trosak.page.html',
  styleUrls: ['./dodaj-trosak.page.scss'],
})
export class DodajTrosakPage {
  BoravisnaTaksa: number;
  Izleti: number;
  Prevoz: number;
  Smestaj: number;
  VrstaPrevoza: string;
  putovanje: string



  constructor(private firestore: Firestore, private service: DataService, private navParams: NavParams, private alertCtrl: AlertController, private modalCtrl: ModalController) { }
  izabranaOpcija: any = {};

  Troskovi: any
  DodatniTroskovi: any;
  addNewTrosak() {
    if (!this.izabranaOpcija.naziv) {
      console.log("nema izabranog troska");
      return;
    }

    const newItem = {
      BoravisnaTaksa: this.BoravisnaTaksa,
      Izleti: this.Izleti,
      Prevoz: this.Prevoz,
      Smestaj: this.Smestaj,
      VrstaPrevoza: this.izabranaOpcija.naziv,
      tipTroska: this.izabranaOpcija.tipTroska,
      doplata: this.izabranaOpcija.doplata,
      putovanje: this.navParams.get('id'),
    };
    this.alertCtrl.create({
      header: 'Potvrda',
      message: 'da li ste sigurni da zelite li da dodate trosak?',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Dodavanje otkazano');
          },
        },
        {
          text: 'Dodaj',
          role: 'confirm',
          handler: () => {
            addDoc(collection(this.firestore, 'Troskovi'), newItem)
              .then((docRef) => {
                console.log('Stavka uspesno dodata sa ID-jem:', docRef.id);
                this.modalCtrl.dismiss();

                const putovanjeId = this.navParams.get('id') || '';
                if (!putovanjeId) {
                  console.error('ID putovanja nije pronađen!');
                  return;
                }
                console.log('Putovanje ID:', putovanjeId);
                const putovanjeRef = doc(this.firestore, 'Putovanja', putovanjeId);
                getDoc(putovanjeRef).then((putovanjeDoc) => {
                  if (putovanjeDoc.exists()) {
                    const putovanjeData = putovanjeDoc.data();
                    const existingTroskovi = Array.isArray(putovanjeData?.['troskovi'])
                      ? putovanjeData['troskovi'].join(',')
                      : putovanjeData?.['troskovi'] || '';
                    const updatedTroskovi = existingTroskovi ? `${existingTroskovi},${docRef.id}` : docRef.id;
                    updateDoc(putovanjeRef, {
                      'troskovi': updatedTroskovi
                    }).then(() => {
                      console.log('Putovanje uspešno ažurirano sa novim troškom');
                    }).catch((error) => {
                      console.error('Greška pri ažuriranju putovanja', error);
                    });
                  } else {
                    console.log('Putovanje nije pronađeno');
                  }
                }).catch((error) => {
                  console.error('Greška pri učitavanju putovanja', error);
                });

              })
              .catch((error) => {
                console.error('Greška prilikom dodavanja troška:', error);
              });
          }
        }
      ]
    }).then((alert) => alert.present());

  }
  ngOnInit() {
    this.service.getDodatniTroskovi("dodatni").subscribe(dodatniTroskovi => {
      this.DodatniTroskovi = dodatniTroskovi.doplata;
    });
  }
  prikaziDetalje(opcija: any) {
    this.izabranaOpcija = opcija;
  }
  vratiNaPocetnu() {
    this.modalCtrl.dismiss();
  }

}
