import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { FormlyDateTimeMaskComponent } from './datetime-mask.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [FormlyDateTimeMaskComponent],
	exports: [FormlyDateTimeMaskComponent]
})
export class DatetimeMaskModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: DatetimeMaskModule, providers: []
		};
	}
}