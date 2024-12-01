import { Component } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';
import { DataService } from '../service/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-item',
  templateUrl: 'add-new-item.page.html',
  styleUrls: ['./add-new-item.page.scss'],
})
export class AddNewItemPage {
  Destinacija: string;
  datumDO: string;
  datumOd: string;
  slika: string;
  troskovi: string;

  constructor(private firestore: Firestore, private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController, private route: Router
  ) { }

  addNewItem() {
    const newItem = {
      Destinacija: this.Destinacija,
      datumOd: Timestamp.fromDate(new Date(this.datumOd)),
      datumDO: Timestamp.fromDate(new Date(this.datumDO)),
      slika: this.slika,
    };

    console.log('Dodajem novi item:', newItem);


    this.alertCtrl.create({
      header: 'Potvrda',
      message: 'Da li ste sigurni da želite da dodate ovo putovanje?',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Dodavanje otkazano.');

          },
        },
        {
          text: 'Dodaj',
          role: 'confirm',
          handler: () => {


            addDoc(collection(this.firestore, 'Putovanja'), newItem)
              .then(() => {
                console.log('Stavka uspešno dodata!');
                this.modalCtrl.dismiss();

              })
              .catch((error) => {
                console.error('Greška prilikom dodavanja stavke: ', error);
              });
          },
        },
      ],
    }).then((alert) => alert.present());
  }
  async goToHome() {
    this.route.navigate['/home'];
  }
  cancel() {
    this.modalCtrl.dismiss();
  }
}
