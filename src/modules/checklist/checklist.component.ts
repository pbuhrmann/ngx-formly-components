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
    <div class="">
        <div style="margin-top: 15px">
            <md-checkbox class="example-margin" [(ngModel)]="value" (ngModelChange)="changed($event)">{{to.text || ''}}</md-checkbox>
        </div>
    </div>
    `
})
export class FormlyChecklistComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public value: any;

    constructor() {
        super();
    }

    ngOnInit() {
        this.value = this.formControl.value;
    }

    changed(e: any) {
        this.formControl.setValue(e);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
