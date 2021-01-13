import { Component, OnInit } from '@angular/core';
import { SystemContants } from '../core/common/system.constant';
import { LoggedInUser } from '../core/domain/loggedin.user';
import { UrlConstants } from '../core/common/url.constant';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user!: LoggedInUser;
  constructor(private _utilityService:UtilityService,private _authenService: AuthenService) { }

  ngOnInit(): void {
    this.user = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(SystemContants.CURRENT_USER))));
    console.log(this.user.fullName);
  }
  logout(){
    localStorage.removeItem(SystemContants.CURRENT_USER);
    this._utilityService.navigate(UrlConstants.LOGIN);
  }
}
