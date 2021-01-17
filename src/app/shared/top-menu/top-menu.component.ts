import { Component, OnInit } from '@angular/core';
import { SystemContants } from 'src/app/core/common/system.constant';
import { UrlConstants } from 'src/app/core/common/url.constant';
import { LoggedInUser } from 'src/app/core/domain/loggedin.user';
import { AuthenService } from 'src/app/core/services/authen.service';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public user!: LoggedInUser;
  constructor(private _authenService:AuthenService,private _utilityService:UtilityService) { }

  ngOnInit(): void {
    this.user = this._authenService.getLoggedInUser();
  }

  logout(){
    localStorage.removeItem(SystemContants.CURRENT_USER);
    this._utilityService.navigate(UrlConstants.LOGIN);
  }
}
