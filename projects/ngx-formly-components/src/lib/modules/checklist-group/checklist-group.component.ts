import { Component, OnInit, DoCheck, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Subscription } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { MatCheckboxChange } from "@angular/material";

@Component({
    selector: 'ngx-formly-component-checklist-group',
    styles: [`
    :host /deep/ .mat-checkbox-label {
        font-weight: normal !important;
    },
    .chk-item {
        width: 100%;
    }
    .chk-item-float {
        float: left;
        margin-right: 15px;
    }
    `],
    template: `
    <div *ngFor="let item of items" [ngClass]="{'chk-item-float': to.float, 'chk-item': !to.float }">
        <mat-checkbox [disabled]="to.disabled || item.disabled === true" [ngModel]="checked[item.value]" (change)="toggle($event, item)">{{item.name}}</mat-checkbox>
    </div>
    `,
    encapsulation: ViewEncapsulation.Emulated
})
export class FormlyChecklistGroupComponent extends FieldType implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

    public items: any[];
    public selectedItems: any[] = [];
    public checked: { [number: number]: boolean } = {};
    private blocked: boolean = false;

    constructor() {
        super();
    }

    ngOnInit() {
        this.selectedItems = this.formControl.value || [];
        this.to.source && this.to.source.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            this.items = x;
            if (this.selectedItems && x && x.length > 0) {
                this.checked = {};
                for (var i = 0; i < this.selectedItems.length; i++) {
                    var a = this.selectedItems[i];
                    for (var j = 0; j < this.items.length; j++) {
                        var b = this.items[j];
                        if (this.inputMapFn(a) == b.value) {
                            this.checked[this.inputMapFn(a)] = true;
                            break;
                        }
                    }
                }
            }
            this.to.order && (this.items = this.order_CheckedOnTop(this.items));
        });

        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            this.selectedItems = x || [];
            this.checked = {};

            for (var i = 0; i < this.selectedItems.length; i++) {
                var a = this.selectedItems[i];
                for (var j = 0; j < this.items.length; j++) {
                    var b = this.items[j];
                    if (this.inputMapFn(a) == b.value) {
                        this.checked[this.inputMapFn(a)] = true;
                        break;
                    }
                }
            }
            this.to.order && (this.items = this.order_CheckedOnTop(this.items));
        });
    }

    order_CheckedOnTop(items: any) {
        let top = [];
        let bottom = [];
        for (var i = 0; i < this.items.length; i++) {
            var a = this.items[i];
            if (this.checked[this.inputMapFn(a)]) {
                top.push(a);
            }
            else {
                bottom.push(a);
            }
        }
        return top.concat(bottom);
    }

    toggle(e: MatCheckboxChange, item: any) {
        if (e.checked) {
            this.checked[item.value] = true;
            this.selectedItems.push(item);
            this.outputMapFn(this.selectedItems);
        }
        else {
            for (var i = 0; i < this.selectedItems.length; i++) {
                var a = this.selectedItems[i];
                if (this.inputMapFn(a) == item.value) {
                    delete this.checked[item.value];
                    this.selectedItems.splice(i, 1);
                    this.outputMapFn(this.selectedItems);
                    return;
                }
            }
        }
    }

    inputMapFn(e: any) {
        if (this.to.mapFn) {
            return this.to.mapFn(e);
        }
        return e;
    }

    outputMapFn(e: any) {
        if (this.to.mapFn && e) {
            this.formControl.setValue(e.map(x => this.to.mapFn(x)));
            return;
        }
        this.formControl.setValue(e);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.unsubscribe();
    }

}
