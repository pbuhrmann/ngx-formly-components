import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//import { FormlyComponentsModule } from '../../../src/index';
import { FormlyComponentsRootModule } from 'ngx-formly-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormlyComponentsRootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

