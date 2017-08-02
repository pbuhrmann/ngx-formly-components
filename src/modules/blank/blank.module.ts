import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyBlankComponent } from './blank.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [FormlyBlankComponent],
	exports: [FormlyBlankComponent]
})
export class FormlyBlankModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyBlankModule, providers: []
		};
	}
}