import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { FormlyDateTimeMaskComponent } from './datetime-mask.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TextMaskModule],
	declarations: [FormlyDateTimeMaskComponent],
	exports: [FormlyDateTimeMaskComponent]
})
export class FormlyDatetimeMaskModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyDatetimeMaskModule, providers: []
		};
	}
}