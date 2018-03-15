import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { ServicesModule } from './services/services.module';

import { ListComponent } from './components/list/list.component';
import { MemeComponent } from './components/meme/meme.component';
import { NewComponent } from './components/new/new.component';
import { SelectorComponent } from './components/selector/selector.component';

const materialModules = [
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    ListComponent,
    MemeComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
