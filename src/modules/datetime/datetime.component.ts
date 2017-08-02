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
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <ngx-material-datetime [placeholder]="to.placeholder" [mask]="to.mask" [format]="to.format" [value]="value" (changed)="changed($event)"></ngx-material-datetime>
    </div>
    `
})
export class FormlyDatetimeComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public value: string;
    public options: any;
    momentFunc = (moment as any).default ? (moment as any).default : moment;

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
            this.value = this.momentFunc(this.formControl.value, this.to.format).format(this.to.format);
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
