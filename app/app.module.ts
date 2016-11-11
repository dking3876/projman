import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'

import { AppComponent }  from './app.component';


import { Routes } from './routes'
import { MainComponent } from './main/main.component'
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project.component';
import { ProjectDetailComponent } from './projectdetail/projectdetail.component';
import { ProjectTypesComponent  } from './projecttypes/projecttypes.component';

import { db } from './services/db.service';


@NgModule({
  imports: [ 
    BrowserModule,
    Routes,
    HttpModule 
    ],
  declarations: [ 
    AppComponent, 
    MainComponent,
    LoginComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ProjectTypesComponent
    ],
    providers: [ db ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
