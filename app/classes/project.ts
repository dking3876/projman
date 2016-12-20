import { Component } from '@angular/core';


import { Asset } from './asset';
import { comment } from './comment';
import { comms } from './comment.interface';
import { Ticket } from './ticket';
import { db } from '../services/db.service';
import { userData } from'../user/userData';
import {Globals, DataWrapper} from '../defs/required';

@Component({
    providers: [db]
})
export class Project extends comms {
    _id:Object = {
        '$oid': ""   
    };
    projectName:string;
    clientName: string; 
    account:Object;
    sfId: string; // offload to account
    subject:string; //
    description:string;
    startDate:Object ={
        '$date': ""
    };
    endDate:Object = {
        '$date': ""
    }
    assets:Object = {}; //this may need to change to array of documents instead??
    milestones:Array<Object>;
    comms:Array<comment>;
    ticket:Object;
    users:Array<userData>;
    parent:Object = null;
    constructor(data:Object){
        super();
        for(let k in data){
            if(k == "subject"){
                this.updateSubject(data[k]);
            }else if(k == "assets"){
                for(let a in data[k]){

                    if(!this.assets[a]){
                        this.assets[a] = [];
                    }
                    for(let i=0;i<data[k][a].length;i++){
                        this.addAsset(a, data[k][a][i])
                    }
                }
            }else if(k == "ticket"){
                this.ticket = new Ticket(data[k]);
            }else if(k == "comms"){
                
            }else{
                this[k] = data[k];
            }
        }
        /*
        let tmpAssets = this.assets;
        this.assets = {};
        for(let a in tmpAssets){
            if(!this.assets[a]){
                this.assets[a] = [];
            }

            for(let i=0;i<tmpAssets[a].length;i++){
                this.addAsset(a, tmpAssets[a][i])
            }
        }*/
    }
    dependancyInjection(deps:Object){
        for(let dep in deps){
            this[dep] = deps[dep];
        }
        return this;
    }
    updateName(name:string){
        this.projectName = name;
        //save the name to the db
    }
    updateSubject(subject:string){
        this.subject = subject.replace(" ", ".");
        //save the subject to the db
    }
    addAsset(assetType:string, values:Object = {}){
        if(!this.assets[assetType]){
            this.assets[assetType] = [];
        }
        this.assets[assetType].push(new Asset(assetType, values, this._id));
        //save the new asset to the db
    }
    updateAsset(assetType:string, index:number, values:Array<any>){
        // ? maby try this to instanciate the object from the string?? let asset = eval("new " + assetType + "()");
        this.assets[assetType][index].update(values);

        //save the updated assets to the db
    }
    addMilestone(name:string,date:Date){
        this.milestones.push({
            name,date
        })
    }
    save(){
        //use this to save the entire object in mongo
        let project = {
            proto: function(obj:Object){
                for(let k in obj){
                    if(k == 'db'){
                        continue;
                    }
                    this[k] = obj[k]
                }
            }
        };
        project.proto(this);
        console.log(project, this);
        delete project['db'];
        this['db'].putData("projects","1", project);
        //should i add and objserver to the project object and just call save automatically????

    }
}