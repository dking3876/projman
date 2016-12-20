import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

import {MaterialModule } from '@angular/material';
import { MdIconModule, MdIconRegistry } from '@angular/material';
//Brafton theme files
import { NectarModule } from '@brafton/nectar';
import { BfSidenav } from '@brafton/nectar/bf-sidenav/index';

import { access, DataWrapper } from './defs/required';

//operators
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    providers: [access, MdIconRegistry, DataWrapper],
    templateUrl: './app.component.html',
    styleUrls: ['../assets/stylesheets/app.css']
    /* 
    styles: [` 
        ul.dropdown-menu{
            margin-top:0px;
        }
        li.dropdown:hover ul {
            display: block;
            color:#000000 !important;
        }
        nav {
            color:#000000 !important;
        }
        .main-navigation li ul li a{
            color:#000000 !important;
        }
    `]*/
    
})
export class AppComponent implements OnInit { 
    @ViewChild(BfSidenav)
    private sidenav: BfSidenav;
    public destUrl:string;
    public userIcon:string;
    constructor(private access:access, private _router:Router,private  _route:ActivatedRoute, private _request:DataWrapper){
         _router
            .events
            .filter(e => e instanceof NavigationStart)
            .subscribe((e: NavigationStart) => {
                this.destUrl = e.url;
            });
    }
    ngOnInit(){}
    navigate(pageName:string){
        if(!this.access.isLoggedIn){
            return;
        }
        console.log(this.access);
        if(pageName == 'usersSelf' && this.access.get('_id')){
            pageName = 'users/'+this.access.get('_id')['$oid'];
        }
        this._router.navigate([pageName]);
    }
    disableAdmin(){
        if(this.access.permission === 1){
            //add previous permission to cookie
            this.access.permission = 2
        }else{
            //check for ap user var in this component
            this.access.permission = 1;
        }
    }
    menuClick(){ //show/hide side navigation
        this.sidenav.toggleMenu();
    }
    logUserOut(){
        this.access.logUserOut();
        this._router.navigate(["/main"]);
    }
}
