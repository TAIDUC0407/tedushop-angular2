import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemContants } from '../../core/common/system.constant';
import { LoggedInUser } from '../domain/loggedin.user';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string) {
    let body = "userName=" + encodeURIComponent(username) +
      "&password=" + encodeURIComponent(password) +
      "&grant_type=password";
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = { headers: headers };
    //return this._http.post<any[]>(this.apiUrl, data);
    return this._http.post<any[]>(SystemContants.BASE_API + '/api/oauth/token', body, options).subscribe((response:any) => {
      let user: LoggedInUser = response.json();
      if (user && user.access_token) {
        localStorage.removeItem(SystemContants.CURRENT_USER);
        localStorage.setItem(SystemContants.CURRENT_USER, JSON.stringify(user));
      }
    });
  }
  logout() {
    localStorage.removeItem(SystemContants.CURRENT_USER);
  }
  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemContants.CURRENT_USER);
    if (user != null) {
      return true;
    }
    else
      return false;
  }
  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemContants.CURRENT_USER) || '{}');
      user = new LoggedInUser(userData.access_token, userData.username, userData.fullName, userData.email, userData.avatar);
    }
    else
      user = null as any;
    return user;
  }
}
