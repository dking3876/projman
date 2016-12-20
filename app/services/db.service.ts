import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class db{
    private _url = "api/api.php";
    constructor(private _http: Http){

    }
    getData(collection?: string, where:Object = {}, filter:Object = {}){

        let url = this._url+"?action=queryCollection&collection="+collection+"&where="+JSON.stringify(where).replace("&", "|a|m|p|")+"&filter="+JSON.stringify(filter).replace("&", "|a|m|p|");

        //returns some data based on the type passed
        return this._http.get(url).toPromise().then(res => {

            return res.json();

        });
    }
    putData(collection: string, id:string,data:any){
        //let url = this._url+"?action=updateDocument&collection="+collection+"&id="+id+"&data="+JSON.stringify(data);
        //update/add some data with the object passed
        //let url = this._url + "?action=saveDocument&collection="+collection+"&data="+JSON.stringify(data);
        
        return this._http.post(this._url, {
            data: data,
            collection: collection,
            action: "saveDocument"
        }).toPromise().then( res => {
            console.log(res);
            return res.json();
        })/*
        console.log(url);
        return this._http.get(url).toPromise().then(res => {
            console.log(res);
            return res.json();

        });*/
    }
    deleteData(obj: Object){
        //delete some data with the object passed
    }
    updateData(){
        //update a document
    }
}