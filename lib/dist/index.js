(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('ng-formly'), require('rxjs'), require('ngx-chips'), require('angular2-text-mask'), require('ng2-select/select/select.module')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common', 'ng-formly', 'rxjs', 'ngx-chips', 'angular2-text-mask', 'ng2-select/select/select.module'], factory) :
	(factory((global.ngx = global.ngx || {}, global.ngx.formly = global.ngx.formly || {}, global.ngx.formly.components = {}),global.ng.core,global._angular_forms,global._angular_common,global.ngFormly,global.rxjs,global.ngxChips,global.angular2TextMask,global.ng2Select_select_select_module));
}(this, (function (exports,_angular_core,_angular_forms,_angular_common,ngFormly,rxjs,ngxChips,angular2TextMask,ng2Select_select_select_module) { 'use strict';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FormlyChipsComponent = (function (_super) {
    __extends(FormlyChipsComponent, _super);
    function FormlyChipsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._model = [];
        _this.ngUnsubscribe = new rxjs.Subject();
        _this.requestAutocompleteItems = function (text) {
            if (_this.suggestions && _this.suggestions.length > 0) {
                return rxjs.Observable.of(_this.suggestions);
            }
            else {
                return rxjs.Observable.of([]);
            }
        };
        return _this;
    }
    FormlyChipsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.to.source.takeUntil(this.ngUnsubscribe).subscribe(function (x) {
            _this.suggestions = x;
        });
        if (this.formControl.value) {
            if (typeof this.formControl.value == "string") {
                if (this.to.joinString) {
                    this._model = this.formControl.value.split(this.to.joinString);
                }
                else {
                    this._model = this.formControl.value.split('|');
                }
            }
            else {
                this._model = [this.formControl.value.toString()];
            }
        }
    };
    FormlyChipsComponent.prototype.onAdd = function (e) {
        this._model.push(e.value);
        if (this.to.joinString) {
            this.formControl.setValue(this._model.join(this.to.joinString));
        }
        else {
            this.formControl.setValue(this._model.join('|'));
        }
    };
    FormlyChipsComponent.prototype.onRemove = function (e) {
        var index = this._model.indexOf(e);
        this._model.splice(index, 1);
        if (this.to.joinString) {
            this.formControl.setValue(this._model.join(this.to.joinString));
        }
        else {
            this.formControl.setValue(this._model.join('|'));
        }
    };
    FormlyChipsComponent.prototype.match = function (query, opcion) {
        return true;
    };
    FormlyChipsComponent.prototype.ngOnDestroy = function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    return FormlyChipsComponent;
}(ngFormly.Field));
FormlyChipsComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'formly-chips',
                styles: [],
                template: "\n  <div class=\"form-group\">\n    <div class=\"header-search\">\n        <label for=\"key\" style=\"display: inline-block;\">{{ to.label }}</label>\n        <tag-input [ngModel]=\"_model\" [secondaryPlaceholder]=\"to['placeholder'] ? to['placeholder'] : 'Add  values'\" [placeholder]=\"'+'\"\n            [maxItems]=\"to['maxItems']\" [onlyFromAutocomplete]=\"to['onlyFromAutocomplete'] || false\"\n            (onAdd)=\"onAdd($event)\" (onRemove)=\"onRemove($event)\" [onTextChangeDebounce]=\"500\">\n            <tag-input-dropdown [autocompleteObservable]=\"requestAutocompleteItems\" [focusFirstElement]=\"true\" [showDropdownIfEmpty]=\"true\">\n            </tag-input-dropdown>\n        </tag-input>\n        <small class=\"text-muted\">{{to.helpMessage || \"Press 'Enter' to add value\"}}</small>\n    </div>\n  </div>\n  ",
            },] },
];
FormlyChipsComponent.ctorParameters = function () { return []; };

var FormlyChipsModule = (function () {
    function FormlyChipsModule() {
    }
    FormlyChipsModule.forRoot = function () {
        return {
            ngModule: FormlyChipsModule,
            providers: []
        };
    };
    return FormlyChipsModule;
}());
FormlyChipsModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule,
                    _angular_forms.FormsModule,
                    _angular_forms.ReactiveFormsModule,
                    ngxChips.TagInputModule
                ],
                declarations: [FormlyChipsComponent],
                exports: [FormlyChipsComponent]
            },] },
];
FormlyChipsModule.ctorParameters = function () { return []; };

function createAutoCorrectedDateTimePipe(dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'DD-MM-yyyy HH:mm:ss'; }
    return function (conformedValue) {
        var indexesOfPipedChars = [];
        var dateFormatArray = dateFormat.split(/[^DMYHms]+/);
        var maxValue = { 'DD': 31, 'MM': 12, 'YY': 99, 'YYYY': 9999, 'HH': 23, 'mm': 59, 'ss': 59 };
        var minValue = { 'DD': 1, 'MM': 1, 'YY': 0, 'YYYY': 1, 'HH': 0, 'mm': 0, 'ss': 0 };
        var conformedValueArr = conformedValue.split('');
        dateFormatArray.forEach(function (format) {
            var position = dateFormat.indexOf(format);
            var maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);
            if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
                conformedValueArr[position + 1] = conformedValueArr[position];
                conformedValueArr[position] = 0;
                indexesOfPipedChars.push(position);
            }
        });
        var isInvalid = dateFormatArray.some(function (format) {
            var position = dateFormat.indexOf(format);
            var length = format.length;
            var textValue = conformedValue.substr(position, length).replace(/\D/g, '');
            var value = parseInt(textValue, 10);
            return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
        });
        if (isInvalid) {
            return false;
        }
        return {
            value: conformedValueArr.join(''),
            indexesOfPipedChars: indexesOfPipedChars
        };
    };
}

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var moment = require('moment');
var FormlyDateTimeMaskComponent = (function (_super) {
    __extends$1(FormlyDateTimeMaskComponent, _super);
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
        this.formControl.setValidators(_angular_forms.Validators.compose(validators));
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
}(ngFormly.Field));
FormlyDateTimeMaskComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'formly-datemask',
                styles: ["\n    .ng2-datetime-picker {\n        width: 100% !important;\n    }\n\n    i {\n        display: inline-block;\n    }\n\n    .datetime-picker .hourLabel, .datetime-picker .minutesLabel {\n        display: block !important;\n    }\n\n    p-inputMask {\n        padding: 0;\n    }\n\n    :host /deep/ .ui-inputtext {\n        width: 100%;\n        border: none !important;\n    }\n\n    .today {\n        position: absolute;\n        bottom: 10px;\n        right: 10px;\n        cursor: pointer;\n    }\n    "],
                template: "\n    <div class=\"form-group\">\n        <label for=\"key\" [ngStyle]=\"{color:formControl.errors?'#F00':''}\">{{ to.label }}</label>\n        <div style=\"position: relative\">\n        <input class=\"form-control\" placeholder=\"{{this.format}}\" type=\"text\" [(ngModel)]=\"model\" [textMask]=\"{mask: mask, keepCharPositions: true, pipe: autoCorrectedDatePipe }\"\n            (ngModelChange)=\"onChange($event)\" />\n            <i class=\"fa fa-calendar-check-o today\" title=\"Fecha de Hoy\" (click)=\"today()\"></i>\n        </div>\n    </div>\n    "
            },] },
];
FormlyDateTimeMaskComponent.ctorParameters = function () { return []; };

var FormlyDatetimeMaskModule = (function () {
    function FormlyDatetimeMaskModule() {
    }
    FormlyDatetimeMaskModule.forRoot = function () {
        return {
            ngModule: FormlyDatetimeMaskModule, providers: []
        };
    };
    return FormlyDatetimeMaskModule;
}());
FormlyDatetimeMaskModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule,
                    _angular_forms.FormsModule,
                    _angular_forms.ReactiveFormsModule,
                    angular2TextMask.TextMaskModule
                ],
                declarations: [FormlyDateTimeMaskComponent],
                exports: [FormlyDateTimeMaskComponent],
                entryComponents: [FormlyDateTimeMaskComponent]
            },] },
];
FormlyDatetimeMaskModule.ctorParameters = function () { return []; };

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FormlySelectAsyncComponent = (function (_super) {
    __extends$2(FormlySelectAsyncComponent, _super);
    function FormlySelectAsyncComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.disabled = false;
        return _this;
    }
    FormlySelectAsyncComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub_items = this.to.options.filter(function (x) { return x != null; }).subscribe(function (x) {
            _this.items = x.map(function (x) {
                return {
                    text: x.name,
                    id: x.id
                };
            });
        });
        this.isDisabled();
    };
    FormlySelectAsyncComponent.prototype.selected = function (e) {
        this.formControl.setValue(e.id);
    };
    FormlySelectAsyncComponent.prototype.isDisabled = function () {
        this.disabled = this.to.disabled || !!this.to.isDisabled && this.to.isDisabled(this.formControl.value);
    };
    FormlySelectAsyncComponent.prototype.ngAfterViewInit = function () {
        if (!this.formControl.value && this.to.defaultValue) {
            this.formControl.setValue(this.to.defaultValue);
        }
        if (!this.formControl.value && !this.to.defaultValue) {
            return;
        }
        for (var i = 0, len = this.items.length; i < len; i++) {
            var item = this.items[i];
            console.log(item, this.formControl.value);
            if (item.id == this.formControl.value) {
                this.selectedItem = [item];
                console.log(this.selectedItem);
                break;
            }
        }
    };
    FormlySelectAsyncComponent.prototype.ngOnDestroy = function () {
        this.sub_items && this.sub_items.unsubscribe();
    };
    return FormlySelectAsyncComponent;
}(ngFormly.Field));
FormlySelectAsyncComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'formly-select',
                styles: ["\n  .input-group {\n        margin-bottom: 15px;\n  }\n\n  :host /deep/ .ui-select-choices {\n      display: block !important;\n  }\n\n  :host /deep/ .ui-select-toggle .dropdown-toggle {\n      float: right;\n  }\n\n  :host /deep/ .ui-select-toggle.caret-hidden .dropdown-toggle {\n      display: none;\n  }\n  "],
                template: "\n  <div [formGroup]=\"form\">\n    <label for=\"key\" style=\"display: inline-block;\">{{ to.label }}</label>\n    <div class=\"header-search\">\n        <ng-select #mySelect [allowClear]=\"true\" [disabled]=\"disabled\" [items]=\"items\" [active]=\"selectedItem\" (selected)=\"selected($event)\" [placeholder]=\"placeholder\" [ngClass]=\"{'form-control-danger': valid}\">\n        </ng-select>\n    </div>\n  </div>\n  "
            },] },
];
FormlySelectAsyncComponent.ctorParameters = function () { return []; };
FormlySelectAsyncComponent.propDecorators = {
    'mySelect': [{ type: _angular_core.ViewChild, args: ['mySelect',] },],
};

var FormlySelectAsyncModule = (function () {
    function FormlySelectAsyncModule() {
    }
    FormlySelectAsyncModule.forRoot = function () {
        return {
            ngModule: FormlySelectAsyncModule, providers: []
        };
    };
    return FormlySelectAsyncModule;
}());
FormlySelectAsyncModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule,
                    _angular_forms.FormsModule,
                    _angular_forms.ReactiveFormsModule,
                    ng2Select_select_select_module.SelectModule
                ],
                declarations: [FormlySelectAsyncComponent],
                exports: [FormlySelectAsyncComponent],
                entryComponents: [FormlySelectAsyncComponent]
            },] },
];
FormlySelectAsyncModule.ctorParameters = function () { return []; };

var MODULES = [
    ngFormly.FormlyBootstrapModule,
    ngFormly.FormlyModule,
    FormlyDatetimeMaskModule,
    FormlySelectAsyncModule,
    FormlyChipsModule
];
var FormlyComponentsRootModule = (function () {
    function FormlyComponentsRootModule() {
    }
    return FormlyComponentsRootModule;
}());
FormlyComponentsRootModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule,
                    _angular_forms.FormsModule,
                    _angular_forms.ReactiveFormsModule,
                    ngFormly.FormlyBootstrapModule,
                    FormlyDatetimeMaskModule.forRoot(),
                    FormlySelectAsyncModule.forRoot(),
                    FormlyChipsModule.forRoot(),
                    ngFormly.FormlyModule.forRoot({
                        types: [
                            { name: 'datetime-mask', component: FormlyDateTimeMaskComponent },
                            { name: 'select-async', component: FormlySelectAsyncComponent },
                            { name: 'chips', component: FormlyChipsComponent },
                        ],
                    }),
                ],
                declarations: [],
                exports: MODULES
            },] },
];
FormlyComponentsRootModule.ctorParameters = function () { return []; };
var FormlyComponentsModule = (function () {
    function FormlyComponentsModule() {
    }
    FormlyComponentsModule.forRoot = function () {
        return { ngModule: FormlyComponentsRootModule };
    };
    return FormlyComponentsModule;
}());
FormlyComponentsModule.decorators = [
    { type: _angular_core.NgModule, args: [{ exports: MODULES },] },
];
FormlyComponentsModule.ctorParameters = function () { return []; };

exports.FormlyComponentsModule = FormlyComponentsModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
