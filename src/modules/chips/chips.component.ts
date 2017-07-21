import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
declare var require: any;
var moment = require('moment');
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'formly-ngx-material-chips',
    styles: [`

    `],
    template: `
    <div class="form-group">
        <label for="key">{{to.label}}</label>
        <div style="position: relative">
            <ngx-material-chips [options]="options" [values]="values" [maxItems]="to.maxItems || 99999" [onlyAutocomplete]="to.onlyAutocomplete || false" (changed)="changed($event)"></ngx-material-chips>
        </div>
    </div>
    `
})
export class FormlyChipsComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public options: any;
    public values: string[];

    ngOnInit() {
        if (this.to.source) {
            this.to.source.subscribe(x => {
                this.options = x;
            });
        }
        if (this.formControl.value) {
            if (this.to.joinString) {
                this.values = this.formControl.value.split(this.to.joinString);
            } else {
                this.values = this.formControl.value.split('|');
            }
        }
    }

    changed(e: string[]) {
        if (!!e) {
            if (this.to.joinString) {
                this.formControl.setValue(e.join(this.to.joinString));
            } else {
                this.formControl.setValue(e.join('|'));
            }
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
