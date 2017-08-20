import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'formly-ngx-material-checklist',
    styles: [`
    :host /deep/ .mat-checkbox-label {
        font-weight: normal !important;
    }
    `],
    template: `
    <md-checkbox [disabled]="to.disabled" class="example-margin" [formControl]="formControl">{{to.text || ''}}</md-checkbox>
    `
})
export class FormlyChecklistComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor() {
        super();
    }

    ngOnInit() {
        if (!this.formControl.value) {
            this.formControl.setValue(false);
        }
        if (this.to.defaultValue) {
            this.formControl.setValue(this.to.defaultValue);
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
