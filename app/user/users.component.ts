import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { access, DataWrapper } from '../defs/required';
import { userData } from './userData';

import {BfTextModule} from 'derykediter';
import {BfText} from 'derykediter/bf-text/index'
@Component({
    "moduleId": module.id,
    "selector": "user-data",
    "providers": [access, DataWrapper],
    "templateUrl": './user.component.html'
})
export class usersComponent implements OnInit{
    public pageTitle:string = "My Profile";
    public userId:string;
    public user:userData;
    constructor(private _router:Router, private _route:ActivatedRoute, private _access:access, private _dataRequest:DataWrapper){
        console.log(_router);
    }
    ngOnInit(){
        let tmpUser = this._route.snapshot.data['userInfo'];
        console.log(tmpUser);
        this.user = tmpUser;
        /*
        this._route.params.forEach(params => {
            this.userId = params['id'];
        });
        this._dataRequest.getUsers({
            '_id': {
                '$oid': this.userId
            }
        }).then(res =>{
            console.log(res);
            this.user = new userData().loadData(res[0]);
        });*/
        if(!this.user['lastLogin']){
            console.log("This is a new User");
        }else{
            console.log("Existing User");
        }

    }
    profileComplete(){
        return false;
    }
}
//User resolver
@Injectable()
export class userResolver implements Resolve<userData>{
    constructor(private _dataRequest:DataWrapper){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this._dataRequest.getUsers({
            '_id': {
                '$oid': route.params['id']
            }
        }).then(res => {
            return new userData().loadData(res[0]);
        })
    }
}