import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { CategorySelectorComponent } from './components';

import { ServicesModule } from './services/services.module';
import { ListComponent } from './components/list/list.component';
import { MemeComponent } from './components/meme/meme.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorySelectorComponent,
    ListComponent,
    MemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
