import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule, MatTooltipModule, MatFormFieldModule } from '@angular/material';
import { Http, HttpModule } from '@angular/http';
import { FormlyAutocompleteComponent } from './autocomplete.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		MatTooltipModule
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