import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController, IonicSafeString } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';
import { DataService } from '../service/data.service';
import { Subscription, switchMap } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Troskovi } from '../service/data.service';
import { DodajTrosakPage } from '../dodaj-trosak/dodaj-trosak.page';



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
  constructor(public modalCtrl: ModalController, private dataService: DataService, public authService: AuthenticationService, public route: Router, private alertController: AlertController) { }
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
    this.dataService.getTrokoviById(podaciId).subscribe(async (troskovi: Troskovi) => {
      if (troskovi) {
        this.dataService.getPutovanjeById(troskovi.putovanje).subscribe(async (putovanje: Putovanje) => {
          if (putovanje) {
            const alert = await this.alertController.create({
              header: `Troškovi putovanja: ${putovanje.Destinacija}`,
              message: `
              
                Destinacija: ${putovanje.Destinacija}
                <br>Prevoz: ${troskovi.Prevoz}
                <br> Smeštaj: ${troskovi.Smestaj}`,
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
                    this.route.navigate([`troskovi/${podaciId}`]);
                  }
                }
              ],
            });
            await alert.present();
          } else {
            console.error('Putovanje nije pronađeno');

          }
        });
      } else {
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
    await this.dataService.deletePutovanje(putovanje);
  }
  async goToAddPage() {
    const modal = await this.modalCtrl.create({
      component: AddNewItemPage,

    })
    return await modal.present();
  }
  async goToUpdatePage(putovanje: Putovanje) {
    const modal = await this.modalCtrl.create({
      component: UpdateItemPage,
      componentProps: { putovanje }
    })
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

}

