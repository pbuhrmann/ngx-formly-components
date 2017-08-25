import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'ngx-formly-component-checklist',
    styles: [`
    :host /deep/ .mat-checkbox-label {
        font-weight: normal !important;
    }
    `],
    template: `
    <md-checkbox [disabled]="formControl.disabled" [formControl]="formControl">{{to.text || ''}}</md-checkbox>
    `
})
export class FormlyChecklistComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        if (!this.formControl.value) {
            this.formControl.setValue(false);
        }
        if (this.to.defaultValue) {
            this.formControl.setValue(this.to.defaultValue);
        }
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.to.changed && this.to.changed(x);
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
