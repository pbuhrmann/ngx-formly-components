import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FormlyChecklistComponent } from './checklist.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatCheckboxModule
	],
	declarations: [FormlyChecklistComponent],
	exports: [FormlyChecklistComponent]
})
export class FormlyChecklistModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyChecklistModule, providers: []
		};
	}
}