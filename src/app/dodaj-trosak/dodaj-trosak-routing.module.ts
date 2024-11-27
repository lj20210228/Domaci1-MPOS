import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DodajTrosakPage } from './dodaj-trosak.page';

const routes: Routes = [
  {
    path: '',
    component: DodajTrosakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DodajTrosakPageRoutingModule {}
