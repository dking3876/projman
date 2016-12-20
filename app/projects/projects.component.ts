import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdButtonModule } from '@angular/material';

import { BfCardComponent } from '@brafton/nectar/bf-card';
import { BfArticleListComponent } from '@brafton/nectar/bf-article-list';

//import { DataWrapper } from '../data/data.wrapper';

import { ProjectPreviewComponent } from './projectPreview.component';
import { newProject } from './newProject.component';
import { Project } from '../classes/project';
import { loader } from '../loader/loader.component';

//import { access } from '../security/access.service';
//import { conditions } from '../data/dataRequest.interface';


import { DataWrapper, access, Globals, conditions  } from '../defs/required';

@Component({
    moduleId: module.id,
    selector: 'projects',
    "providers": [access, DataWrapper],
    templateUrl: './projects.component.html',
    styleUrls: ['../../assets/stylesheets/projects.css']
})
export class ProjectsComponent{
    public pData:any;
    public projects:Array<any>;
    public simpleProject:Array<any> = [];
    public _newProject:boolean = false;
    public _loadingProjects:boolean = false;
    public getProjects:Object = {
        resultsPerPage: 10,
        projectSubject: "0",
        accounts: "all",
        sortBy: "Projects", 
        sortByOrder: "ASC" 
    };
    private _listView:boolean = false;
    private _cardView:boolean = true;

    //consider putting the following into something else i can reuse later??? service? abstract class?
    public pageTitle:string;
    public errorMessages:Array<Object> = [];
    public pageMessages:Array<Object> = [];
    constructor(private _router:Router,private _access:access, private _request:DataWrapper){
        this.projects = [];
        this._loadingProjects = false;
        this.pageTitle = _access.get('name')+"\'s Projects";
    }
    loadProjects(){
        this._loadingProjects = true;
        this._newProject = false;
        let pass:conditions = {};

        let limit = Number.parseInt( this.getProjects['resultsPerPage'] ) ;
        let page = 1;
        pass.offsets = {
            limit,page
        }
        if(this.getProjects['projectSubject'] != "0"){
            if(!pass.projectTypes){
                pass['projectTypes'] = [];
            }
            pass.projectTypes.push(this.getProjects['projectSubject']);
        }
        this.projects = [];
        let tmp = this._request.getProjects(this._access, pass).then(res => {
            console.log("projects ", res);

           if(Object.keys(res).length !== 0){
                for(var r in res){
                    this.projects[r] = new Project(res[r]).dependancyInjection({
                        db: this._request
                    });
                }
                for(let p in this.projects){
                    this.simpleProject.push({
                        _id: this.projects[p]['_id'],
                        title: this.projects[p]['projectName'],
                        description: this.projects[p]['description'],
                        date: this.projects[p]['startDate']['$date'],
                        main_imageurl: ""
                    })
                }
            }else{
                this.pageMessages.push({
                    message: "You have no active projects.",
                    severity: "message",
                    read: false
                })
                console.log("You have no active projects");
            }
            this._loadingProjects = false;
            console.log(this.projects);
        });
    }
    navigateToProject(project:Object){
        console.log(project);
        this._router.navigate(['projects/'+project['_id']['$oid']])
        
    }
    goToProject($event:any){
        console.log($event);
    }
    previewProject(project:Object){
        this._newProject = false;
        this.pData = project;
        
    }
    newProject(){
        this._newProject = true;
    }
    showList(){
        this._listView = true;
        this._cardView = false;
    }
    setClasses(){
        let classes = {
            'col-md-12': this._cardView,
            'col-md-6': this._listView
        }
        return classes;
    }
    showCard(){
        this._cardView = true;
        this._listView = false;
    }
    saveProject(project:Object){
        if(this._access.get("permission") == 1){
            
        }else{
            alert("You do not have permission to save this project");
        }
    }
}