import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';
import { Timestamp } from 'firebase/firestore';


type Putovanje = {
  Destinacija: string,
  datumDO: string,
  datumOd: string,
  id,
  slika: string

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
  constructor(public modalCtrl: ModalController, private dataService: DataService) { }
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
        datumDO: item.datumDO instanceof Timestamp ? item.datumDO.toDate() : new Date(item.datumDo),
        datumOd: item.datumOd instanceof Timestamp ? item.datumOd.toDate() : new Date(item.datumOd),
        slika: item.slika
      })) as Putovanje[];
    });
    console.log(this.Putovanja)

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


}