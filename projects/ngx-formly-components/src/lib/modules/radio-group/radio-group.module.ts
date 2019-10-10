import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule, MatTooltipModule, MatRadioModule } from '@angular/material';
import { Http, HttpModule } from '@angular/http';
import { FormlyRadioGroupComponent } from './radio-group.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatRadioModule,
	],
	declarations: [FormlyRadioGroupComponent],
	exports: [FormlyRadioGroupComponent],
})
export class FormlyRadioGroupModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyRadioGroupModule, providers: []
		};
	}
}