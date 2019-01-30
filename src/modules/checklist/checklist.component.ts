import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'ngx-formly-component-checklist',
    styles: [`
    :host /deep/ .mat-checkbox-label {
        font-weight: normal !important;
        word-break: break-word;
        white-space: normal;
    },
    `],
    template: `
    <md-checkbox [disabled]="formControl.disabled" [(ngModel)]="value" (ngModelChange)="changed($event)">{{to.text || ''}}</md-checkbox>
    `
})
export class FormlyChecklistComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public value: boolean;

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        this.value = this.formControl.value;
        if ((this.to.defaultValue === true || this.to.defaultValue === false) && this.value !== false && this.value !== true) {
            this.value = this.to.defaultValue;
            this.formControl.setValue(this.to.defaultValue);
        }
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.value = x;
            this.to.changed && this.to.changed(x);
        });
    }

    changed(e: boolean) {
        this.formControl.setValue(e);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
