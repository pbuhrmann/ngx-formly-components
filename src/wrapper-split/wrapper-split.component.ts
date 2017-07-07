import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from 'ng-formly';

@Component({
  selector: 'formly-split-wrapper',
  template: `
    <hr>
    <ng-container #fieldComponent></ng-container>
  `,
  styles: [`
    .section-wrapper-header {
        border-bottom: 5px solid rgba(0,0,0,0.1);
    }
  `]
})
export class FormlyWrapperSplitComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) public fieldComponent: ViewContainerRef;
}