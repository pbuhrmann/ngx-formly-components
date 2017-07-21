import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FormlyChipsComponent } from './chips.component';
import { NgxMaterialChipsModule } from '../../externals/ngx-material-chips/ngx-material-chips.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMaterialChipsModule
	],
	declarations: [FormlyChipsComponent],
	exports: [FormlyChipsComponent]
})
export class FormlyChipsModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyChipsModule, providers: []
		};
	}
}