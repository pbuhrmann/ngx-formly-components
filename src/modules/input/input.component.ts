import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Field } from 'ng-formly';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'formly-ngx-material-input',
    styles: [`
    :host /deep/ .ui-inputtext {
        width: 100%;
        border: none !important;
    }
  `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container style="width: 100%">
            <input #myinput mdInput [placeholder]="to.placeholder" type="{{to.password?'password':'text'}}" [formControl]="formControl" [mdAutocomplete]="autocomplete" [value]="value" (keydown)="keydown($event)"/>
        </md-input-container>
        <md-autocomplete #autocomplete="mdAutocomplete">
            <md-option *ngFor="let item of filteredItems" [value]="item">{{item}}</md-option>
        </md-autocomplete>
  </div>
  `,
})
export class FormlyInputComponent extends Field implements OnInit, OnDestroy, AfterViewInit {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any[];
    public filteredItems: any[];
    public value: string = null;
    @ViewChild('myinput') myinput: ElementRef;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    public ngOnInit() {
        if (this.to.disabled) {
            this.formControl.disable();
        }
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                this.items = x;
            });
        }

        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(e => {
            this.filteredItems = this.filter(e);

            let result = e;
            if (this.to.maxLength && e.length > this.to.maxLength) {
                result = result.substr(0, this.to.maxLength);
            }
            if (this.to.format && e) {
                result = this.to.format(e);
            }
            
            this.formControl.setValue(result, { emitEvent: false });
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (!this.formControl.value && this.myinput.nativeElement.value) {
                this.formControl.setValue(this.myinput.nativeElement.value);
            }
        }, 600);
    }

    filter(val: string): string[] {
        if (!this.items) {
            return null;
        }

        let items = this.items;
        if (this.to.sourceFilter) {
            items = this.to.sourceFilter(this.items);
        }

        return items.filter(option => {
            if (!option) {
                return false;
            }
            if (!val) {
                return true;
            }
            option = option.toString();
            val = val.toString();
            return option.toLowerCase().indexOf(val.toLowerCase()) >= 0;
        });
    }

    keydown(e: any) {
        if (this.to.keydown) {
            this.to.keydown(e);
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}