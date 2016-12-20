import { Injectable } from '@angular/core';
//import { Cookie } from 'ng2-cookies/ng2-cookies';

import { userData } from '../user/userData';

let passcode = "mycode";
@Injectable()
export class access{ //@toDo: replace all the authentication with OAuth but still store the user data via this class
    private _permission:number = 0 ;
    private _loggedIn: boolean = false; //replace with OAuth
    private _user:userData = new userData();
    private validTill:number = null; //replace with OAuth
    //User permissions level
    
    constructor(){
        let sess = this.getItems("all");
        if(sess){
            console.log(this.checkExpiration(sess.validTill));
            if(this.checkExpiration(sess.validTill)){
                this.loadUser(sess.userData);
            }else{
                this.logUserOut();
            }
        }
    }
    loadUser(obj:Object){
        if(this.validTill === null){
            this.setExpiration();
        }
        this.userData = obj;
        this.permission = Number.parseInt(obj['permissions']);
        this.isLoggedIn = true;
        this.saveItems();
    }
    updateUserData(obj:Object){
        this._user.update(obj);
    }
    get permission():number{
        let permission = this.getItems("permissions");
        return permission ? permission : 0;
    }
    set permission(newPermission:number){
        if(passcode && passcode === "mycode"){
            this._permission = newPermission;
            this.saveItems();
        }else{
            console.log("%cYou are not authorized to edit the user Object", "color:red");
        }
    }
    //determine if logged in; 
    set isLoggedIn(loggedIn:boolean){
        if(passcode && passcode === "mycode"){
            this._loggedIn = loggedIn;
            this.saveItems();
        }else{
            console.log("%cYou are not authorized to edit the user Object", "color:red");
        }
    }
    get isLoggedIn():boolean{
        let logIn = this.getItems("isLoggedIn");
        return logIn? logIn : false;
    }
    //retrieve user data
    set userData(data:any){
        if(passcode && passcode === "mycode"){
            this._user = new userData().loadData(data);
            this.saveItems();
        }else{
            console.log("%cYou are not authorized to edit the user Object", "color:red");
        }
    }
    get userData():any{
        let user = new userData().loadData(this.getItems("userData"));
        return user;
    }
    get(prop:string){
        let user = this.userData;
        return user.get(prop);
    }
    setExpiration(){ // 1 day expiration
        let exp = .25;
        let validTill = new Date().getTime() + (1000 * 60 * 60 * 24 * exp);
        this.validTill = validTill;
    }
    checkExpiration(timestamp:string){
        let currentTime = new Date().getTime();
        let validTill = Number.parseInt(timestamp);
        return validTill > currentTime; 
    }
    getItems(key:string){
        let raw = localStorage.getItem("projuser.new");
        if(raw){
            let decodedObj = JSON.parse(atob(raw));
            return key === "all"? decodedObj : decodedObj[key];
        }
        return null;
    }
    saveItems(){

        let token = {
            userData: this._user,
            permissions: this._permission,
            validTill: this.validTill,
            isLoggedIn: this._loggedIn
        };
        localStorage.setItem("projuser.new", btoa(JSON.stringify(token)));
    }
    deleteItems(){
        localStorage.removeItem("projuser.new")
    }
    logUserOut(){
        this.validTill = null;
        this.permission = 0;
        this.isLoggedIn = false;
        if(this.get('saveSettings')){
            this.setExpiration();
            console.log("remember me is set up");
        }else{
            console.log("destroy session data");
            this.deleteItems();
        }

    }
    
}