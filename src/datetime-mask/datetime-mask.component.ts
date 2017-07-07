import { Component, OnInit, DoCheck } from '@angular/core';
import { Field } from 'ng-formly';
import createAutoCorrectedDateTimePipe from './createAutoCorrectedDateTimePipe';
import * as moment from 'moment';
import { Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'formly-datemask',
    styles: [`
    .ng2-datetime-picker {
        width: 100% !important;
    }

    i {
        display: inline-block;
    }

    .datetime-picker .hourLabel, .datetime-picker .minutesLabel {
        display: block !important;
    }

    p-inputMask {
        padding: 0;
    }

    :host /deep/ .ui-inputtext {
        width: 100%;
        border: none !important;
    }

    .today {
        position: absolute;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
    }
    `],
    template: `
    <div class="form-group">
        <label for="key" [ngStyle]="{color:formControl.errors?'#F00':''}" [title]="errors">{{ to.label }}</label>
        <div class="relative">
            <input class="form-control" placeholder="DD-MM-YYYY hh:mm" type="text" [(ngModel)]="fecha" [textMask]="{mask: mascara, keepCharPositions: true, pipe: autoCorrectedDatePipe }"
            (ngModelChange)="onChange($event)" />
            <i class="fa fa-calendar-check-o today" title="Fecha de Hoy" (click)="today()"></i>
        </div>
    </div>
    `
})
export class FormlyDateTimeMaskComponent extends Field implements OnInit {
    public fecha: string = null;
    public autoCorrectedDatePipe = createAutoCorrectedDateTimePipe('dd-mm-yyyy HH:MM');
    public mascara = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
    public errors: string;

    public ngOnInit() {
        if (this.formControl.value) {
            this.fecha = moment(this.formControl.value).format('DD-MM-YYYY HH:mm');
        }
        else {
            this.fecha = null;
        }
        let validators = [];
        validators.push((e) => { return this.isValid() ? null : { 'date': 'Fecha inválida' } });
        if (this.to.required) {
            validators.push((e) => { return !!e.value ? null : { 'required': 'Campo requerido' } });
        }
        this.formControl.setValidators(Validators.compose(validators));
    }

    isValid() {
        if (this.fecha) {
            if (this.fecha.indexOf('_') >= 0) {
                return false;
            }
            else {
                if (moment(this.fecha, 'DD-MM-YYYY HH:mm').isValid()) {
                    return true;
                }
            }
            return false
        }
        return true;
    }

    today() {
        this.fecha = moment().format('DD-MM-YYYY HH:mm');
        this.formControl.setValue(moment(this.fecha, 'DD-MM-YYYY HH:mm').toDate());
    }

    onChange(e) {
        if (e) {
            this.formControl.setValue(moment(e, 'DD-MM-YYYY HH:mm').toDate());
        }
        else {
            this.formControl.setValue(null);
        }
        this.errors = "";
        for (var key in this.formControl.errors) {
            if (this.formControl.errors.hasOwnProperty(key)) {
                this.errors += this.formControl.errors[key] + '. ';
            }
        }
    }

}
