import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  docData,
  deleteDoc,
  addDoc
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Timestamp, updateDoc } from 'firebase/firestore';

import { Observable } from 'rxjs';
export interface Putovanje {

  Destinacija: string;
  datumDO: string;
  datumOd: string;
  id: number;
  podaci: string;
  slika: string;


}
export interface Destinacija {
  brojStanovnika: number,
  naziv: string,

}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore, private router: Router) { }
  getDestinacijaById(podaciId: string): Observable<Destinacija | undefined> {
    const destinacijaDocRef = doc(this.firestore, `Destinacija/${podaciId}`);
    return docData(destinacijaDocRef, { idField: 'id' }) as Observable<Destinacija>;
  }
  navigateToDestinacija(podaciId: string) {
    this.router.navigate([`/destinacija/${podaciId}`]);
  }
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
