import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

@Component({
    selector: 'formly-ngx-material-datetime',
    styles: [`

    `],
    template: `
    <div class="form-group">
        <label for="key">{{to.label}}</label>
        <div style="position: relative">
            <ngx-material-datetime [mask]="to.mask" [format]="to.format" [value]="value" (changed)="changed($event)"></ngx-material-datetime>
        </div>
    </div>
    `
})
export class FormlyDatetimeComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public value: string;
    public options: any;

    constructor() {
        super();
    }

    ngOnInit() {
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.options = x;
            });
        }
        if (this.formControl.value) {
            this.value = moment(this.formControl.value).format(this.to.format);
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
