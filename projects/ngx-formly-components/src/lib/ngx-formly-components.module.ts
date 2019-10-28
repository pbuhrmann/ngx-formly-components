import { NgModule } from '@angular/core';
import {
  FormlyAddressPickerModule, FormlyAutocompleteModule, FormlyBlankModule,
  FormlyCardWrapperModule, FormlyChecklistModule, FormlyChecklistGroupModule,
  FormlyChipsModule, FormlyDatetimeModule, FormlyInputModule, FormlyRadioGroupModule,
  FormlyRepeatedSectionModule, FormlySectionWrapperModule, FormlySelectModule,
  FormlySelectAutocompleteModule, FormlySplitWrapperModule, FormlyTextareaModule, FormlyChipsComponent, FormlySelectComponent, FormlyDatetimeComponent, FormlyInputComponent, FormlyTextareaComponent, FormlyChecklistComponent, FormlyBlankComponent, FormlyRepeatedSectionComponent, FormlyAddressPickerComponent, FormlyAutocompleteComponent, FormlySelectAutocompleteComponent, FormlyRadioGroupComponent, FormlyChecklistGroupComponent, FormlySectionWrapperComponent, FormlySplitWrapperComponent, FormlyCardWrapperComponent, FormlySearchModule
} from './modules';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySearchComponent } from './modules/search/search.component';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
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
		FormlyChecklistGroupModule.forRoot(),
		FormlyMaterialModule
	],
	declarations: [
	],
	exports: [
		FormlyModule,
	]
})
export class NgxFormlyComponentsModule { }

// export * from './modules';