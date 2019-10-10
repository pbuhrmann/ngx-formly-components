import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Subscription } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'ngx-formly-component-datetime',
    styles: [`
    .today {
        cursor: pointer;
    }
    .disabled {
        color: rgba(0,0,0,.38);
    }
    `],
    template: `
    <div class="">
         <mat-form-field>
        <input 
            matInput
            [placeholder]="to.placeholder"
            [textMask]="{mask: to.mask, keepCharPositions: true, pipe: autoCorrectedDatePipe }"
            [formControl]="formControl">
        </mat-form-field>
    </div>
    `
})
export class FormlyDatetimeComponent extends FieldType implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public value: string;
    public autoCorrectedDatePipe: any = null;
    private momentFunc = (moment as any).default ? (moment as any).default : moment;

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        if (this.formControl.value) {
            this.value = this.momentFunc(this.formControl.value, this.to.format).format(this.to.format);
        }        
        this.autoCorrectedDatePipe = this.createAutoCorrectedDateTimePipe(this.to.format);
    }

    today() {
        this.formControl.setValue(this.momentFunc().format(this.to.format));
    }

    createAutoCorrectedDateTimePipe(dateFormat: string) {
        return (conformedValue: any) => {
            const indexesOfPipedChars: any[] = [];
            const dateFormatArray: any = dateFormat.split(/[^DMYHms]+/);
            const maxValue: any = { 'DD': 31, 'MM': 12, 'YY': 99, 'YYYY': 9999, 'HH': 23, 'mm': 59, 'ss': 59 };
            const minValue: any = { 'DD': 1, 'MM': 1, 'YY': 0, 'YYYY': 1, 'HH': 0, 'mm': 0, 'ss': 0 };
            const conformedValueArr: any = conformedValue.split('');

            // Check first digit
            dateFormatArray.forEach((format: any) => {
                const position = dateFormat.indexOf(format);
                const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

                if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
                    conformedValueArr[position + 1] = conformedValueArr[position];
                    conformedValueArr[position] = 0;
                    indexesOfPipedChars.push(position);
                }
            });

            // Check for invalid date
            const isInvalid = dateFormatArray.some((format: any) => {
                const position: any = dateFormat.indexOf(format);
                const length: any = format.length;
                const textValue: any = conformedValue.substr(position, length).replace(/\D/g, '');
                const value: any = parseInt(textValue, 10);

                return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
            });

            if (isInvalid) {
                return false;
            }

            return {
                value: conformedValueArr.join(''),
                indexesOfPipedChars
            };
        };
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
