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
        <button md-icon-button (click)="add()"><i class="material-icons md-24">add</i></button>
        <md-chip-list>
            <md-chip *ngFor="let item of selectedItems">
                {{item.name}}
                <span (click)="remove(item)" class="fa fa-times" style="cursor: pointer"></span>
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
            return this.selectedItems.indexOf(x) == -1;
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
            this.selectedItems.push(this.value);
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

    displayFn(e: any): string {
        return e ? e.name : null;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
