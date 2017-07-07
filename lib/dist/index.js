"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var ng_formly_1 = require("ng-formly");
var datetime_mask_component_1 = require("./datetime-mask/datetime-mask.component");
var datetime_mask_component_2 = require("./datetime-mask/datetime-mask.component");
exports.FormlyDateTimeMaskComponent = datetime_mask_component_2.FormlyDateTimeMaskComponent;
var FormlyComponentsModule = FormlyComponentsModule_1 = (function () {
    function FormlyComponentsModule() {
    }
    FormlyComponentsModule.forRoot = function () {
        return {
            ngModule: FormlyComponentsModule_1,
            providers: []
        };
    };
    return FormlyComponentsModule;
}());
FormlyComponentsModule = FormlyComponentsModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            ng_formly_1.FormlyBootstrapModule,
            ng_formly_1.FormlyModule.forRoot({
                types: [
                    { name: 'datetime-mask', component: datetime_mask_component_1.FormlyDateTimeMaskComponent }
                ],
            }),
        ],
        declarations: [
            datetime_mask_component_1.FormlyDateTimeMaskComponent
        ],
        exports: [
            datetime_mask_component_1.FormlyDateTimeMaskComponent
        ]
    })
], FormlyComponentsModule);
exports.FormlyComponentsModule = FormlyComponentsModule;
var FormlyComponentsModule_1;
