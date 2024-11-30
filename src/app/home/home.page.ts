import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController, IonicSafeString } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';
import { DataService } from '../service/data.service';
import { Subscription, switchMap } from 'rxjs';
import { doc, Timestamp } from 'firebase/firestore';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Troskovi } from '../service/data.service';
import { DodajTrosakPage } from '../dodaj-trosak/dodaj-trosak.page';
import { TroskoviPage } from '../troskovi/troskovi.page';
import { Firestore } from '@angular/fire/firestore';



type Putovanje = {
  Destinacija: string,
  datumDO: string,
  datumOd: string,
  id: string,
  slika: string,
  troskovi: string


}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit, OnDestroy {
  today: number = Date.now();

  Putovanja: any;
  sub: Subscription = new Subscription;
  constructor(public modalCtrl: ModalController, private dataService: DataService, public authService: AuthenticationService, public route: Router, private alertController: AlertController, private firestore: Firestore) { }
  isPastTrip(putovanje: any): boolean {
    const now = new Date();
    return putovanje.datumDO < now;
  }

  isFutureTrip(putovanje: any): boolean {
    const now = new Date();
    return putovanje.datumOd > now;
  }
  isCurrentTrip(putovanje: any): boolean {
    const now = new Date();
    return putovanje.datumOd <= now && putovanje.datumDO >= now;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {

    this.dataService.getPutovanje().subscribe(data => {
      this.Putovanja = data.map((item: any) => ({
        ...item,
        datumOd: item.datumOd instanceof Timestamp ? item.datumOd.toDate() : new Date(item.datumOd),
        datumDO: item.datumDO instanceof Timestamp ? item.datumDO.toDate() : new Date(item.datumDo),

        slika: item.slika
      })) as Putovanje[];
    });
    console.log(this.Putovanja)

  }

  async showTroskoviDetails(podaciId: string, putovanjeId: string) {
    console.log("id putovanja:" + putovanjeId);
    console.log("id troskova:" + podaciId);
    if (!podaciId || podaciId.trim() === '') {
      console.warn('ID troškova je prazan. Preusmeravam na stranicu dodaj trošak.');
      this.goToDodajTrosakPage(putovanjeId);
      return;
    }
    this.dataService.getTrokoviById(podaciId).subscribe(async (troskovi: Troskovi) => {
      console.log("Troskovi", troskovi);

      if (troskovi && podaciId != null && podaciId != '') {
        this.dataService.getPutovanjeById(troskovi.putovanje).subscribe(async (putovanje: Putovanje) => {
          if (putovanje) {
            console.log("putovanje:", putovanje);
            const prevoz = troskovi.Prevoz || 'Nema podataka o prevozu';
            const smestaj = troskovi.Smestaj || 'Nema podataka o smeštaju';

            console.log("Prevoz:", prevoz);
            console.log("Smeštaj:", smestaj);
            const alert = await this.alertController.create({
              header: `Troškovi putovanja: ${putovanje.Destinacija}`,
              message:
                "Destinacija: " + putovanje.Destinacija + "\n" +
                "Prevoz: " + prevoz + "\n" +
                "Smeštaj: " + smestaj,
              cssClass: 'alert-message'
              ,
              buttons: [
                {
                  text: 'Close',
                  role: 'cancel',
                  handler: () => {
                    console.log('Alert closed');
                  }
                },
                {
                  text: 'Idi na detalje',
                  role: 'confirm',
                  handler: async () => {
                    await alert.dismiss();
                    this.goToTroskoviPage(troskovi);
                  }
                }
              ],
            });
            await alert.present();
          } else {
            console.error('Putovanje nije pronađeno');
          }
        });

      }
      else {
        console.error('Troškovi nisu pronađeni');
        this.goToDodajTrosakPage(putovanjeId);

      }
    });
  }

  async getData() {

    this.sub = this.dataService.getPutovanje().subscribe((res) => {
      this.Putovanja = res;
      console.log(this.Putovanja);
    });

  }
  async deletePutovanja(putovanje: any) {
    const alert = await this.alertController.create({
      header: 'Potvrda',
      message: 'Da li sigurno zelite da obrisete putovanje?',
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
            if (putovanje.troskovi) {
              console.log("putovanje.troskovi:", putovanje.troskovi);
              await this.dataService.deleteTroskovi(putovanje.troskovi);


            }
            console.log('Brisanje potvrdjeno');
            await this.dataService.deletePutovanje(putovanje.id);


          }
        }
      ]
    });
    await alert.present();

  }

  async goToAddPage() {
    const modal = await this.modalCtrl.create({
      component: AddNewItemPage,

    })
    return await modal.present();
  }
  async goToUpdatePage(putovanje: Putovanje) {
    console.log('Podaci koje šaljem u modal:', putovanje);
    putovanje.datumOd = new Date(putovanje.datumOd).toISOString().substring(0, 10);
    putovanje.datumDO = new Date(putovanje.datumDO).toISOString().substring(0, 10);
    const modal = await this.modalCtrl.create({
      component: UpdateItemPage,
      componentProps: {
        putovanje: putovanje,
        putovanjeId: putovanje.id
      },
    });
    return await modal.present();
  }
  async logout() {
    this.authService.signOut().then(() => {
      this.route.navigate(['/login'])
    })
  }
  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
  async goToDodajTrosakPage(putovanjeId: string) {
    const modal = await this.modalCtrl.create({
      component: DodajTrosakPage,
      componentProps: {
        id: putovanjeId
      }
    })
    return await modal.present();
  }
  async goToTroskoviPage(troskovi: Troskovi) {
    console.log("Putovanje id", troskovi);
    const modal = await this.modalCtrl.create({
      component: TroskoviPage,
      componentProps: {
        troskovi: troskovi,
        troskoviId: troskovi.id
      }
    })
    return await modal.present();
  }

}

