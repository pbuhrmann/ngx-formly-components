import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs';
import { MatDialog, MatAutocomplete } from '@angular/material';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'formly-ngx-select-autocomplete',
    styles: [`
    .autocomplete-info {
        color: grey;
    }
  `],
    template: `
    <div [ngStyle]="{color:formControl?.errors?'#f44336':'inherit'}">
        <mat-form-field style="width: 100%">
            <input matInput [placeholder]="to.placeholder" type="text" [(ngModel)]="value" (ngModelChange)="valueInput.next($event)" [disabled]="formControl?.disabled" [matAutocomplete]="autocomplete">
            <mat-autocomplete #autocomplete="matAutocomplete" [displayWith]="displayFn.bind(this)" (optionSelected)="selected($event)">
                <mat-option *ngFor="let item of filteredItems" [value]="item" [matTooltip]="to.tooltip && this.displayFn(item)" [matTooltipPosition]="to.tooltip">
                {{displayFn(item)}} <small *ngIf="to.displayExtraFn != null" class="autocomplete-info">{{displayExtraFn(item)}}</small>
                </mat-option>
            </mat-autocomplete>
        </mat-form-field>        
    </div>
  `,
})
export class FormlySelectAutocompleteComponent extends FieldType implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

    public items: any[] = [];
    public filteredItems: any[];
    public value: any;
    public valueInput: Subject<string> = new Subject();

    constructor(private http: Http, public dialog: MatDialog) {
        super();
    }

    public ngOnInit() {
        this.to.disabled && this.formControl.disable();
        this.to.initialized && this.to.initialized(this.formControl.value);
        this.to.source && this.to.source.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
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
        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            let val: any = null;
            for (let i = 0; i < this.items.length; i++) {
                const y = this.items[i];
                if (this.inputMapFn(y) == this.inputMapFn(x)) {
                    val = y;
                    break;
                }
            }

            if (val) {
                this.filteredItems = this.formControl.value && this.items.filter(y => this.displayFn(y) == this.displayFn(val)) || this.items;
                this.value = val;
                this.to.changedRaw && this.to.changedRaw(val);
            }
            else {
                this.value = null;
                this.filteredItems = this.items;
                this.to.changedRaw && this.to.changedRaw(null);
            }
            this.to.changed && this.to.changed(x);
        });

        this.valueInput.pipe(takeUntil(this.ngUnsubscribe), debounceTime(350), distinctUntilChanged()).subscribe(x => {
            if (!x) {
                this.formControl.setValue(null);
            }

            this.filteredItems = this.filter(x);
        });
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
        if (e && this.to.mapFn) {
            this.formControl.setValue(this.to.mapFn(e));
            this.value = e;
            return;
        }
        this.formControl.setValue(e);
        this.value = e;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.unsubscribe();
    }
}