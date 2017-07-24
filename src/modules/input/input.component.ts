import { Component, OnInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { Field } from 'ng-formly';

@Component({
    selector: 'formly-formatted-input',
    styles: [`
    :host /deep/ .ui-inputtext {
        width: 100%;
        border: none !important;
    }
  `],
    template: `
    <div class="form-group">
        <label for="key" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">{{ to.label }}</label>
        <div>
            <md-input-container style="width: 100%">
            <input mdInput placeholder="{{to.placeholder}}" type="text" [(ngModel)]="value" (ngModelChange)="onChange($event)"/>
            </md-input-container>
        </div>
  </div>
  `,
})
export class FormlyInputComponent extends Field implements OnInit {

    public value: string;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    public ngOnInit() {
        if (this.to.defaultValue && !this.formControl.value) {
            this.formControl.setValue(this.to.defaultValue);
        }
        this.value = this.formControl.value;
    }

    onChange(e) {
        this.value = e;
        let result = e;
        if (this.to.maxLength && e.length > this.to.maxLength) {
            result = result.substr(0, this.to.maxLength);
        }
        if (this.to.format) {
            result = this.to.format(e);
        }
        this.value = null;
        this.changeDetectorRef.detectChanges();
        this.value = result;
        this.changeDetectorRef.detectChanges();
        this.formControl.setValue(e);
    }
}