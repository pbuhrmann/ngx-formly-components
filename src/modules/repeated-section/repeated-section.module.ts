import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormlyRepeatedSectionComponent } from './repeated-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule, FormlyModule } from 'ng-formly';
import { MdButtonModule, MdTooltipModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyBootstrapModule,
		FormlyModule,
		MdButtonModule,
		MdTooltipModule
	],
	declarations: [FormlyRepeatedSectionComponent],
	exports: [
		FormlyRepeatedSectionComponent
	]
})
export class FormlyRepeatedSectionModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyRepeatedSectionModule, providers: []
		};
	}
}