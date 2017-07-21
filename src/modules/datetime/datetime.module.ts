import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaterialDatetimeModule } from '../../externals/ngx-material-datetime/ngx-material-datetime.module';
import { FormlyDatetimeComponent } from './datetime.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMaterialDatetimeModule
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