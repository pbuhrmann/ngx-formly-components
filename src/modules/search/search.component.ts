import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Field } from 'ng-formly';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdAutocomplete } from '@angular/material';
import "rxjs/add/operator/takeUntil";

@Component({
    selector: 'ngx-formly-component-search',
    styles: [`
    .disabled {
        color: #b0b0b0;
    }
  `],
    template: `
    <div [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container style="width: 100%">
            <input mdInput [placeholder]="to.placeholder" type="text" [(ngModel)]="value" (ngModelChange)="onChange($event)" [disabled]="formControl.disabled" [mdAutocomplete]="autocomplete"/>
        </md-input-container>
        <md-autocomplete #autocomplete="mdAutocomplete" (optionSelected)="onSelect($event.option.value)" [displayWith]="to.inputDisplay.bind(this)">
            <md-option *ngFor="let item of items" [value]="item" [mdTooltip]="to.tooltip && optionDisplay(item)" [mdTooltipPosition]="to.tooltip">{{optionDisplay(item)}}</md-option>
        </md-autocomplete>
    </div>
  `,
})
export class FormlySearchComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public value: string;
    public items: any[];
    private timeout: any;
    private sub: Subscription;

    constructor(private http: Http, public dialog: MdDialog) {
        super();
    }

    public ngOnInit() {
        this.to.disabled && this.formControl.disable();

        this.value = this.formControl.value;
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
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
            this.sub = this.to.source && this.to.source(e).takeUntil(this.ngUnsubscribe).first().subscribe({
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
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}