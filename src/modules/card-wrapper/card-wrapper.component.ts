import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from 'ng-formly';

@Component({
  selector: 'formly-card-wrapper',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title *ngIf="to.title">{{to.title}}</md-card-title>
        <md-card-subtitle *ngIf="to.subtitle">{{to.subtitle}}</md-card-subtitle>
      </md-card-header>
      <md-card-content class="row">
        <ng-container #fieldComponent></ng-container>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    :host {
      width: 100%;
    }
    :host /deep/ .mat-card-header-text {
      margin: 0px;
    }
    :host /deep/ .mat-card-title {
      font-size: 16px;
    }
  `]
})
export class FormlyCardWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) public fieldComponent: ViewContainerRef;
}