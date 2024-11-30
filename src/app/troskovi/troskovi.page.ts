import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Troskovi } from '../service/data.service';
import { DodajTrosakPage } from '../dodaj-trosak/dodaj-trosak.page';
import { AlertController, ModalController } from '@ionic/angular';
import { UpdateTroskoviPage } from '../update-troskovi/update-troskovi.page';
import { doc, Firestore } from '@angular/fire/firestore';
import { getDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-troskovi',
  templateUrl: './troskovi.page.html',
  styleUrls: ['./troskovi.page.scss'],
})
export class TroskoviPage implements OnInit {

  Troskovi: any
  DodatniTroskovi: any
  izabranaOpcija: string = ''
  troskoviId: string = ''
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private modalCtrl: ModalController, private alertController: AlertController, private router: Router, private firestore: Firestore) { }
  ngOnInit() {

    this.dataService.getDodatniTroskovi("dodatni").subscribe(dodatniTroskovi => {
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
          this.Troskovi = {
            ...troskoviData,
            VrstaPrevoza: troskoviData['VrstaPrevoza'],
            tipTroska: troskoviData['tipTroska'],
            doplata: troskoviData['doplata']
          };
          console.log("ucitani troskovi", this.Troskovi);
          if (this.DodatniTroskovi && this.DodatniTroskovi.length > 0) {
            this.izabranaOpcija = this.DodatniTroskovi.find(
              (trosak: any) => trosak.naziv === this.Troskovi.VrstaPrevoza
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
  prikaziDetalje(opcija: any) {
    this.izabranaOpcija = opcija;
  }
  async goToUpdateTroskoviPage(troskovi: Troskovi) {
    console.log('Podaci koje šaljem u modal:', troskovi);
    console.log('id koji saljem:', this.troskoviId)
    const modal = await this.modalCtrl.create({
      component: UpdateTroskoviPage,
      componentProps: {
        troskovi: troskovi,
        troskoviId: this.troskoviId
      },
    });
    return await modal.present();
  }
  async deleteTroskovi(troskovi: any) {
    const alert = await this.alertController.create({
      header: 'Potvrda',
      message: 'Da li sigurno zelite da obrisete Troskove?',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Brisanje otkazano');
          }

        },
        {
          text: 'Obrisi',
          role: 'confirm',
          handler: async () => {
            console.log('Brisanje potvrdjeno');
            console.log('Troskoviid:', this.troskoviId);
            await this.dataService.deleteTroskovi(this.troskoviId);

            if (troskovi.putovanje) {
              console.log("troskovi putovanje", troskovi.putovanje);
              const putovanjeRef = doc(this.firestore, `Putovanja/${troskovi.putovanje}`);
              const putovanjeSnap = await getDoc(putovanjeRef);
              if (putovanjeSnap.exists()) {
                const putovanjeData = putovanjeSnap.data();
                if (putovanjeData['troskovi'] === this.troskoviId) {
                  await updateDoc(putovanjeRef, { troskovi: '' });
                }
              }
            }
            this.modalCtrl.dismiss();
            this.router.navigate(['/home']);


          }
        }
      ]
    });
    await alert.present();

  }
  goToHome() {
    this.modalCtrl.dismiss();
  }


}
