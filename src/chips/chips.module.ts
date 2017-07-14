import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { TagInputModule } from 'ngx-chips';
import { FormlyChipsComponent } from './chips.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		//chips
	],
	declarations: [FormlyChipsComponent],
	exports: [FormlyChipsComponent]
})
export class FormlyChipsModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyChipsModule,
			providers: []
		};
	}
}