import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { doc, docSnapshots, Firestore, updateDoc } from '@angular/fire/firestore';
import { getDoc, Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateItemPage implements OnChanges {
  @Input() putovanje: any = {
    Destinacija: '',
    datumOd: '',
    datumDO: '',
    slika: ''

  };
  @Input() putovanjeId: string = '';

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private dataService: DataService,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.route.paramMap.subscribe(params => {
      const putovanjeId = params.get('id');
      if (putovanjeId) {
        this.putovanjeId = putovanjeId;
        this.loadPutovanjeDetails();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {


  }

  loadPutovanjeDetails() {
    if (this.putovanjeId) {
      const docRef = doc(this.firestore, `Putovanja/${this.putovanjeId}`);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const putovanjeData = docSnap.data();
          console.log('Podaci učitani:', putovanjeData);

          this.putovanje = {
            ...putovanjeData,
            datumOd: putovanjeData['datumOd'] ? new Date(putovanjeData['datumOd'].toDate()).toISOString() : '',
            datumDO: putovanjeData['datumDO'] ? new Date(putovanjeData['datumDO'].toDate()).toISOString() : '',
          };
        } else {
          console.log('Dokument nije pronađen!');
        }
      }).catch((error) => {
        console.error('Greška prilikom učitavanja podataka:', error);
      });
    } else {
      console.error('ID putovanja nije postavljen!');
    }
  }


  updateItem() {
    console.log('Pre ažuriranja, putovanjeId:', this.putovanjeId);
    console.log('Podaci o putovanju za azuriranje:', this.putovanje);
    if (this.putovanje && this.putovanjeId) {
      this.alertCtrl.create({
        header: 'Potvrda',
        message: 'Da li ste sigurni da zelite da sacuvate promene',
        buttons: [{
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Azuriranje otkazano');
          }
        },
        {
          text: 'Azuriraj',
          role: 'confirm',
          handler: () => {
            this.dataService
              .updatePutovanje(this.putovanjeId, {
                Destinacija: this.putovanje.Destinacija,
                datumOd: Timestamp.fromDate(new Date(this.putovanje.datumOd)),
                datumDO: Timestamp.fromDate(new Date(this.putovanje.datumDO)),
                slika: this.putovanje.slika,
              })
              .then(() => {

                this.modalCtrl.dismiss();
                this.changeDetectorRef.detectChanges();
              })
              .catch((error) => {
                console.error('Greška prilikom ažuriranja putovanja:', error);
              });

          }

        }]

      }).then((alert) => alert.present());

    } else {
      console.error('Podaci o putovanju nisu dostupni ili nemaju ID!');
      console.log('Putovanje:', this.putovanje);
    }
  }
  cancel() {
    this.modalCtrl.dismiss();
  }
}
