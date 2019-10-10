import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'ngx-formly-component-input',
    styles: [`
    :host /deep/ .ui-inputtext {
        width: 100%;
        border: none !important;
    }
  `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <mat-form-field style="width: 100%">
            <input #myinput matInput [placeholder]="to.placeholder" [maxlength]="to.maxLength" type="{{to.password?'password':'text'}}" [formControl]="formControl" [matAutocomplete]="autocomplete" [value]="value" (keydown)="keydown($event)"/>
        </mat-form-field>
        <mat-autocomplete #autocomplete="matAutocomplete">
            <mat-option *ngFor="let item of filteredItems" [value]="item">{{item}}</mat-option>
        </mat-autocomplete>
  </div>
  `,
})
export class FormlyInputComponent extends FieldType implements OnInit, OnDestroy, DoCheck {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any[];
    public filteredItems: any[];
    public value: string = null;
    @ViewChild('myinput', { static: true }) myinput: ElementRef;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    public ngOnInit() {
        //this.to.disabled && this.formControl.disable();
        if (this.to.source) {
            this.to.source.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
                this.items = x;
            });
        }

        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(e => {
            this.filteredItems = this.filter(e);

            let result = e;
            if (e && this.to.maxLength && e.length > this.to.maxLength) {
                result = result.substr(0, this.to.maxLength);
            }
            if (this.to.format && e) {
                result = this.to.format(e);
            }

            this.formControl.setValue(result, { emitEvent: false });
        });
    }

    ngDoCheck() {
        if (!this.formControl.value && this.myinput.nativeElement.value) {
            this.formControl.setValue(this.myinput.nativeElement.value);
        }
    }

    filter(val: string): string[] {
        if (!this.items) {
            return null;
        }

        let items = this.items;
        /*if (this.to.sourceFilter) {
            items = this.to.sourceFilter(this.items);
        }*/

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