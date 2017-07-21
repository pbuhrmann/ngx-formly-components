import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSelectModule, MdButtonModule } from '@angular/material';
import { NgxMaterialSelectComponent } from './ngx-material-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdSelectModule,
    MdButtonModule
  ],
  declarations: [NgxMaterialSelectComponent],
  exports: [NgxMaterialSelectComponent]
})
export class NgxMaterialSelectModule { }