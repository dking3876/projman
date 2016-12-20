import { Component, OnInit, Injectable } from '@angular/core';
import { Router,ActivatedRoute, Params, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';


import { DataWrapper, Globals, access, conditions } from '../defs/required';
import { Project } from '../classes/project';

@Component({
    moduleId: module.id,
    selector: 'projectdetails',
    providers: [DataWrapper, access],
    templateUrl: './projectdetail.component.html'
})
export class ProjectDetailComponent implements OnInit{
    id: number;
    project:Project;
    constructor(private _router: Router, private _route: ActivatedRoute, private _location: Location, private _dataRequest:DataWrapper, private _access:access){

    }
    ngOnInit(){
        console.log(this._route.snapshot.data['project']);
        this._route.params.forEach(params => {
            this.id = params['id'];
        });

        this._dataRequest.getProjects(this._access,{
              projectIds: [this.id]
        }).then(res => {
            console.log(res);
            this.project = res;
        })
        var variables:any = [];

    }
}
@Injectable()
export class projectResolver implements Resolve<Project>{

    constructor(private _dataRequest:DataWrapper){

    }
    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        
    }
}