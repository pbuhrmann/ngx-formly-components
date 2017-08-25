import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdInputModule, MdAutocompleteModule, MdTooltipModule } from '@angular/material';
import { Http, HttpModule } from '@angular/http';
import { FormlySelectAutocompleteComponent } from './select-autocomplete.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdInputModule,
		MdAutocompleteModule,
		MdTooltipModule
	],
	declarations: [FormlySelectAutocompleteComponent],
	exports: [FormlySelectAutocompleteComponent],
})
export class FormlySelectAutocompleteModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlySelectAutocompleteModule, providers: []
		};
	}
}