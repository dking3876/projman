import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './projectdetail/projectdetail.component';
import { ProjectTypesComponent } from './projecttypes/projecttypes.component';
import { usersComponent, userResolver } from './user/users.component';

import { sec } from './security/security';
import { access, Globals } from './defs/required';

export var Routes = RouterModule.forRoot([
    {
        path: '',
        component: MainComponent,
        canActivate: [sec]
    },
    {
        path: 'main',
        component: MainComponent,
        canActivate: [sec]
    },
    {
        path: 'mylogin',
        component: LoginComponent,
    },
    {
        path: 'projects',
        children: [
            {
                path: '',
                component: ProjectsComponent,
                canActivate: [sec]
            },
            {
                path: ':id',
                component: ProjectDetailComponent,
                canActivate: [sec]  ,
                resolve: {
                    project: 'projectResolve'
                }
            },
            {
                path: 'types',
                component: ProjectTypesComponent,
                canActivate: [sec]
            }
        ]
    },
    /*{
        path: 'projects/:id',
        component: ProjectDetailComponent,
        canActivate: [sec]
    },*/{
        path: 'projecttypes', 
        component: ProjectTypesComponent,
        canActivate: [sec]
    },
    {
        path: 'users/:id',
        component: usersComponent,
        canActivate: [sec],
        resolve: {
            userInfo: userResolver
        }
    }
])
