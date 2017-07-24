import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormlyChipsModule } from './modules/chips/chips.module';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { FormlyChipsComponent } from './modules/chips/chips.component';
import { FormlySelectModule } from './modules/select/select.module';
import { FormlySelectComponent } from './modules/select/select.component';
import { FormlyDatetimeModule } from './modules/datetime/datetime.module';
import { FormlyDatetimeComponent } from './modules/datetime/datetime.component';
import { FormlyInputModule } from './modules/input/input.module';
import { FormlyInputComponent } from './modules/input/input.component';

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
				{ name: 'input', component: FormlyInputComponent },
			],
			/*wrappers: [
			  { name: 'section', component: FormlySectionWrapper },
			  { name: 'split', component: FormlySplitWrapper }
			]*/
		}),
		FormlyChipsModule.forRoot(),
		FormlySelectModule.forRoot(),
		FormlyDatetimeModule.forRoot(),
		FormlyInputModule.forRoot()
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