import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';

import { FormlyComponentsModule } from '../../../src/index';
//import { FormlyComponentsModule } from 'ngx-formly-components';
import { GeoCodRefModule } from 'geo-cod-ref';
import { ConfigService } from '../../../src/services/config.service';
import { Http } from '@angular/http';
import { configFactory } from './shared/config-factory';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormlyComponentsModule.forRoot(),
    GeoCodRefModule.forRoot(ConfigService, 'GEO_SERVER'),
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: configFactory, deps: [ConfigService, Http], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

