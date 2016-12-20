import { Component } from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'project-preview',
    templateUrl: 'projectPreview.component.html',
    inputs: ['pData']

})
export class ProjectPreviewComponent{
    public pData:Object;
    public isLoaded:boolean = false;
    constructor(){
    }
    projectLoaded(){
        console.log(this.pData);
        if(Object.keys(this.pData).length == 0){
            return false;
        }
        return true;
    }
    saveProject(){
    }
}