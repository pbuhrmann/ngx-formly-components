import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormlySelectAsyncModule } from './select-async/select-async.module';
import { FormlyDatetimeMaskModule } from './datetime-mask/datetime-mask.module';
//import { FormlyChipsModule } from './chips/chips.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FormlySelectAsyncModule.forRoot(),
		FormlyDatetimeMaskModule.forRoot(),
		//FormlyChipsModule.forRoot(),
	],
	declarations: [
	],
	exports: [
		FormlySelectAsyncModule,
		FormlyDatetimeMaskModule,
		//FormlyChipsModule
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