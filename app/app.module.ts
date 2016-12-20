import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdButtonModule } from '@angular/material';
//import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


//Brafton libs
import { NectarModule } from '@brafton/nectar';
import { BfTextModule } from 'derykediter';

import { AppComponent }  from './app.component';
import { Routes } from './routes'
import { access } from './security/access.service';

import { MainComponent } from './main/main.component'
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectPreviewComponent } from './projects/projectPreview.component';
import { newProject } from './projects/newProject.component';
import { dataOptionComponent } from './projects/data-option.component';
import { ProjectDetailComponent } from './projectdetail/projectdetail.component';
import { ProjectTypesComponent  } from './projecttypes/projecttypes.component';
import { loader } from './loader/loader.component';
import { usersComponent,userResolver } from './user/users.component';
import { sec } from './security/security';

//utilities
import { subjectConvert } from './pipes/subject.pipe';


import { db } from './services/db.service';
import { DataWrapper } from './data/data.wrapper';


@NgModule({
  imports: [ 
    BrowserModule,
    Routes,
    HttpModule ,
    FormsModule,
    MaterialModule,
    MdButtonModule
    ,NectarModule
    //Ng2Bs3ModalModule
    ,BfTextModule
    ],
  declarations: [ 
    AppComponent, 
    MainComponent,
    LoginComponent,
    ProjectsComponent,
    ProjectPreviewComponent,
    ProjectDetailComponent,
    ProjectTypesComponent,
    newProject,
    dataOptionComponent,
    loader,
    subjectConvert,
    usersComponent
    ],
    providers: [ 
      db,
      access,
      sec,
      DataWrapper,
      userResolver,
      { //Needs to be replaced with the project resolve class that implements a resolve of type project
        provide: 'projectResolve',
        useValue: (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
          return '21';
        }
      }
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
