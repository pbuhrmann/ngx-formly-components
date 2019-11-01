import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Subscription } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngx-formly-component-select',
    styles: [`
    :host /deep/ .mat-select-trigger {
        min-width: 20px;
    }
    `],
    template: `
    <div class="" [ngStyle]="{color:formControl?.errors?'#f44336':'inherit'}" style="margin-top: 10px">
        <mat-form-field>
            <mat-select [(ngModel)]="value" (ngModelChange)="changed($event)" [disabled]="formControl?.disabled" [style.width]="to.nullable?'calc(100% - 50px)':'100%'" style="padding-top: 4px" [placeholder]="to.placeholder" [multiple]="to.multiple">
                <mat-option *ngFor="let item of items" [value]="item">{{displayFn(item)}}</mat-option>
            </mat-select>
        </mat-form-field>
        <button mat-icon-button *ngIf="to.nullable" (click)="clear()"><i class="material-icons mat-24">clear</i></button>
    </div>
    `
})
export class FormlySelectComponent extends FieldType implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
    public items: any;
    public value: any;

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        this.to.initialized && this.to.initialized(this.formControl.value);
        this.to.source && this.to.source.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            this.items = x;
            if (x && x.length > 0) {
                if (this.formControl.value || this.formControl.value === 0) {
                    let filtered = x.filter(y => {
                        return this.inputMapFn(y) == this.inputMapFn(this.formControl.value)
                    });
                    if (filtered && filtered.length > 0) {
                        this.outputMapFn(filtered[0]);
                        this.value = filtered[0];
                    }
                }
                else if (this.to.nullable !== true) {
                    this.outputMapFn(this.items[0]);
                    this.to.initialized && this.to.initialized(this.formControl.value);
                    this.value = this.items[0];
                }
            }
        });
        let lastVal = this.inputMapFn(this.formControl.value);
        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            if (lastVal != this.inputMapFn(x)) {
                lastVal = this.inputMapFn(x);
                if (this.items && this.items.length > 0 && x) {
                    let filtered = this.items.filter(y => this.inputMapFn(y) == this.inputMapFn(x));
                    if (filtered && filtered.length > 0) {
                        lastVal = this.inputMapFn(filtered[0]);
                        this.outputMapFn(filtered[0]);
                        this.value = filtered[0];
                    }
                }
                else if (this.items && this.items.length > 0 && !x) {
                    this.outputMapFn(this.items[0]);
                    this.value = this.items[0];
                }
                this.to.changed && this.to.changed(x);
            }
        });
    }

    changed(e) {
        this.outputMapFn(e);
    }

    displayFn(e: any): string {
        if (this.to.displayFn) {
            return this.to.displayFn(e);
        }
        return e ? e.name : null;
    }

    inputMapFn(e: any) {
        if (this.to.mapFn) {
            return this.to.mapFn(e);
        }
        return e;
    }

    outputMapFn(e: any) {
        if (e && this.to.mapFn) {
            this.formControl.setValue(this.to.mapFn(e));
            return;
        }
        this.formControl.setValue(e);
    }

    clear() {
        if (!this.to.nullable) {
            return;
        }
        this.formControl.setValue(null);
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.unsubscribe();
    }

}
