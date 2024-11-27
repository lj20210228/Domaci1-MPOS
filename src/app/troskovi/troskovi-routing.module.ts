import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TroskoviPage } from './troskovi.page';

const routes: Routes = [
  {
    path: '',
    component: TroskoviPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TroskoviPageRoutingModule {}
