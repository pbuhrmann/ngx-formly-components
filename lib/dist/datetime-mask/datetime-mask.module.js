"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var datetime_mask_component_1 = require("./datetime-mask.component");
var forms_1 = require("@angular/forms");
var DatetimeMaskModule = DatetimeMaskModule_1 = (function () {
    function DatetimeMaskModule() {
    }
    DatetimeMaskModule.forRoot = function () {
        return {
            ngModule: DatetimeMaskModule_1, providers: []
        };
    };
    return DatetimeMaskModule;
}());
DatetimeMaskModule = DatetimeMaskModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        declarations: [datetime_mask_component_1.FormlyDateTimeMaskComponent],
        exports: [datetime_mask_component_1.FormlyDateTimeMaskComponent]
    })
], DatetimeMaskModule);
exports.DatetimeMaskModule = DatetimeMaskModule;
var DatetimeMaskModule_1;
