import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  deleteDoc,
  addDoc
} from '@angular/fire/firestore';
import { Timestamp, updateDoc } from 'firebase/firestore';
export interface Putovanje {
  destinacija: string;
  datumDO: string;
  datumOd: string;
  idPutovanja?: number;
  slika: string;

}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }
  getPutovanje() {
    const putovanjeRef = collection(this.firestore, 'Putovanja');
    return collectionData(putovanjeRef, { idField: 'id' });
  }
  addPutovanje(putovanje: Putovanje) {
    const putovanjeRef = collection(this.firestore, 'Putovanja');
    return addDoc(putovanjeRef, putovanje);
  }
  updatePutovanje(putovanje: Putovanje) {
    const putovanjeRef = doc(this.firestore, `Putovanja/${putovanje.idPutovanja}`);
    return updateDoc(putovanjeRef, {
      destinacija: putovanje.destinacija,
      datumDO: putovanje.datumDO,
      datumOd: putovanje.datumOd,
      idPutovanja: putovanje.idPutovanja,
      slika: putovanje.slika,
    });
  }
  deletePutovanje(putovanje: Putovanje) {
    const putovanjeRef = doc(this.firestore, `Putovanja/${putovanje.idPutovanja}`);
    return deleteDoc(putovanjeRef);
  }
}
