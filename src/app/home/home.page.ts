import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';
import { Timestamp } from 'firebase/firestore';


type Putovanje = {
  destinacija?: string,
  datumDO: string,
  datumOd: string,
  idPutovanja: number,
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
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.dataService.getPutovanje().subscribe(data => {
      this.Putovanja = data.map((item: any) => ({
        ...item,
        datumDO: item.datumDO ? item.datumDO.toDate() : null,
        datumOd: item.datumOd ? item.datumOd.toDate() : null,
        slika: item.slika
      })) as Putovanje[];
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
      componentProps: putovanje
    })
    return await modal.present();
  }


}
