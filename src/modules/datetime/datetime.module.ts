import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdInputModule, MdDatepickerModule, MdButtonModule, MdNativeDateModule, MdTooltipModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { FormlyDatetimeComponent } from './datetime.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdInputModule,
		MdDatepickerModule,
		MdNativeDateModule,
		TextMaskModule,
		MdTooltipModule
	],
	declarations: [FormlyDatetimeComponent],
	exports: [FormlyDatetimeComponent]
})
export class FormlyDatetimeModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyDatetimeModule, providers: []
		};
	}
}