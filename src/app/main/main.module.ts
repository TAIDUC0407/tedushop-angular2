import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule } from "@angular/router";
import { UserModule } from "./user/user.module";
import { HomeModule } from './home/home.module';
import { UrlConstants } from '../core/common/url.constant';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers:[UrlConstants,UtilityService,AuthenService]
})
export class MainModule { }
