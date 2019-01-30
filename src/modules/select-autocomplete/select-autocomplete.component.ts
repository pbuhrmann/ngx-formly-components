import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Field } from 'ng-formly';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdAutocomplete } from '@angular/material';

@Component({
    selector: 'formly-ngx-select-autocomplete',
    styles: [`
    .autocomplete-info {
        color: grey;
    }
  `],
    template: `
    <div [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-form-field style="width: 100%">
            <input mdInput [placeholder]="to.placeholder" type="text" [(ngModel)]="value" (ngModelChange)="changed($event)" [disabled]="formControl.disabled" [mdAutocomplete]="autocomplete"/>
            <md-autocomplete #autocomplete="mdAutocomplete" [displayWith]="displayFn.bind(this)" (optionSelected)="selected($event)">
                <md-option *ngFor="let item of filteredItems" [value]="item" [mdTooltip]="to.tooltip && this.displayFn(item)" [mdTooltipPosition]="to.tooltip">
                {{displayFn(item)}} <small *ngIf="to.displayExtraFn != null" class="autocomplete-info">{{displayExtraFn(item)}}</small>
                </md-option>
            </md-autocomplete>
        </md-form-field>        
    </div>
  `,
})
export class FormlySelectAutocompleteComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public items: any[] = [];
    public filteredItems: any[];
    public value: any;
    private inputTimeout: any;

    constructor(private http: Http, public dialog: MdDialog) {
        super();
    }

    public ngOnInit() {
        this.to.disabled && this.formControl.disable();
        this.to.initialized && this.to.initialized(this.formControl.value);
        this.to.source && this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.filteredItems = [];
            this.items = x || [];
            let val: any = this.items.filter(y => this.inputMapFn(y) == this.inputMapFn(this.formControl.value));
            val = val.length > 0 && val[0] || null;
            if (val) {
                this.filteredItems = this.formControl.value && this.items.filter(y => this.displayFn(y) == this.displayFn(val)) || this.items;
                this.value = val;
            }
            else {
                this.filteredItems = this.items;
                this.formControl.setValue(null);
            }
        });
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
            let val: any = this.items.filter(y => this.inputMapFn(y) == this.inputMapFn(x));
            val = val.length > 0 && val[0] || null;
            if (val) {
                this.filteredItems = this.formControl.value && this.items.filter(y => this.displayFn(y) == this.displayFn(val)) || this.items;
                this.value = val;
                this.to.changedRaw && this.to.changedRaw(val);
            }
            else {
                this.value = null;
                this.to.changedRaw && this.to.changedRaw(null);
            }
            this.to.changed && this.to.changed(x);
        });
    }

    changed(e: any) {
        this.inputTimeout && clearTimeout(this.inputTimeout);
        if (this.formControl.value && this.displayFn(this.formControl.value) && !this.displayFn(e)) {
            this.formControl.setValue(null);
            this.filteredItems = this.items;
            return;
        }
        this.inputTimeout = setTimeout(() => {
            this.filteredItems = this.filter(e);
        }, 300);
        e && e.value ? this.outputMapFn(e) : this.formControl.setValue(null);
    }

    filter(val: any): string[] {
        if (!val) {
            return this.items;
        }
        if (!this.items || typeof val !== 'string') {
            return null;
        }
        return this.items.filter(option => {
            return option && (this.displayFn(option) || '').toLowerCase().indexOf(val.toLowerCase()) >= 0;
        });
    }

    selected(e: any) {
        if (e && e.option) {
            this.outputMapFn(e.option.value);
        }
    }

    displayFn(e: any): string {
        if (this.to && this.to.displayFn) {
            return this.to.displayFn(e);
        }
        return e ? e.name : null;
    }

    displayExtraFn(e: any): string {
        if (this.to && this.to.displayExtraFn) {
            return this.to.displayExtraFn(e);
        }
        return null;
    }

    inputMapFn(e: any) {
        if (this.to.mapFn) {
            return this.to.mapFn(e);
        }
        return e;
    }

    outputMapFn(e: any) {
        /*if (e && this.to.mapFn) {
            this.formControl.setValue(this.to.mapFn(e));
            this.value = e;
            return;
        }*/
        this.formControl.setValue(e);
        this.value = e;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}