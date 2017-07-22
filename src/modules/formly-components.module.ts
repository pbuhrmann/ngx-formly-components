import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormlyDatetimeMaskModule } from './datetime-mask/datetime-mask.module';
import { FormlyChipsModule } from './chips/chips.module';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { FormlyDateTimeMaskComponent } from './datetime-mask/datetime-mask.component';
import { FormlyChipsComponent } from './chips/chips.component';
import { FormlySelectModule } from './select/select.module';
import { FormlySelectComponent } from './select/select.component';
import { FormlyDatetimeModule } from './datetime/datetime.module';
import { FormlyDatetimeComponent } from './datetime/datetime.component';
import { FormlyFormattedInputModule } from './formatted-input/formatted-input.module';
import { FormlyFormattedInputComponent } from './formatted-input/formatted-input.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyBootstrapModule,
		FormlyModule.forRoot({
			types: [
				{ name: 'chips', component: FormlyChipsComponent },
				{ name: 'select', component: FormlySelectComponent },
				{ name: 'datetime', component: FormlyDatetimeComponent },
				{ name: 'formatted-input', component: FormlyFormattedInputComponent },
			],
			/*wrappers: [
			  { name: 'section', component: FormlySectionWrapper },
			  { name: 'split', component: FormlySplitWrapper }
			]*/
		}),
		FormlyChipsModule.forRoot(),
		FormlySelectModule.forRoot(),
		FormlyDatetimeModule.forRoot(),
		FormlyFormattedInputModule.forRoot()
	],
	declarations: [
	],
	exports: [
		ReactiveFormsModule,
		FormlyBootstrapModule,
		FormlyModule
	]
})
export class FormlyComponentsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyComponentsModule,
			providers: []
		}
	}
}