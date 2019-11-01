import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Subscription } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngx-formly-component-chips',
    styles: [`
        mat-chip {
            outline: none;
            margin: 1px 0px 0px 0px !important;
        }
    `],
    template: `
    <div class="" [ngStyle]="{color:formControl?.errors?'#f44336':'inherit'}">
        <mat-form-field>
            <input type="text" [disabled]="formControl?.disabled" matInput [placeholder]="to.placeholder" [(ngModel)]="value" (ngModelChange)="changed($event)" [matAutocomplete]="autocomplete" (keyup.enter)="add()">
            <mat-autocomplete #autocomplete="matAutocomplete" [displayWith]="displayFn">
                <mat-option *ngFor="let option of filteredItems" [value]="option" (click)="add()">
                    {{ option.name }}
                </mat-option>
            </mat-autocomplete>    
        </mat-form-field> 
        <mat-chip-list [tabIndex]="-1">
            <mat-chip *ngFor="let item of selectedItems" (click)="remove(item)" style="cursor: pointer">
                {{chipDisplayFn(item)}}
            </mat-chip>
        </mat-chip-list>
    </div>
    `
})
export class FormlyChipsComponent extends FieldType implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
    public items: any[];
    public value: string = null;
    public filteredItems: any[] = null;
    public selectedItems: any[] = [];

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        this.selectedItems = this.filter(this.formControl.value) || [];
        if (this.to.source) {
            this.to.source.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
                this.items = x;
                this.filteredItems = this.filterValue(null);
            });
        }
        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            this.selectedItems = this.filter(x) || [];
            this.to.changed && this.to.changed(x);
        });
    }

    map(e: any) {
        if(this.to.mapFn){
            return this.to.mapFn(e);
        }
        return e;
    }

    filter(e: any) {
        if (this.to.filterFn) {
            return this.to.filterFn(e);
        }
        return e;
    }

    filterValue(val: any): string[] {
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
        this.filteredItems = this.filterValue(e);
    }

    add() {
        if (this.to.disabled || this.formControl.disabled) {
            return;
        }
        if (this.selectedItems && this.value && this.selectedItems.length < (this.to.maxItems || 99999)) {
            if (this.to.onlyAutocomplete && this.items.indexOf(this.value) == -1) {
                return;
            }
            if (this.to.mapFn) {
                this.selectedItems.push(this.map(this.value));
            }
            else {
                this.selectedItems.push(this.value);
            }
            this.filteredItems = this.filterValue(null);
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
        this.filteredItems = this.filterValue(this.value);
        this.formControl.setValue(this.selectedItems);
    }

    chipDisplayFn(e: any) {
        return this.to.displayFn && this.to.displayFn(e) || e && e.name || null;
    }

    displayFn(e: any): string {
        return e ? e.name : null;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.unsubscribe();
    }

}
