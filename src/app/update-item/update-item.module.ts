import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateItemPageRoutingModule } from './update-item-routing.module';

import { UpdateItemPage } from './update-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateItemPageRoutingModule
  ],
  declarations: [UpdateItemPage]
})
export class UpdateItemPageModule {}
