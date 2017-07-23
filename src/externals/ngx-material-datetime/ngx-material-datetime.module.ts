import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaterialDatetimeComponent } from './ngx-material-datetime.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MdInputModule, MdDatepickerModule, MdButtonModule, MdNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    TextMaskModule
  ],
  declarations: [NgxMaterialDatetimeComponent],
  exports: [NgxMaterialDatetimeComponent]
})
export class NgxMaterialDatetimeModule { }