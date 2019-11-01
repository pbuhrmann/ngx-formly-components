import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Subscription } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngx-formly-component-checklist',
    styles: [`
    :host /deep/ .mat-checkbox-label {
        font-weight: normal !important;
    }
    `],
    template: `
    <mat-checkbox [disabled]="formControl?.disabled" [(ngModel)]="value" (ngModelChange)="changed($event)">{{to.text || ''}}</mat-checkbox>
    `
})
export class FormlyChecklistComponent extends FieldType implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
    public value: boolean;

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        this.value = this.formControl.value;
        if (this.to.defaultValue === true && this.value !== false && this.value !== true) {
            this.value = true;
            this.formControl.setValue(true);
        }
        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            this.value = x;
            this.to.changed && this.to.changed(x);
        });
    }

    changed(e: boolean) {
        this.formControl.setValue(e);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.unsubscribe();
    }

}
