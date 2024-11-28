import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  docData,
  deleteDoc,
  addDoc,
  getDoc
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Timestamp, updateDoc } from 'firebase/firestore';

import { map, Observable } from 'rxjs';
export interface Putovanje {

  Destinacija: string,
  datumOd: string,
  datumDO: string,
  id: string,
  slika: string,
  troskovi: string

}
export interface Troskovi {

  BoravisnaTaksa: number,
  Izleti: number,
  Prevoz: number,
  Smestaj: number,
  VrstaPrevoza: string,
  putovanje: string

}
export interface DodatniTroskovi {
  doplata: string[];
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore, private router: Router) { }
  getDodatniTroskovi(troskoviID: string): Observable<DodatniTroskovi | undefined> {
    const dodatniTroskoviRef = doc(this.firestore, `DodatniTroskovi/${troskoviID}`);
    return docData(dodatniTroskoviRef, { idField: 'id' }) as Observable<DodatniTroskovi>;

  }
  getTrokoviById(podaciId: string): Observable<Troskovi> {
    const destinacijaDocRef = doc(this.firestore, `Troskovi/${podaciId}`);
    return docData(destinacijaDocRef, { idField: 'id' }) as Observable<Troskovi>;
  }
  getPutovanjeById(putovanjeId: string): Observable<Putovanje> {
    const putovanjeRef = doc(this.firestore, `Putovanja/${putovanjeId}`);
    return docData(putovanjeRef, { idField: 'id' }) as Observable<Putovanje>;
  }

  navigateToTroskovi(podaciId: string) {
    this.router.navigate([`/ troskovi / ${podaciId}`]);
  }
  getPutovanje() {
    const putovanjeRef = collection(this.firestore, 'Putovanja');
    return collectionData(putovanjeRef, { idField: 'id' });
  }
  addPutovanje(putovanje: Putovanje) {
    const putovanjeRef = collection(this.firestore, 'Putovanja');
    return addDoc(putovanjeRef, putovanje);
  }
  updatePutovanje(putovanjeId: string, updatedData: { Destinacija: any; datumOd: any; datumDO: any; slika: any; }) {
    const putovanjeRef = doc(this.firestore, `Putovanja/${putovanjeId}`);
    return updateDoc(putovanjeRef, updatedData);
  }
  deletePutovanje(putovanjeId: string) {
    const putovanjeRef = doc(this.firestore, `Putovanja/${putovanjeId}`);
    return deleteDoc(putovanjeRef)
      .then(() => {
        console.log(`Putovanje sa ID-jem ${putovanjeId} je uspešno obrisano.`);
      })
      .catch((error) => {
        console.error(`Greška prilikom brisanja putovanja: ${error}`);
      });
  }

  addTrosak(trosak: Troskovi) {
    const trosakRef = collection(this.firestore, 'Troskovi');
    return addDoc(trosakRef, trosak);
  }
  updateTroskovi(troskovi: Troskovi, updatedData: { BoravisnaTaksa: any, Izleti: any, Prevoz: any, Smestaj: any, VrstaPrevoza: any }) {
    const troskoviRef = doc(this.firestore, `Troskovi/${troskovi}`);
    return updateDoc(troskoviRef, {
      BoravisnaTaksa: troskovi.BoravisnaTaksa,
      Izleti: troskovi.Izleti,
      Prevoz: troskovi.Prevoz,
      Smestaj: troskovi.Smestaj,
      VrstaPrevoza: troskovi.VrstaPrevoza
    })
  }
}
