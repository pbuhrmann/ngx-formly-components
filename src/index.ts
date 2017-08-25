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
import { FormlyChecklistModule } from './modules/checklist/checklist.module';
import { FormlyChecklistComponent } from './modules/checklist/checklist.component';
import { FormlyCardWrapperComponent } from './modules/card-wrapper/card-wrapper.component';
import { FormlyCardWrapperModule } from './modules/card-wrapper/card-wrapper.module';
import { FormlyBlankModule } from './modules/blank/blank.module';
import { FormlyBlankComponent } from './modules/blank/blank.component';
import { FormlyRepeatedSectionComponent } from './modules/repeated-section/repeated-section.component';
import { FormlyRepeatedSectionModule } from './modules/repeated-section/repeated-section.module';
import { FormlyAddressPickerModule } from './modules/address-picker/address-picker.module';
import { FormlyAddressPickerComponent } from './modules/address-picker/address-picker.component';
import { FormlyAutocompleteModule } from './modules/autocomplete/autocomplete.module';
import { FormlyAutocompleteComponent } from './modules/autocomplete/autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyRadioGroupComponent } from './modules/radio-group/radio-group.component';
import { FormlyRadioGroupModule } from './modules/radio-group/radio-group.module';
import { FormlySelectAutocompleteComponent } from './modules/select-autocomplete/select-autocomplete.component';
import { FormlySelectAutocompleteModule } from './modules/select-autocomplete/select-autocomplete.module';

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
				{ name: 'checklist', component: FormlyChecklistComponent },
				{ name: 'blank', component: FormlyBlankComponent },
				{ name: 'repeated-section', component: FormlyRepeatedSectionComponent },
				{ name: 'address-picker', component: FormlyAddressPickerComponent },
				{ name: 'autocomplete', component: FormlyAutocompleteComponent },
				{ name: 'select-autocomplete', component: FormlySelectAutocompleteComponent },
				{ name: 'radio-group', component: FormlyRadioGroupComponent }
			],
			wrappers: [
				{ name: 'section', component: FormlySectionWrapperComponent },
				{ name: 'split', component: FormlySplitWrapperComponent },
				{ name: 'card', component: FormlyCardWrapperComponent }
			]
		}),
		FormlyChipsModule.forRoot(),
		FormlySelectModule.forRoot(),
		FormlyDatetimeModule.forRoot(),
		FormlyInputModule.forRoot(),
		FormlyTextareaModule.forRoot(),
		FormlySectionWrapperModule.forRoot(),
		FormlySplitWrapperModule.forRoot(),
		FormlyChecklistModule.forRoot(),
		FormlyCardWrapperModule.forRoot(),
		FormlyBlankModule.forRoot(),
		FormlyRepeatedSectionModule.forRoot(),
		FormlyAddressPickerModule.forRoot(),
		FormlyAutocompleteModule.forRoot(),
		FormlySelectAutocompleteModule.forRoot(),
		FormlyRadioGroupModule.forRoot()
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