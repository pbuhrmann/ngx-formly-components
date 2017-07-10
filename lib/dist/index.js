var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { FormlyDateTimeMaskComponent } from './datetime-mask/datetime-mask.component';
import { FormlyDatetimeMaskModule } from './datetime-mask/datetime-mask.module';
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
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            FormlyBootstrapModule,
            FormlyDatetimeMaskModule.forRoot(),
            FormlyModule.forRoot({
                types: [
                    { name: 'datetime-mask', component: FormlyDateTimeMaskComponent }
                ],
            }),
        ],
        declarations: [],
        exports: [
            FormlyBootstrapModule,
            FormlyModule,
            FormlyDatetimeMaskModule
        ]
    })
], FormlyComponentsModule);
export { FormlyComponentsModule };
var FormlyComponentsModule_1;
//# sourceMappingURL=index.js.map