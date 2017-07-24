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
import { FormlyTextareaModule } from './modules/textarea/textarea.module';
import { FormlyTextareaComponent } from './modules/textarea/textarea.component';

import { FormlySectionWrapperComponent } from './modules/section-wrapper/section-wrapper.component';
import { FormlySplitWrapperComponent } from './modules/split-wrapper/split-wrapper.component';
import { FormlySectionWrapperModule } from './modules/section-wrapper/section-wrapper.module';
import { FormlySplitWrapperModule } from './modules/split-wrapper/split-wrapper.module';

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
				{ name: 'textarea', component: FormlyTextareaComponent },
			],
			wrappers: [
			  { name: 'section', component: FormlySectionWrapperComponent },
			  { name: 'split', component: FormlySplitWrapperComponent }
			]
		}),
		FormlyChipsModule.forRoot(),
		FormlySelectModule.forRoot(),
		FormlyDatetimeModule.forRoot(),
		FormlyInputModule.forRoot(),
		FormlyTextareaModule.forRoot(),
		FormlySectionWrapperModule.forRoot(),
		FormlySplitWrapperModule.forRoot(),
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