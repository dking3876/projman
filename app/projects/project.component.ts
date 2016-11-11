import { Component } from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'project',
    templateUrl: 'project.component.html',
    inputs: ['pData']

})
export class ProjectComponent{
    fakeData = {
        "fakeKey": "fakeData"
    }
}