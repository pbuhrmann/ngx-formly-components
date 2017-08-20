import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'formly-ngx-material-select',
    styles: [`

    `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}" style="margin-top: 10px">
        <md-select [formControl]="formControl" [disabled]="to.disabled" [style.width]="to.nonull?'100%':'calc(100% - 50px)'" style="padding-top: 4px" [placeholder]="to.placeholder" [multiple]="to.multiple">
            <md-option *ngFor="let item of items" [value]="item.value">{{item.name}}</md-option>
        </md-select>
        <button md-icon-button *ngIf="!to.nonull" (click)="clear()"><i class="material-icons md-24">clear</i></button>
    </div>
    `
})
export class FormlySelectComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any;
    private watch_lastValue: any = null;
    private sub: Subscription;
    private firstValue = null;

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.items = x;
                if (x && x.length > 0) {
                    let filtered = x.filter(y => y.value == this.formControl.value);
                    if (filtered && filtered.length > 0) {
                        this.formControl.setValue(filtered[0].value);
                    }
                    else {
                        if (this.to.nonull) {
                            this.formControl.setValue(x[0].value);
                        }
                    }
                }
            });
        }
        if (this.to.bind) {
            this.to.bind.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.formControl.setValue(x);
            });
        }
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
