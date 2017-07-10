import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { FormlySelectComponent } from './select.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SelectModule
		],
	declarations: [FormlySelectComponent],
	exports: [FormlySelectComponent],
	entryComponents: [FormlySelectComponent]
})
export class FormlySelectModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlySelectModule, providers: []
		};
	}
}