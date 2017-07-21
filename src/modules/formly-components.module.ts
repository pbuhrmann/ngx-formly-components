import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormlySelectAsyncModule } from './select-async/select-async.module';
import { FormlyDatetimeMaskModule } from './datetime-mask/datetime-mask.module';
import { FormlyChipsModule } from './chips/chips.module';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { FormlyDateTimeMaskComponent } from './datetime-mask/datetime-mask.component';
import { FormlySelectAsyncComponent } from './select-async/select-async.component';
import { FormlyChipsComponent } from './chips/chips.component';
import { FormlySelectModule } from './select/select.module';
import { FormlySelectComponent } from './select/select.component';
import { FormlyDatetimeModule } from './datetime/datetime.module';
import { FormlyDatetimeComponent } from './datetime/datetime.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyBootstrapModule,
		FormlyModule.forRoot({
			types: [
				{ name: 'datetime-mask', component: FormlyDateTimeMaskComponent },
				{ name: 'select-async', component: FormlySelectAsyncComponent },
				{ name: 'chips', component: FormlyChipsComponent },
				{ name: 'select', component: FormlySelectComponent },
				{ name: 'datetime', component: FormlyDatetimeComponent },
			],
			/*wrappers: [
			  { name: 'section', component: FormlySectionWrapper },
			  { name: 'split', component: FormlySplitWrapper }
			]*/
		}),
		FormlySelectAsyncModule.forRoot(),
		FormlyDatetimeMaskModule.forRoot(),
		FormlyChipsModule.forRoot(),
		FormlySelectModule.forRoot(),
		FormlyDatetimeModule.forRoot()
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