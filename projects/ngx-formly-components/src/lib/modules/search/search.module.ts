import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlySearchComponent } from './search.component';
import { MatInputModule, MatAutocompleteModule, MatTooltipModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { Http, HttpModule } from '@angular/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MatInputModule,
		MatAutocompleteModule,
		MatTooltipModule,
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