import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpCommonService } from '../app/http-common.service'; // Import your HttpCommonService or HTTP service

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor( private httpCommonService: HttpCommonService,
     private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.httpCommonService.authorizationToken = this.httpCommonService.getCookie('authorizationToken', true, true);
        // check url  is 4200 or mtrrport.xyz
        // if (window.location.hostname === 'localhost' || window.location.hostname === 'mtrrport.xyz') {
            // return this.checkLogin();
            // if (window.location.hostname !== 'mtrreport.xyz' && window.location.hostname !== 'localhost') {
            //     window.location.href = 'https://mtrreport.xyz';
            //     return false;
            // }
        // } else {
        //     // return this.checkLogin()
        // }

        // if (this.httpCommonService.authorizationToken) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        //     return false;
        // }
        return true;
    }
}
