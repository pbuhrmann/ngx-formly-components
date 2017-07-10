import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';
import { FormlySelectAsyncComponent } from './select-async.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SelectModule
		],
	declarations: [FormlySelectAsyncComponent],
	exports: [FormlySelectAsyncComponent],
	entryComponents: [FormlySelectAsyncComponent]
})
export class FormlySelectAsyncModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlySelectAsyncModule, providers: []
		};
	}
}