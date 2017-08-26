import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from 'ng-formly';

@Component({
  selector: 'formly-section-wrapper',
  styles: [`
    :host {
      width: 100%;
    }
    .section-header {
        font-size: 16px;
        padding: 5px;
        border-radius: 2px 2px 0px 0px;
      }
      .section-content {
        display: inline-block;
        padding-top: 5px;
        padding-bottom: 5px;
        width: 100%;
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        border-radius: 0px 0px 2px 2px;
      }
  `],
  template: `
    <div class="section-header" [style.background]="to.background || 'transparent'" [style.color]="to.color || 'rgba(0,0,0,.87)'">{{to.title}}</div>
    <div class="section-content" [style.border]="'1px solid '+to.background">
      <ng-container #fieldComponent></ng-container>
    </div>
  `,  
})
export class FormlySectionWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) public fieldComponent: ViewContainerRef;
}