import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateTroskoviPage } from './update-troskovi.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateTroskoviPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateTroskoviPageRoutingModule {}
