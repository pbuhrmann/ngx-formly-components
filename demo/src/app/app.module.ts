import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormlyComponentsModule } from '../../../src/index';
//import { FormlyComponentsModule } from 'ngx-formly-components';
import { NgxMaterialSelectModule } from '../../../src/externals/ngx-material-select/ngx-material-select.module';
import { NgxMaterialDatetimeModule } from '../../../src/externals/ngx-material-datetime/ngx-material-datetime.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserAnimationsModule,
    FormlyComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

