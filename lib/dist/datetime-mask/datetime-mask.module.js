var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormlyDateTimeMaskComponent } from './datetime-mask.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
var FormlyDatetimeMaskModule = FormlyDatetimeMaskModule_1 = (function () {
    function FormlyDatetimeMaskModule() {
    }
    FormlyDatetimeMaskModule.forRoot = function () {
        return {
            ngModule: FormlyDatetimeMaskModule_1, providers: []
        };
    };
    return FormlyDatetimeMaskModule;
}());
FormlyDatetimeMaskModule = FormlyDatetimeMaskModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            TextMaskModule
        ],
        declarations: [FormlyDateTimeMaskComponent],
        exports: [FormlyDateTimeMaskComponent]
    })
], FormlyDatetimeMaskModule);
export { FormlyDatetimeMaskModule };
var FormlyDatetimeMaskModule_1;
//# sourceMappingURL=datetime-mask.module.js.map