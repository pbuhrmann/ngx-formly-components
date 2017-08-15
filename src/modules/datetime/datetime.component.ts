import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

@Component({
    selector: 'formly-ngx-material-datetime',
    styles: [`
    .today {
        cursor: pointer;
    }
    .disabled {
        color: rgba(0,0,0,.38);
    }
    `],
    template: `
    <div class="" [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container>
            <input mdInput [formControl]="formControl" [placeholder]="to.placeholder" type="text" [textMask]="{mask: to.mask, keepCharPositions: true, pipe: autoCorrectedDatePipe }"/>
            <i mdSuffix class="fa fa-calendar-check-o today" [class.disabled]="formControl.disabled" [mdTooltip]="to.tooltip || 'Today'" mdTooltipPosition="below" (click)="!to.disabled && today()"></i>
        </md-input-container>
    </div>
    `
})
export class FormlyDatetimeComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public value: string;
    public options: any;
    public autoCorrectedDatePipe: any = null;
    private momentFunc = (moment as any).default ? (moment as any).default : moment;

    constructor() {
        super();
    }

    ngOnInit() {
        this.to.disabled && this.formControl.disable();
        this.to.source && this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.options = x;
        });
        if (this.formControl.value) {
            this.value = this.momentFunc(this.formControl.value, this.to.format).format(this.to.format);
        }

        /*this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
            
        });*/
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
