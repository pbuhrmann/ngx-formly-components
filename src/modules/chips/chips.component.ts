import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Component({
    selector: 'formly-ngx-material-chips',
    styles: [`

    `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container style="width: 70%">
            <input type="text" [disabled]="to.disabled" mdInput [placeholder]="to.placeholder" [(ngModel)]="value" (ngModelChange)="changed($event)" [mdAutocomplete]="autocomplete" (keyup.enter)="add()">
        </md-input-container>
        <md-autocomplete #autocomplete="mdAutocomplete">
            <md-option *ngFor="let option of filteredItems" [value]="option" (click)="add(option)">
                {{ option }}
            </md-option>
        </md-autocomplete>
        <button md-icon-button (click)="add()"><i class="material-icons md-24">add</i></button>
        <md-chip-list>
            <md-chip *ngFor="let item of selectedItems">{{item}}
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
    public filteredItems: any[];
    public selectedItems: any[] = [];

    constructor() {
        super();
    }

    ngOnInit() {
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.items = x;
            });
        }
        this.selectedItems = this.formControl.value || [];
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.filteredItems = this.filter(x);
            this.selectedItems = x || [];
        });
    }

    filter(val: string): string[] {
        if (!this.items) {
            return null;
        }

        return this.items.filter(option => {
            if (!option) {
                return false;
            }
            if (!val) {
                return true;
            }
            option = option.toString();
            val = val.toString();
            return option.toLowerCase().indexOf(val.toLowerCase()) >= 0;
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
        if (this.to.disabled) {
            return;
        }
        if (this.selectedItems && this.value && this.selectedItems.length < (this.to.maxItems || 99999)) {
            if (this.selectedItems.indexOf(this.value) == -1) {
                if (this.to.onlyAutocomplete && this.items.indexOf(this.value) == -1) {
                    return;
                }
                this.selectedItems.push(this.value);
                this.filteredItems = this.filter(null);
                this.formControl.setValue(this.selectedItems);
            }
        }
        this.value = null;
    }

    remove(e) {
        if (this.to.disabled) {
            return;
        }
        this.selectedItems = this.selectedItems.filter(x => {
            return x != e;
        });
        this.formControl.setValue(this.selectedItems);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
