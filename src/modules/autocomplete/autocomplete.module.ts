import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdInputModule, MdAutocompleteModule, MdTooltipModule, MdDialogModule, MdButtonModule } from '@angular/material';
import { Http, HttpModule } from '@angular/http';
import { FormlyAutocompleteComponent } from './autocomplete.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdInputModule,
		MdAutocompleteModule
	],
	declarations: [FormlyAutocompleteComponent],
	exports: [FormlyAutocompleteComponent],
})
export class FormlyAutocompleteModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyAutocompleteModule, providers: []
		};
	}
}