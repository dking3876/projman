import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationStart, ActivatedRoute } from '@angular/router';

import { access } from './access.service';

import 'rxjs/add/operator/filter';
@Injectable()
export class sec implements CanActivate{
    private local = localStorage;
    private destUrl:string;
    constructor(private route:Router, private _access:access, private _active:ActivatedRoute){
        route
            .events
            .filter(e => e instanceof NavigationStart)
            .subscribe((e: NavigationStart) => {
                console.log(e);
                this.destUrl = e.url})
    }
    canActivate(){
        console.log(this._active);
        if(this._access.isLoggedIn){
            //user is logged in but we need to check permissions for the page based on userData
            console.log("%cDestination: "+ this.destUrl, "background:yellow");
            return this._access.isLoggedIn;
        }
        this.route.navigate(['/mylogin']);
        return false;
    }
}