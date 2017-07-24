import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyInputComponent } from './input.component';
import { MdInputModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdInputModule
	],
	declarations: [FormlyInputComponent],
	exports: [FormlyInputComponent]
})
export class FormlyInputModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyInputModule, providers: []
		};
	}
}