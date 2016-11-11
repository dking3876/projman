import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class db{
    private _url = "https://jsonplaceholder.typicode.com/posts"; // for testing we will always get put and delete from posts
    constructor(private _http: Http){

    }
    getData(type?: string){
        //returns some data based on the type passed
        return this._http.get(this._url).toPromise().then(res => {
            return res.json();
        });
    }
    putData(obj: Object){
        //update/add some data with the object passed
    }
    deleteData(obj: Object){
        //delete some data with the object passed
    }
}