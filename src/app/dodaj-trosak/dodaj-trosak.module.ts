import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DodajTrosakPageRoutingModule } from './dodaj-trosak-routing.module';

import { DodajTrosakPage } from './dodaj-trosak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DodajTrosakPageRoutingModule
  ],
  declarations: [DodajTrosakPage]
})
export class DodajTrosakPageModule {}
