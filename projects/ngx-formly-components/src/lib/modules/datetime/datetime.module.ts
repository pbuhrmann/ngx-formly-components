import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule, MatTooltipModule, MatFormFieldModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { FormlyDatetimeComponent } from './datetime.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		TextMaskModule,
		MatTooltipModule
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