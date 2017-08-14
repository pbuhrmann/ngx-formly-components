import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdInputModule, MdChipsModule, MdButtonModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { FormlyChipsComponent } from './chips.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdInputModule,
    MdAutocompleteModule,
    MdChipsModule,
    MdButtonModule
	],
	declarations: [FormlyChipsComponent],
	exports: [FormlyChipsComponent]
})
export class FormlyChipsModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyChipsModule, providers: []
		};
	}
}