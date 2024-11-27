import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TroskoviPageRoutingModule } from './troskovi-routing.module';

import { TroskoviPage } from './troskovi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TroskoviPageRoutingModule
  ],
  declarations: [TroskoviPage]
})
export class TroskoviPageModule {}
