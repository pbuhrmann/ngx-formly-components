import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { FormlyChipsModule } from './chips/chips.module';
import { FormlyChipsComponent } from './chips/chips.component';
import { FormlyDatetimeMaskModule } from './datetime-mask/datetime-mask.module';
import { FormlyDateTimeMaskComponent } from './datetime-mask/datetime-mask.component';
import { FormlySelectAsyncModule } from './select-async/select-async.module';
import { FormlySelectAsyncComponent } from './select-async/select-async.component';
var MODULES = [
    FormlyBootstrapModule,
    FormlyModule,
    FormlyDatetimeMaskModule,
    FormlySelectAsyncModule,
    FormlyChipsModule
];
var FormlyComponentsRootModule = (function () {
    function FormlyComponentsRootModule() {
    }
    return FormlyComponentsRootModule;
}());
export { FormlyComponentsRootModule };
FormlyComponentsRootModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FormlyBootstrapModule,
                    FormlyDatetimeMaskModule.forRoot(),
                    FormlySelectAsyncModule.forRoot(),
                    FormlyChipsModule.forRoot(),
                    FormlyModule.forRoot({
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
export { FormlyComponentsModule };
FormlyComponentsModule.decorators = [
    { type: NgModule, args: [{ exports: MODULES },] },
];
FormlyComponentsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=formly-components.module.js.map