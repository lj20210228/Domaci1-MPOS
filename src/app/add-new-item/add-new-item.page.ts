import { Component } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';

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

  constructor(private firestore: Firestore) { }

  addNewItem() {
    const newItem = {
      Destinacija: this.Destinacija,
      datumDo: Timestamp.fromDate(new Date(this.datumDO)),
      datumOd: Timestamp.fromDate(new Date(this.datumOd)),
      slika: this.slika,

    };

    console.log('Dodajem novi item:', newItem);

    addDoc(collection(this.firestore, 'Putovanja'), newItem)
      .then(() => {
        console.log('Stavka uspešno dodata!');
      })
      .catch((error) => {
        console.error('Greška prilikom dodavanja stavke: ', error);
      });
  }
}
