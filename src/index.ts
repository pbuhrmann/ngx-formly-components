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
import { FormlyChecklistGroupComponent } from './modules/checklist-group/checklist-group.component';
import { FormlyChecklistGroupModule } from './modules/checklist-group/checklist-group.module';
import { FormlySearchComponent } from './modules/search/search.component';
import { FormlySearchModule } from './modules/search/search.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyBootstrapModule,
		FormlyModule.forRoot({
			types: [
				{ name: 'x-chips', component: FormlyChipsComponent },
				{ name: 'x-select', component: FormlySelectComponent },
				{ name: 'x-datetime', component: FormlyDatetimeComponent },
				{ name: 'x-input', component: FormlyInputComponent },
				{ name: 'x-textarea', component: FormlyTextareaComponent },
				{ name: 'x-checklist', component: FormlyChecklistComponent },
				{ name: 'x-blank', component: FormlyBlankComponent },
				{ name: 'x-repeated-section', component: FormlyRepeatedSectionComponent },
				{ name: 'x-address-picker', component: FormlyAddressPickerComponent },
				{ name: 'x-search', component: FormlySearchComponent },
				{ name: 'x-autocomplete', component: FormlyAutocompleteComponent },
				{ name: 'x-select-autocomplete', component: FormlySelectAutocompleteComponent },
				{ name: 'x-radio-group', component: FormlyRadioGroupComponent },
				{ name: 'x-checklist-group', component: FormlyChecklistGroupComponent }
			],
			wrappers: [
				{ name: 'x-section', component: FormlySectionWrapperComponent },
				{ name: 'x-split', component: FormlySplitWrapperComponent },
				{ name: 'x-card', component: FormlyCardWrapperComponent }
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
		FormlySearchModule.forRoot(),
		FormlyAutocompleteModule.forRoot(),
		FormlySelectAutocompleteModule.forRoot(),
		FormlyRadioGroupModule.forRoot(),
		FormlyChecklistGroupModule.forRoot()
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

export * from './modules';