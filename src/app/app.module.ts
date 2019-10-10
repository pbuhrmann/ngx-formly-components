import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyChipsComponent, FormlySelectComponent, FormlyDatetimeComponent, FormlyInputComponent, FormlyTextareaComponent, FormlyChecklistComponent, FormlyBlankComponent, FormlyRepeatedSectionComponent, FormlyAddressPickerComponent, FormlyAutocompleteComponent, FormlySelectAutocompleteComponent, FormlyRadioGroupComponent, FormlyChecklistGroupComponent, FormlySectionWrapperComponent, FormlySplitWrapperComponent, FormlyCardWrapperComponent, FormlyChipsModule, FormlySelectModule, FormlyDatetimeModule, FormlyInputModule, FormlyTextareaModule, FormlySectionWrapperModule, FormlySplitWrapperModule, FormlyChecklistModule, FormlyCardWrapperModule, FormlyBlankModule, FormlyRepeatedSectionModule, FormlyAddressPickerModule, FormlyAutocompleteModule, FormlySelectAutocompleteModule, FormlyRadioGroupModule, FormlyChecklistGroupModule } from 'projects/ngx-formly-components/src/lib/modules';
import { FormlySearchComponent } from 'projects/ngx-formly-components/src/lib/modules/search/search.component';
import { FormlySearchModule } from 'projects/ngx-formly-components/src/lib/modules/search';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
