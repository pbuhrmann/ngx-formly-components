"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_formly_1 = require("ng-formly");
var createAutoCorrectedDateTimePipe_1 = require("./createAutoCorrectedDateTimePipe");
var moment = require("moment");
var forms_1 = require("@angular/forms");
var FormlyDateTimeMaskComponent = (function (_super) {
    __extends(FormlyDateTimeMaskComponent, _super);
    function FormlyDateTimeMaskComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fecha = null;
        _this.autoCorrectedDatePipe = createAutoCorrectedDateTimePipe_1.default('dd-mm-yyyy HH:MM');
        _this.mascara = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
        return _this;
    }
    FormlyDateTimeMaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.formControl.value) {
            this.fecha = moment(this.formControl.value).format('DD-MM-YYYY HH:mm');
        }
        else {
            this.fecha = null;
        }
        var validators = [];
        validators.push(function (e) { return _this.isValid() ? null : { 'date': 'Fecha inválida' }; });
        if (this.to.required) {
            validators.push(function (e) { return !!e.value ? null : { 'required': 'Campo requerido' }; });
        }
        this.formControl.setValidators(forms_1.Validators.compose(validators));
    };
    FormlyDateTimeMaskComponent.prototype.isValid = function () {
        if (this.fecha) {
            if (this.fecha.indexOf('_') >= 0) {
                return false;
            }
            else {
                if (moment(this.fecha, 'DD-MM-YYYY HH:mm').isValid()) {
                    return true;
                }
            }
            return false;
        }
        return true;
    };
    FormlyDateTimeMaskComponent.prototype.today = function () {
        this.fecha = moment().format('DD-MM-YYYY HH:mm');
        this.formControl.setValue(moment(this.fecha, 'DD-MM-YYYY HH:mm').toDate());
    };
    FormlyDateTimeMaskComponent.prototype.onChange = function (e) {
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
    };
    return FormlyDateTimeMaskComponent;
}(ng_formly_1.Field));
FormlyDateTimeMaskComponent = __decorate([
    core_1.Component({
        selector: 'formly-datemask',
        styles: ["\n    .ng2-datetime-picker {\n        width: 100% !important;\n    }\n\n    i {\n        display: inline-block;\n    }\n\n    .datetime-picker .hourLabel, .datetime-picker .minutesLabel {\n        display: block !important;\n    }\n\n    p-inputMask {\n        padding: 0;\n    }\n\n    :host /deep/ .ui-inputtext {\n        width: 100%;\n        border: none !important;\n    }\n\n    .today {\n        position: absolute;\n        bottom: 10px;\n        right: 10px;\n        cursor: pointer;\n    }\n    "],
        template: "\n    <div class=\"form-group\">\n        <label for=\"key\" [ngStyle]=\"{color:formControl.errors?'#F00':''}\" [title]=\"errors\">{{ to.label }}</label>\n        <div class=\"relative\">\n            <input class=\"form-control\" placeholder=\"DD-MM-YYYY hh:mm\" type=\"text\" [(ngModel)]=\"fecha\" [textMask]=\"{mask: mascara, keepCharPositions: true, pipe: autoCorrectedDatePipe }\"\n            (ngModelChange)=\"onChange($event)\" />\n            <i class=\"fa fa-calendar-check-o today\" title=\"Fecha de Hoy\" (click)=\"today()\"></i>\n        </div>\n    </div>\n    "
    })
], FormlyDateTimeMaskComponent);
exports.FormlyDateTimeMaskComponent = FormlyDateTimeMaskComponent;
