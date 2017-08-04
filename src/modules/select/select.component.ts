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
        <ngx-material-select [disabled]="to.disabled" [nonull]="to.nonull" [placeholder]="to.placeholder" [value]="formControl.value" [items]="items" (change)="changed($event)" [multiple]="to.multiple"></ngx-material-select>
    </div>
    `
})
export class FormlySelectComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any;
    private watch_lastValue: any = null;
    private sub: Subscription;

    constructor() {
        super();
    }

    ngOnInit() {
        let initialValue = this.formControl.value;
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.items = x;
                if (this.to.nonull && !initialValue && x) {
                    this.formControl.setValue(x[0].value);
                }
            });
        }
        if (this.to.bind) {
            this.to.bind.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.formControl.setValue(x);
            });
        }
    }

    changed(e: any) {
        this.formControl.setValue(e);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
