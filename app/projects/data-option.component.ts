import { Component, OnInit } from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'bf-data-option',
    templateUrl: './data-option.component.html',
    inputs: ['info']
})
export class dataOptionComponent implements OnInit{
    public info:Object;
    public keys:any;
    constructor(){ }
    ngOnInit(){
        this.keys = Object.keys(this.info);
    }
}