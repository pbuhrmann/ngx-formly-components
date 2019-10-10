import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormlyCardWrapperComponent } from './card-wrapper.component';
import { MatCardModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatCardModule
	],
	declarations: [FormlyCardWrapperComponent],
	exports: [FormlyCardWrapperComponent]
})
export class FormlyCardWrapperModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyCardWrapperModule, providers: []
		};
	}
}