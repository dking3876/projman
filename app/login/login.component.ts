import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { access, DataWrapper } from '../defs/required';

@Component({
    moduleId: module.id,
    selector: 'login',
    providers: [DataWrapper, access],
    templateUrl: 'login.component.html',
    styles: [`
        form{
            padding-top:15%;
            width:50%;
            margin:auto;
            text-align:center;
        }
    `],
    outputs: ['someevent']
})
export class LoginComponent{
    username:string;
    password:string;
    model:Object = {
        username: "",
        password:""
    };
    
    constructor(private _access:access, private _dataRequest:DataWrapper, private _router:Router){

    }
    login(){
        
        console.log(this.model['username']);    
        this._dataRequest.getUsers({"email": this.model['username']}).then(data => {
            console.log(data);
            if(data[0]){
                let user = data[0];
                this._access.loadUser(data[0]);
                console.log(!user.lastLogin);
                console.log(this._access);
                if(!user.lastLogin){
                    console.log("user never logged in");
                    //New user redirect to the profile page
                    this._router.navigate(['/users', user._id.$oid ]);
                    return false;
                }else{
                    //save the lastLogin parameter to user Object and database to register for lastest comments
                    console.log(this._access);
                    this._router.navigate(['/projects' ]);
                    return false;
                }
            }

        });
    }
}