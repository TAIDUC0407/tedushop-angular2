import { Component, OnInit } from '@angular/core';
import { SystemContants } from '../core/common/system.constant';
import { UrlConstants } from '../core/common/url.constant';
import { UtilityService } from '../core/services/utility.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _utilityService:UtilityService) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem(SystemContants.CURRENT_USER);
    this._utilityService.navigate(UrlConstants.LOGIN);
  }
}
