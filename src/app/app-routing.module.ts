import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren:()=> import('./login/login.module').then(mod=>mod.LoginModule) },
  { path: 'main', loadChildren: ()=> import('./main/main.module').then(mod=>mod.MainModule),canActivate:[AuthGuard] }
];
