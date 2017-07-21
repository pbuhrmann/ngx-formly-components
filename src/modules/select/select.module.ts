import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FormlySelectComponent } from './select.component';
import { NgxMaterialSelectModule } from '../../externals/ngx-material-select/ngx-material-select.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMaterialSelectModule
	],
	declarations: [FormlySelectComponent],
	exports: [FormlySelectComponent]
})
export class FormlySelectModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlySelectModule, providers: []
		};
	}
}