import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormlyRepeatedSectionComponent } from './repeated-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material'; 
import { MatButtonModule, MatTooltipModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyMaterialModule,
		FormlyModule,
		MatButtonModule,
		MatTooltipModule
	],
	declarations: [FormlyRepeatedSectionComponent],
	exports: [
		FormlyRepeatedSectionComponent
	]
})
export class FormlyRepeatedSectionModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyRepeatedSectionModule, providers: []
		};
	}
}