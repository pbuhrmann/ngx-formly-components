import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyWrapperSectionComponent } from './wrapper-section.component';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [FormlyWrapperSectionComponent],
	exports: [FormlyWrapperSectionComponent]
})
export class FormlyWrapperSectionModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyWrapperSectionModule, providers: []
		};
	}
}