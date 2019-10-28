import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Field } from '@ngx-formly/core';
import { Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { MatDialog, MatAutocomplete } from '@angular/material';
import { takeUntil, first } from 'rxjs/operators';

@Component({
    selector: 'ngx-formly-component-search',
    styles: [`
    .disabled {
        color: #b0b0b0;
    }
  `],
    template: `
    <div [ngStyle]="{color:formControl?.errors?'#f44336':'inherit'}">
        <mat-form-field style="width: 100%">
            <input matInput [placeholder]="to.placeholder" type="text" [(ngModel)]="value" (ngModelChange)="onChange($event)" [disabled]="formControl?.disabled" [matAutocomplete]="autocomplete">
        </mat-form-field>
        <mat-autocomplete #autocomplete="matAutocomplete" (optionSelected)="onSelect($event.option.value)" [displayWith]="to.inputDisplay.bind(this)">
            <mat-option *ngFor="let item of items" [value]="item" [matTooltip]="to.tooltip && optionDisplay(item)" [matTooltipPosition]="to.tooltip">{{optionDisplay(item)}}</mat-option>
        </mat-autocomplete>
    </div>
  `,
})
export class FormlySearchComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
    public value: string;
    public items: any[];
    private timeout: any;
    private sub: Subscription;

    constructor(private http: Http, public dialog: MatDialog) {
        super();
    }

    public ngOnInit() {
        this.to.disabled && this.formControl.disable();

        this.value = this.formControl.value;
        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            this.value = x;
            this.to.onChange && this.to.onChange(x);
        });
    }

    public onChange(e: any) {
        if (!e) {
            this.to.onTyped && this.to.onTyped(null);
            this.items = [];
            return;
        }
        if (typeof e !== 'string') {
            return;
        }

        this.to.onTyped && this.to.onTyped(e);

        this.formControl.setValue(e);

        this.timeout && clearTimeout(this.timeout);
        this.sub && this.sub.unsubscribe();

        this.timeout = setTimeout(() => {
            this.sub = this.to.source && this.to.source(e).pipe(takeUntil(this.ngUnsubscribe), first()).subscribe({
                next: x => {
                    if (this.to.searchFilter) {
                        this.items = x.filter(y => this.to.searchFilter(y));
                    }
                    else {
                        this.items = x;
                    }
                },
                error: x => {
                }
            });
        }, this.to.debounceTime == null ? 300 : this.to.debounceTime);
    }

    onSelect(e: any) {
        if (this.to.onSelect) {
            this.formControl.setValue(this.to.onSelect(e));
        }
        else {
            this.formControl.setValue(e);
        }
    }

    public optionDisplay(e) {
        return this.to.optionDisplay(e);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.unsubscribe();
    }
}