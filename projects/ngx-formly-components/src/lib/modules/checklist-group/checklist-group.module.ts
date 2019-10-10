import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FormlyChecklistGroupComponent } from './checklist-group.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatCheckboxModule
	],
	declarations: [FormlyChecklistGroupComponent],
	exports: [FormlyChecklistGroupComponent]
})
export class FormlyChecklistGroupModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyChecklistGroupModule, providers: []
		};
	}
}