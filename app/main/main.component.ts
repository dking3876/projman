import { Component } from '@angular/core'

import { access } from '../defs/required';

@Component({
    moduleId: module.id,
    selector: 'main-view',
    providers: [access],
    templateUrl: './main.component.html'
})
export class MainComponent{
    public pageTitle:string = "Home";
    constructor(private _access:access){
    
    }
}