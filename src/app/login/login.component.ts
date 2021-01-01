import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
import { AuthenService } from '../core/services/authen.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constant';
import { MessageContstants } from '../core/common/message.constant';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  model: any = {};
  returnUrl: string | undefined;
  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }
  login(): void {
    this.loading = true;
    this.authenService.login(this.model.username, this.model.password).subscribe((data:any) => {
      this.router.navigate([UrlConstants.HOME]);
    }, error => {
      this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }

}