import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'formly-ngx-material-select',
    styles: [`

    `],
    template: `
    <div class="form-group">
        <label for="key" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">{{to.label}}</label>
        <div>
            <ngx-material-select [value]="formControl.value" [items]="items" (change)="changed($event)" [multiple]="to.multiple"></ngx-material-select>
        </div>
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
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.items = x;
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
