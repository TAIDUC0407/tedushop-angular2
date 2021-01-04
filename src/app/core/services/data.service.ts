import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthenService } from "./authen.service";
import { SystemContants } from "../common/system.constant";
import { Observable } from 'rxjs';
import { MessageContstants } from '../common/message.constant';
import { UtilityService } from './utility.service';
import { NotificationService } from './notification.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers: HttpHeaders;
  constructor(private _http: HttpClient, private _router: Router, private _authenService: AuthenService,
    private _utilityService: UtilityService, private _notificationService: NotificationService) {
    this.headers = new HttpHeaders();
    this.headers.append("Content-Type", "application/json");
  }

  get(uri: string) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", " Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.get(SystemContants.BASE_API + uri, { headers: this.headers })
      .pipe(map(res => {
        let body = JSON.parse(JSON.stringify(res));
        return body;
      }));
  }
  post(uri: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", " Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemContants.BASE_API + uri, data, { headers: this.headers })
      .pipe(map(res => {
        let body = JSON.parse(JSON.stringify(res));
        return body;
      }));
  }
  put(uri: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", " Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.put(SystemContants.BASE_API + uri, data, { headers: this.headers }).pipe(map(res =>{
      let body = JSON.parse(JSON.stringify(res));
      return body;
    }));
  }
  delete(uri: string, key: string, id: string) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", " Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.delete(SystemContants.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
      .pipe(map(res=>{
        let body = JSON.parse(JSON.stringify(res));
        return body;
      }));
  }
  // postFile(uri: string, data?: any, key?: string, id?: string) {
  //   let newHeaders = new Headers();
  //   newHeaders.append("Authorization", " Bearer " + this._authenService.getLoggedInUser().access_token);
  //   return this._http.post(SystemContants.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
  //   .pipe(map(res=>{
  //     let body = JSON.parse(JSON.stringify(res));
  //     return body;
  //   }));
  // }

  postFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader.append("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemContants.BASE_API + uri, data, { headers: newHeader })
    .pipe(map(res=>{
      let body = JSON.parse(JSON.stringify(res));
      return body;
    }));
  }
  private exTractData(res: any) {
    let body = JSON.parse(JSON.stringify(res));
    return body;
  }

  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemContants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
      this._notificationService.printErrorMessage(errMsg);

      return Observable.throw(errMsg);
    }
    return '';

  }
}
