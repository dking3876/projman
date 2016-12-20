import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http'

import 'rxjs/add/operator/toPromise';
/*
 *  This class wraps all the get, post, put, delete requests and passes to the db class
 * */ 
import { dataRequest,conditions } from './dataRequest.interface'; 
import { access } from '../security/access.service';
import * as Globals from '../defs/definitions';
@Injectable()
export class DataWrapper implements dataRequest{
    constructor(private _http: Http, private _access:access){

    }
    checkId(doc:Object){
        for(let prop in doc){
            if(prop == '_id'){
                doc[prop] = doc = {
                    '$oid': doc[prop]
                }
            }
        }
        return doc;
    }
    getProjects(userData:access,filters?:conditions){
        //Check userData for permissions for what to access
        console.log("access: ", this._access);
        let limit:any, page:any, filter:Object = {}, collection = "projects", where = {}, conditions:Array<Object> = [];
        if(filters.offsets){
            limit = filters.offsets['limit'];
            page = filters.offsets['page'];
            filter['limit'] = limit;
            filter['skip'] = (page == 1)? 0 : limit * (page - 1);
        }
        if(filters.fields && filters.fields.length > 0){
            filter['projection'] = {};
            for(let field in filters.fields){
                filter['projection'][field] = 1
            }
        }
        /*
            * @ToDo: Build a function to determine what the "Where" will be as more users are added
            * sortby: Users, ProjectType(subject), clientName, startDate ect
            * */
        if(this._access.permission !== 1){
            conditions.push({
                '_id': {
                    "$in": userData.get("projects")
                    }
            });
        }
        if(filters.projectTypes && filters.projectTypes.length > 0){
            conditions.push({
                'subject': filters.projectTypes[0]
            });
        }
        if(filters.projectIds && filters.projectIds.length > 0){
            console.log(filters, filters.projectIds)
            for(let i=0;i<filters.projectIds.length;++i){
                conditions.push({
                    '_id': {
                        '$oid': filters.projectIds[i]
                    }
                })
            }
        }
        
        if(conditions.length > 1){
            where['$and'] = conditions;
        }else{
            where = conditions[0] ? conditions[0] : {};
        }
        console.log("Where Clause: ", where);
        console.log("Fitler Clause: ", filter);
        return this.getData(collection, where, filter).then(res =>{
            console.log(res);
            return res;
        });
    }
    putProject(documentInfo:Object, operator?:string ){
        let collectionName = "projects", id:Object, put:Object = documentInfo;
        if(operator){
            put = {};
            put[operator] = documentInfo;
        }
        if(documentInfo['_id'] && documentInfo['_id']['$oid'] !== ""){
            id = documentInfo['id'];
        }
        return this.putData(collectionName, put,"saveDocument", id ).then(res => {
            return res;
        });
    }
    getAssets(projectId:Object, assetType?:Array<string>, index?:Array<number>){
        let collection = "projects", where:Object, filter:Object;

        where = {
            "_id": projectId,
        };
        let type = 'assets'+assetType;
        filter = {
            projection: {}
        };
        filter['projection'][type] = 1; // gets all the assets of a type or all assets provided no type was provided
        if(index){ //Should array of asset indexes ie. assets.mockups.{index}
            for(let i in index){
                filter['projection'][type][i] = 1;
            }
        }
        return this.getData(collection, where, filter).then(res => {
            return res;
        });
    }
    putAsset(projectId:Object, assetType:string, assetData:Object, operator?:string){
        return new Promise(x => {});
    }
    getProjectTypes(filters?:conditions){

    }
    getUsers(by:Object, filter:Object = {}){
        let where = by;
        return this.getData("users", where, filter).then(res => {
            console.log("users response: ",res);
            return res;
        })
    }
    putUsers(){

    }
    /*
     *  This is a Core API method
     * */
    getAccounts(){

    }
    /*
     *  Get Ticket Information
     * */
    getTickets(){

    }
    /*
     *  Update Ticket comments and move the ticket where needed.
     * */
    updateTicket(){

    }
    queryGet(url:string){
        
        return this._http.get(url).toPromise().then(res => {
            console.log("raw Response: ", res);
            return res.json();
        }).catch( er => {
            console.log(er);
            return er;  
        });

    }
    queryPost(url:string,data:Object){
        return new Promise(x => {});
    }
    getData(collection: string, where:Object = {}, filter:Object = {}){

        let url = Globals.mongo.url+"?apiType=mongo&action=queryCollection&collection="+collection+"&where="+JSON.stringify(where).replace("&", "|a|m|p|")+"&filter="+JSON.stringify(filter).replace("&", "|a|m|p|");
        let data = {
            apiType: 'mongo',
            action: 'queryCollection',
            collection: collection,
            where: JSON.stringify(where),
            filter: JSON.stringify(filter)
        }
        return this._http.post(Globals.mongo.url+"?apiType=mongo", data).toPromise().then( res => {
            console.log(res);
            return res.json();
        })
        //returns some data based on the type passed
        /*return this._http.get(url).toPromise().then(res => {
            console.log("raw Response: ", res);
            return res.json();
        });
        */
    }
    putData(collection: string, data:any, action:string, id?:Object,){
        //let url = this._url+"?action=updateDocument&collection="+collection+"&id="+id+"&data="+JSON.stringify(data);
        //update/add some data with the object passed
        //let url = this._url + "?action=saveDocument&collection="+collection+"&data="+JSON.stringify(data);
        
        return this._http.post(Globals.mongo.url+"?apiType=mongo", {
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
    deleteData(){

    }
}