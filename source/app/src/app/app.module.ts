import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { CategorySelectorComponent } from './components';

import { ServicesModule } from './services/services.module';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorySelectorComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
