import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const mainRoutes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path:'home', loadChildren:()=>import('./home/home.module').then(mod=>mod.HomeModule)},
      { path: 'user', loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule) },
      { path: 'role', loadChildren:()=>import('./role/role.module').then(mod=>mod.RoleModule) },
       { path: 'function', loadChildren:()=>import('./function/function.module').then(mod=>mod.FunctionModule) }
    ]
  }
];