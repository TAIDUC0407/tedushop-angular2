import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { TreeModule } from '@circlon/angular-tree-component';
import { ModalModule } from 'ngx-bootstrap/modal';
const functionRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: FunctionComponent }
];

@NgModule({
  declarations: [FunctionComponent],
  imports: [
    CommonModule,
    TreeModule,
    FormsModule,
    ModalModule,
    RouterModule.forChild(functionRoutes)
  ]
})
export class FunctionModule { }
