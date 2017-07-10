import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { FormlyComponentsModule } from '../../../src/index';
//import { FormlyBootstrapModule, FormlyModule } from 'ng-formly';
//import { FormlyDateTimeMaskComponent } from '../../../src/datetime-mask/datetime-mask.component';
import { FormlyComponentsModule } from 'ngx-formly-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyComponentsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
