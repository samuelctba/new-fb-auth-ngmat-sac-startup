import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

//Angular Material
import { MaterialModule } from '../core/ui/material.module';

import { AppRoutingModule } from "../core/app.routing.module";
import { FbAuthService } from '../core/auth/fb-auth.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireAuthModule  
  ],
  providers: [FbAuthService,AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
