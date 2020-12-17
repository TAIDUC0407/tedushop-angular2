import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren:()=> import('./login/login.module').then(mod=>mod.LoginModule) },
  { path: 'main', loadChildren: ()=> import('./main/main.module').then(mod=>mod.MainModule) }
];
