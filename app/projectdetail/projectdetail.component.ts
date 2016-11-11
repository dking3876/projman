import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'projectdetails',
    templateUrl: './projectdetail.component.html'
})
export class ProjectDetailComponent implements OnInit{
    id: number;
    constructor(private _router: Router, private _route: ActivatedRoute, private _location: Location){

    }
    ngOnInit(){
        console.log(this._router);
        console.log(this._route);
        this.id = this._route.params['id'];
        console.log(this.id);
        var variables:any = [];
        
        this._route.params.forEach(params => {
            this.id = params['id'];
        });
        console.log(this.id);
        console.log(variables);
    }
}