import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from 'ng-formly';

@Component({
  selector: 'formly-section-wrapper',
  template: `
    <h3 class="section-wrapper-header text-muted">{{to.title}}</h3>
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
export class FormlySectionWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) public fieldComponent: ViewContainerRef;
}