import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
  @Input() putovanje: any;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    if (!this.putovanje || !this.putovanje.idPutovanja) {
      console.error('Podaci o putovanju nisu dostupni ili nemaju ID!');
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Uspeh',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  updateItem() {
    if (this.putovanje && this.putovanje.id) {
      this.dataService.updatePutovanje(this.putovanje.id, {
        Destinacija: this.putovanje.destinacija,
        datumOd: this.putovanje.datumOd,
        datumDO: this.putovanje.datumDO,
        slika: this.putovanje.slika
      })
        .then(() => {
          this.showAlert('Ažuriranje je uspešno završeno!');
          this.modalCtrl.dismiss();
        })
        .catch((error) => {
          console.error('Greška prilikom ažuriranja putovanja:', error);
        });
    } else {
      console.error('Podaci o putovanju nisu dostupni ili nemaju ID!');
    }
  }
}
