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

  Destinacija: string;
  datumDO: string;
  datumOd: string;
  id: number;
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
  updatePutovanje(putovanje: Putovanje, updatedData: { Destinacija: any; datumOd: any; datumDO: any; slika: any; }) {
    const putovanjeRef = doc(this.firestore, `Putovanja/${putovanje.id}`);
    return updateDoc(putovanjeRef, {
      Destinacija: putovanje.Destinacija,
      datumDO: putovanje.datumDO,
      datumOd: putovanje.datumOd,
      slika: putovanje.slika,
    });
  }
  deletePutovanje(putovanje: Putovanje) {
    const putovanjeRef = doc(this.firestore, `Putovanja/${putovanje.id}`);
    return deleteDoc(putovanjeRef);
  }
}
