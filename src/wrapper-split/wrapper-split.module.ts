import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyWrapperSplitComponent } from './wrapper-split.component';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [FormlyWrapperSplitComponent],
	exports: [FormlyWrapperSplitComponent]
})
export class FormlyWrapperSplitModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyWrapperSplitModule, providers: []
		};
	}
}