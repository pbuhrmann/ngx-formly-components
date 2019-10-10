import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-split-wrapper',
  template: `
    <hr>
    <ng-container #fieldComponent></ng-container>
  `,
  styles: [`
    :host {
      width: 100%;
    }
    .section-wrapper-header {
        border-bottom: 5px solid rgba(0,0,0,0.1);
    }
  `]
})
export class FormlySplitWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { static: false, read: ViewContainerRef}) public fieldComponent: ViewContainerRef;
}