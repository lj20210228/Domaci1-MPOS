import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateItemPage } from './update-item.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateItemPageRoutingModule {}
