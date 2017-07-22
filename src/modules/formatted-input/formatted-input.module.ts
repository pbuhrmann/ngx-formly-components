import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyFormattedInputComponent } from './formatted-input.component';
import { MdInputModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdInputModule
	],
	declarations: [FormlyFormattedInputComponent],
	exports: [FormlyFormattedInputComponent]
})
export class FormlyFormattedInputModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyFormattedInputModule, providers: []
		};
	}
}