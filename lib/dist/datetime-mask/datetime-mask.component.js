var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { Field } from 'ng-formly';
import createAutoCorrectedDateTimePipe from './createAutoCorrectedDateTimePipe';
import * as moment from 'moment';
import { Validators } from '@angular/forms';
var FormlyDateTimeMaskComponent = (function (_super) {
    __extends(FormlyDateTimeMaskComponent, _super);
    function FormlyDateTimeMaskComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.format = 'DD-MM-YYYY HH:mm';
        _this.mask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
        return _this;
    }
    FormlyDateTimeMaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.format = this.to.format ? this.to.format : this.format;
        this.autoCorrectedDatePipe = createAutoCorrectedDateTimePipe(this.format);
        this.mask = this.to.mask ? this.to.mask : this.mask;
        if (this.formControl.value) {
            this.model = moment(this.formControl.value).format(this.format);
        }
        else {
            this.model = null;
        }
        var validators = [];
        validators.push(function (e) { return _this.isValid() ? null : { 'date': 'Invalid date' }; });
        if (this.to.required) {
            validators.push(function (e) { return !!e.value ? null : { 'required': 'Required field' }; });
        }
        this.formControl.setValidators(Validators.compose(validators));
    };
    FormlyDateTimeMaskComponent.prototype.isValid = function () {
        if (this.model) {
            if (this.model.indexOf('_') >= 0) {
                return false;
            }
            else {
                if (moment(this.model, this.format).isValid()) {
                    return true;
                }
            }
            return false;
        }
        return true;
    };
    FormlyDateTimeMaskComponent.prototype.today = function () {
        this.model = moment().format(this.format);
        this.formControl.setValue(moment(this.model, this.format).toDate());
    };
    FormlyDateTimeMaskComponent.prototype.onChange = function (e) {
        if (e) {
            this.formControl.setValue(moment(e, this.format).toDate());
        }
        else {
            this.formControl.setValue(null);
        }
        this.errors = "";
        if (this.formControl.errors) {
            for (var key in this.formControl.errors) {
                if (this.formControl.errors.hasOwnProperty(key)) {
                    this.errors += this.formControl.errors[key] + '. ';
                }
            }
        }
    };
    return FormlyDateTimeMaskComponent;
}(Field));
export { FormlyDateTimeMaskComponent };
FormlyDateTimeMaskComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-datemask',
                styles: ["\n    .ng2-datetime-picker {\n        width: 100% !important;\n    }\n\n    i {\n        display: inline-block;\n    }\n\n    .datetime-picker .hourLabel, .datetime-picker .minutesLabel {\n        display: block !important;\n    }\n\n    p-inputMask {\n        padding: 0;\n    }\n\n    :host /deep/ .ui-inputtext {\n        width: 100%;\n        border: none !important;\n    }\n\n    .today {\n        position: absolute;\n        bottom: 10px;\n        right: 10px;\n        cursor: pointer;\n    }\n    "],
                template: "\n    <div class=\"form-group\">\n        <label for=\"key\" [ngStyle]=\"{color:formControl.errors?'#F00':''}\">{{ to.label }}</label>\n        <div style=\"position: relative\">\n        <input class=\"form-control\" placeholder=\"{{this.format}}\" type=\"text\" [(ngModel)]=\"model\" [textMask]=\"{mask: mask, keepCharPositions: true, pipe: autoCorrectedDatePipe }\"\n            (ngModelChange)=\"onChange($event)\" />\n            <i class=\"fa fa-calendar-check-o today\" title=\"Fecha de Hoy\" (click)=\"today()\"></i>\n        </div>\n    </div>\n    "
            },] },
];
/** @nocollapse */
FormlyDateTimeMaskComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=datetime-mask.component.js.map