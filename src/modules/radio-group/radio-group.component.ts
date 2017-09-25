import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Field } from 'ng-formly';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdAutocomplete } from '@angular/material';

@Component({
    selector: 'formly-ngx-radio-group',
    styles: [`
    .formly-radio-group {
        display: inline-flex;
        flex-direction: column;
    }
    .formly-radio-button {
        margin: 0px;
    }
    :host /deep/ label {
        font-weight: normal;
    }
    .formly-radio-group-label {
        color: rgba(0,0,0,.38);
    }
  `],
    template: `
    <div class="formly-radio-group-label">{{to.label}}</div>
    <md-radio-group class="formly-radio-group" [(ngModel)]="value">
        <md-radio-button class="formly-radio-button" *ngFor="let item of items" [value]="item.value" (click)="changed(item)">
            {{item.name}}
        </md-radio-button>
    </md-radio-group>
  `,
})
export class FormlyRadioGroupComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public items: any[] = [];
    public value: any = null;

    constructor(private http: Http, public dialog: MdDialog) {
        super();
    }

    public ngOnInit() {
        this.to.disabled && this.formControl.disable();
        this.to.initialized && this.to.initialized(this.formControl.value);
        this.to.source && this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.items = x;
            if (this.items && this.items.length > 0) {
                if (this.inputMapFn(this.formControl.value)) {
                    let val = this.items.filter(y => this.inputMapFn(y) == this.inputMapFn(this.formControl.value));
                    if (val && val.length > 0) {
                        this.value = this.inputMapFn(val[0]);
                    }
                }
            }
        });
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
            if (x && this.items && this.items.length > 0) {
                let val = this.items.filter(y => this.inputMapFn(y) == this.inputMapFn(x));
                if (val && val.length > 0) {
                    this.value = this.inputMapFn(val[0]);
                    this.to.changedRaw && this.to.changedRaw(val[0]);
                }
                else {
                    this.value = null;
                    this.to.changedRaw && this.to.changedRaw(null);
                }
                this.to.changed && this.to.changed(x);
            }
        });
    }

    changed(e: any) {
        //!!e && this.formControl.setValue(e);
        this.outputMapFn(e);
    }

    inputMapFn(e: any) {
        if (this.to.mapFn) {
            return this.to.mapFn(e);
        }
        return e;
    }

    outputMapFn(e: any) {
        if (e && this.to.mapFn && this.to.convertOutput !== false) {
            this.formControl.setValue(this.to.mapFn(e));
            this.value = e;
            return;
        }
        this.formControl.setValue(e);
        this.value = e;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}