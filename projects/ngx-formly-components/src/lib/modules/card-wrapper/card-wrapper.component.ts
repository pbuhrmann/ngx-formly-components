import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-card-wrapper',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title *ngIf="to.title">{{to.title}}</mat-card-title>
        <mat-card-subtitle *ngIf="to.subtitle">{{to.subtitle}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="row">
        <ng-container #fieldComponent></ng-container>
      </mat-card-content>
    </mat-card>
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
  @ViewChild('fieldComponent', { static: false, read: ViewContainerRef }) public fieldComponent: ViewContainerRef;
}