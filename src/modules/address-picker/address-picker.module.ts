import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyAddressPickerComponent } from './address-picker.component';
import { MdInputModule, MdAutocompleteModule, MdTooltipModule, MdDialogModule, MdButtonModule } from '@angular/material';
import { Http, HttpModule } from '@angular/http';
import { FormlyAddressPickerMapComponent } from './map/map.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MdInputModule,
		MdAutocompleteModule,
		MdTooltipModule,
		MdDialogModule,
		MdButtonModule
	],
	declarations: [FormlyAddressPickerComponent, FormlyAddressPickerMapComponent],
	exports: [FormlyAddressPickerComponent],
	entryComponents: [FormlyAddressPickerMapComponent]
})
export class FormlyAddressPickerModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlyAddressPickerModule, providers: []
		};
	}
}