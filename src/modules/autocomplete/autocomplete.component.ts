import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Field } from 'ng-formly';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdAutocomplete } from '@angular/material';

@Component({
    selector: 'formly-ngx-autocomplete',
    styles: [`
  `],
    template: `
    <div [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container style="width: 100%">
            <input mdInput [placeholder]="to.placeholder" type="text" [(ngModel)]="value" (ngModelChange)="changed($event)" [disabled]="formControl.disabled" [mdAutocomplete]="autocomplete"/>
        </md-input-container>
        <md-autocomplete #autocomplete="mdAutocomplete" [displayWith]="displayFn">
            <md-option *ngFor="let item of filteredItems" [value]="item" (click)="clicked(item)">{{item.name}}</md-option>
        </md-autocomplete>
    </div>
  `,
})
export class FormlyAutocompleteComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public items: any[];
    public filteredItems: any[];
    public value: string;
    private sub: Subscription;
    private timeout: any;

    constructor(private http: Http, public dialog: MdDialog) {
        super();
    }

    public ngOnInit() {
        this.to.disabled && this.formControl.disable();
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                if (x) {
                    this.items = x;
                    if (this.formControl.value) {
                        let val = this.items.filter(y => y.value == this.formControl.value)[0];
                        if (val) {
                            this.value = val.name || '';
                        }
                    }
                }
            });
        }
    }

    changed(e: any) {
        this.filteredItems = this.filter(e);
        if (!e) {
            this.formControl.setValue(null);
        }
    }

    filter(val: any): string[] {
        if (!this.items || val.name) {
            return null;
        }

        return this.items.filter(option => {
            if (!option) {
                return false;
            }
            if (!val) {
                return true;
            }
            return option.name.toLowerCase().indexOf(val.toLowerCase()) >= 0;
        });
    }

    clicked(e: any) {
        if (e) {
            this.formControl.setValue(e.value);
            this.value = e;
        }
    }

    displayFn(e: any): string {
        return e ? e.name : null;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}