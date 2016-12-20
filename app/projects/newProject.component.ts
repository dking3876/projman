import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { dataOptionComponent } from './data-option.component';

import { Project } from '../classes/project';
import { userData } from '../user/userData';

import { DataWrapper } from '../defs/required';


//@Todo: set this up with an output event when startProject is clicked so that the parent component knows to reload the projects
@Component({
    moduleId: module.id,
    selector: 'new-project',
    providers: [DataWrapper],
    templateUrl: './newProject.component.html',
    styleUrls: ['../../assets/stylesheets/newproject.css'],
    outputs: ['projectStarted']
})
export class newProject implements OnInit {
    public model = {
        assets: {},
        
    };
    public activeUsers:Array<Object>;
    public userList:Array<Object>;
    public userValues:Array<Object>;
    public assetTypes:Array<string>;
    public projectTypes:Array<Object>;
    public userTypes:Array<string>;
    public singleActiveuser:string;
    public userToAdd:Object;
    public projectStarted = new EventEmitter();

    constructor(private _dataRequest:DataWrapper){

    }
    ngOnInit(){
        this.activeUsers = [];
        this.userList = [];
        //go get Project settings

        //go get list of users with name and email
        this._dataRequest.getUsers({},{
            'projection': {
                "_id": 1,
                "name": 1,
                "email": 1,
                "userIcon": 1
                }
        }).then( res => {

            for(let i in res){

                this.userList.push(new userData().loadData(res[i]));
            }
            this.userValues = this.userList.map((obj,ind) => {
                return {
                    name: obj['name'],
                    email: obj['email']
                }
            })
        })
    }
    populateUserHints(){
        //Get a complete list of all users names and email addresses


    }
    addUserToProject(event:any){
        this.activeUsers.push(this.userToAdd);
        this.userToAdd = {};
    }
    findUsers(event:any){
    
        let item = this.userList.find(obj => {
            
            return obj['name'].toLowerCase() === event.target.value.toLowerCase() || obj['email'] === event.target.value
        })
        if(item !== undefined){
            //display user data and allow for selection
            console.log(item);
            this.userToAdd = item;
        }
    }
    startProject(){
        let project:any = this.model;
        //add users by id to the project

        //invite users by email to notify they have been added to the project
        project = new Project(project);
        let proj = new Project(project).dependancyInjection({
            db: this._dataRequest
        }).save()
    }
}