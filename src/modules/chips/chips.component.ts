import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'formly-ngx-material-chips',
    styles: [`

    `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <ngx-material-chips [disabled]="to.disabled" [placeholder]="to.placeholder" [items]="items" [values]="values" [maxItems]="to.maxItems || 99999" [onlyAutocomplete]="to.onlyAutocomplete || false" (changed)="changed($event)"></ngx-material-chips>
    </div>
    `
})
export class FormlyChipsComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any[];
    public values: string[];

    constructor(){
        super();
    }

    ngOnInit() {
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.items = x;                
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
