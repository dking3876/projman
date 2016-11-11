import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import  { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './projectdetail/projectdetail.component';
import { ProjectTypesComponent } from './projecttypes/projecttypes.component';

export var Routes = RouterModule.forRoot([
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'mylogin',
        component: LoginComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'projects/:id',
        component: ProjectDetailComponent
    },{
        path: 'projecttypes', 
        component: ProjectTypesComponent
    }
])
