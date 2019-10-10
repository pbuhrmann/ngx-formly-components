import { NgModule } from '@angular/core';
import {
  FormlyAddressPickerModule, FormlyAutocompleteModule, FormlyBlankModule,
  FormlyCardWrapperModule, FormlyChecklistModule, FormlyChecklistGroupModule,
  FormlyChipsModule, FormlyDatetimeModule, FormlyInputModule, FormlyRadioGroupModule,
  FormlyRepeatedSectionModule, FormlySectionWrapperModule, FormlySelectModule,
  FormlySelectAutocompleteModule, FormlySplitWrapperModule, FormlyTextareaModule
} from './modules';

@NgModule({
  declarations: [],
  imports: [
    FormlyAddressPickerModule,
    FormlyAutocompleteModule,
    FormlyBlankModule,
    FormlyCardWrapperModule,
    FormlyChecklistModule,
    FormlyChecklistGroupModule,
    FormlyChipsModule,
    FormlyDatetimeModule,
    FormlyInputModule,
    FormlyRadioGroupModule,
    FormlyRepeatedSectionModule,
    FormlySectionWrapperModule,
    FormlySelectModule,
    FormlySelectAutocompleteModule,
    FormlySplitWrapperModule,
    FormlyTextareaModule
  ],
  exports: []
})
export class NgxFormlyComponentsModule { }
