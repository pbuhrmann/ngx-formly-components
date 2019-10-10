import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyTextareaComponent } from './textarea.component';
import { MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule
	],
	declarations: [FormlyTextareaComponent],
	exports: [FormlyTextareaComponent]
})
export class FormlyTextareaModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyTextareaModule, providers: []
		};
	}
}