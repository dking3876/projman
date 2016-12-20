import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { access } from '../defs/required';

@Component({
    "moduleId": module.id,
    "selector": "projecttypes",
    "providers": [access],
    "templateUrl": './projecttypes.component.html'
})
export class ProjectTypesComponent{
    constructor(_router:Router, private _access:access){

    }
}