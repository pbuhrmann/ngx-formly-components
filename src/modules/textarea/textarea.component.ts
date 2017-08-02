import { Component, OnInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { Field } from 'ng-formly';

@Component({
    selector: 'formly-ngx-material-textarea',
    styles: [`
    textarea {
        resize: vertical;
    }
  `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container style="width: 100%">
            <textarea mdInput mdTextareaAutosize placeholder="{{to.placeholder}}" [(ngModel)]="value" (ngModelChange)="onChange($event)"></textarea>
        </md-input-container>
    </div>
  `,
})
export class FormlyTextareaComponent extends Field implements OnInit {

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

    onChange(e: string) {
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
        this.formControl.setValue(result);
    }

}
