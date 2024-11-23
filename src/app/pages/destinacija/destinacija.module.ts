import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestinacijaPageRoutingModule } from './destinacija-routing.module';

import { DestinacijaPage } from './destinacija.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinacijaPageRoutingModule
  ],
  declarations: [DestinacijaPage]
})
export class DestinacijaPageModule {}
