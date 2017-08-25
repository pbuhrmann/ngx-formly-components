import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'ngx-formly-component-select',
    styles: [`

    `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}" style="margin-top: 10px">
        <md-select [formControl]="formControl" [disabled]="formControl.disabled" [style.width]="to.nonull?'100%':'calc(100% - 50px)'" style="padding-top: 4px" [placeholder]="to.placeholder" [multiple]="to.multiple">
            <md-option *ngFor="let item of items" [value]="item">{{item.name}}</md-option>
        </md-select>
        <button md-icon-button *ngIf="!to.nonull" (click)="clear()"><i class="material-icons md-24">clear</i></button>
    </div>
    `
})
export class FormlySelectComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any;

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.items = x;
                if (x && x.length > 0) {
                    if (!this.to.multiple) {
                        if (x && this.formControl.value) {
                            let filtered = x.filter(y => y.value == this.formControl.value.value);
                            if (filtered && filtered.length > 0) {
                                this.formControl.setValue(filtered[0]);
                            }
                        }
                        if (!this.formControl.value && this.to.nonull && x && x.length > 0) {
                            this.formControl.setValue(x[0]);
                        }
                    }
                    else {
                        if (this.formControl.value) {
                            let filtered = [];
                            for (var i = 0, len1 = this.items.length; i < len1; i++) {
                                let a = this.items[i];
                                for (var j = 0, len2 = this.formControl.value.length; j < len2; j++) {
                                    let b = this.formControl.value[j];
                                    if (a.value == b.value) {
                                        filtered.push(a);
                                        break;
                                    }
                                }
                            }
                            if (filtered && filtered.length > 0) {
                                this.formControl.setValue(filtered);
                            }
                        }
                    }
                }
            });
        }
        let lastVal = this.formControl.value;
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).filter(x=> x != lastVal).subscribe(x => {
            lastVal = x;
            if (this.items && this.items.length > 0) {
                if (!this.to.multiple) {
                    if (this.items && x) {
                        let filtered = this.items.filter(y => y.value == x.value);
                        if (filtered && filtered.length > 0) {
                            this.formControl.setValue(filtered[0]);
                        }
                    }
                    if (!x && this.to.nonull && this.items && this.items.length > 0) {
                        this.formControl.setValue(this.items[0]);
                    }
                }
                else {
                    if (x) {
                        let filtered = [];
                        for (var i = 0, len1 = this.items.length; i < len1; i++) {
                            let a = this.items[i];
                            for (var j = 0, len2 = x.length; j < len2; j++) {
                                let b = x.value[j];
                                if (a.value == b.value) {
                                    filtered.push(a);
                                    break;
                                }
                            }
                        }
                        if (filtered && filtered.length > 0) {
                            this.formControl.setValue(filtered);
                        }
                    }
                }
            }
            this.to.changed && this.to.changed(x);
        });
    }

    clear() {
        if (this.to.nonull) {
            return;
        }
        this.formControl.setValue(null);
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
