import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SystemContants } from "../common/system.constant";
import { UrlConstants } from "../common/url.constant";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {

    }
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        if (localStorage.getItem(SystemContants.CURRENT_USER)) {
            return true;
        } else {
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: {
                    returnUrl: routerState.url
                }
            });
            return false;
        }
    }

}