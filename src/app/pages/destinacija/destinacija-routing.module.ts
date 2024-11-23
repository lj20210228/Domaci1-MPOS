import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinacijaPage } from './destinacija.page';

const routes: Routes = [
  {
    path: '',
    component: DestinacijaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinacijaPageRoutingModule {}
