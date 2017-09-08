import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Component({
    selector: 'ngx-formly-component-chips',
    styles: [`
        md-chip {
            outline: none;
            margin: 1px 0px 0px 0px !important;
        }
    `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container style="width: 70%">
            <input type="text" [disabled]="formControl.disabled" mdInput [placeholder]="to.placeholder" [(ngModel)]="value" (ngModelChange)="changed($event)" [mdAutocomplete]="autocomplete" (keyup.enter)="add()">
        </md-input-container>
        <md-autocomplete #autocomplete="mdAutocomplete" [displayWith]="displayFn">
            <md-option *ngFor="let option of filteredItems" [value]="option" (click)="add(option)">
                {{ option.name }}
            </md-option>
        </md-autocomplete>
        <md-chip-list>
            <md-chip *ngFor="let item of selectedItems" (click)="remove(item)" style="cursor: pointer">
                {{chipDisplayFn(item)}}
            </md-chip>
        </md-chip-list>
    </div>
    `
})
export class FormlyChipsComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any[];
    public value: string = null;
    public filteredItems: any[] = null;
    public selectedItems: any[] = [];

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.items = x;
            });
        }
        this.selectedItems = this.formControl.value || [];
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.selectedItems = x || [];
            this.to.changed && this.to.changed(x);
        });
    }

    map(e: any[]) {
        if (this.to.map) {
            return this.to.map(e);
        }
        return e;
    }

    filter(val: any): string[] {
        if (!this.items) {
            return null;
        }

        return this.items.filter(option => {
            if (!val) {
                return true;
            }
            if (!option || !this.items || val.name) {
                return false;
            }
            return option.name.toLowerCase().indexOf(val.toLowerCase()) >= 0;
        }).filter(x => {
            if (!this.selectedItems) {
                return true;
            }
            if (this.to.displayFn) {
                return this.selectedItems.map(y => this.chipDisplayFn(y)).indexOf(x.name) == -1;
            }
            else {
                return this.selectedItems.map(y => y.name).indexOf(x.name) == -1;
            }

        });
    }

    changed(e: any) {
        this.filteredItems = this.filter(e);
    }

    add() {
        if (this.to.disabled || this.formControl.disabled) {
            return;
        }
        if (this.selectedItems && this.value && this.selectedItems.length < (this.to.maxItems || 99999)) {
            if (this.to.onlyAutocomplete && this.items.indexOf(this.value) == -1) {
                return;
            }
            if (this.to.map) {
                this.selectedItems.push(this.to.map(this.value));
            }
            else {
                this.selectedItems.push(this.value);
            }
            this.filteredItems = this.filter(null);
            this.formControl.setValue(this.selectedItems);
        }
        this.value = null;
    }

    remove(e) {
        if (this.to.disabled || this.formControl.disabled) {
            return;
        }
        this.selectedItems = this.selectedItems.filter(x => {
            return x != e;
        });
        this.formControl.setValue(this.selectedItems);
    }

    chipDisplayFn(e: any) {
        return this.to.displayFn && this.to.displayFn(e) || e && e.name || null;
    }

    displayFn(e: any): string {
        return e ? e.name : null;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
