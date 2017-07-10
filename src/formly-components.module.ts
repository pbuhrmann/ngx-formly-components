import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';

import { FormlyDatetimeMaskModule } from './datetime-mask/datetime-mask.module';
import { FormlyDateTimeMaskComponent } from './datetime-mask/datetime-mask.component';
import { FormlySelectModule } from './select/select.module';
import { FormlySelectComponent } from './select/select.component';


/* EXPORTS */
const MODULES = [
	FormlyBootstrapModule,
	FormlyModule,
	FormlyDatetimeMaskModule,
	FormlySelectModule
];
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyBootstrapModule,
		FormlyDatetimeMaskModule.forRoot(),
		FormlySelectModule.forRoot(),
		FormlyModule.forRoot({
			types: [
				{ name: 'datetime-mask', component: FormlyDateTimeMaskComponent },
				{ name: 'select', component: FormlySelectComponent },
			],
			/*wrappers: [
			  { name: 'section', component: FormlySectionWrapper },
			  { name: 'split', component: FormlySplitWrapper }
			]*/
		}),
	],
	declarations: [
		//FormlyDateTimeMaskComponent
	],
	exports: MODULES
})
export class FormlyComponentsRootModule {

}

@NgModule({ exports: MODULES })
export class FormlyComponentsModule {
	public static forRoot(): ModuleWithProviders {
		return { ngModule: FormlyComponentsRootModule };
	}
}