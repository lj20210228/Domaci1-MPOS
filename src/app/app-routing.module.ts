import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'add-new-item',
    loadChildren: () => import('./add-new-item/add-new-item.module').then(m => m.AddNewItemPageModule)
  },
  {
    path: 'update-item',
    loadChildren: () => import('./update-item/update-item.module').then(m => m.UpdateItemPageModule)
  },
  {
    path: 'troskovi/:id',
    loadChildren: () => import('./troskovi/troskovi.module').then(m => m.TroskoviPageModule)
  },
  {
    path: 'dodaj-trosak',
    loadChildren: () => import('./dodaj-trosak/dodaj-trosak.module').then( m => m.DodajTrosakPageModule)
  },
  {
    path: 'update-troskovi',
    loadChildren: () => import('./update-troskovi/update-troskovi.module').then( m => m.UpdateTroskoviPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
