import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlySearchComponent } from './search.component';
import { MdInputModule, MdAutocompleteModule, MdTooltipModule, MdDialogModule, MdButtonModule } from '@angular/material';
import { Http, HttpModule } from '@angular/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MdInputModule,
		MdAutocompleteModule,
		MdTooltipModule,
	],
	declarations: [FormlySearchComponent],
	exports: [FormlySearchComponent],
	entryComponents: []
})
export class FormlySearchModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlySearchModule, providers: []
		};
	}
}