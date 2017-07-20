import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaterialChipsComponent } from './ngx-material-chips.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdAutocompleteModule, MdInputModule, MdChipsModule, MdButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdAutocompleteModule,
    MdChipsModule,
    MdButtonModule
  ],
  declarations: [NgxMaterialChipsComponent],
  exports: [
    NgxMaterialChipsComponent
  ]
})
export class NgxMaterialChipsModule { }