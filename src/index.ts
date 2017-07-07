import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';

import { FormlyDateTimeMaskComponent } from './datetime-mask/datetime-mask.component';

export { FormlyDateTimeMaskComponent } from './datetime-mask/datetime-mask.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [
        { name: 'datetime-mask', component: FormlyDateTimeMaskComponent }
      ],
      /*wrappers: [
        { name: 'section', component: FormlySectionWrapper },
        { name: 'split', component: FormlySplitWrapper }
      ]*/
    }),
  ],
  declarations: [
    FormlyDateTimeMaskComponent
  ],
  exports: [
    FormlyDateTimeMaskComponent
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
