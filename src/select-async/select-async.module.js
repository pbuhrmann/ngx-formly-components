import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select/select/select.module';
import { FormlySelectAsyncComponent } from './select-async.component';
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
export { FormlySelectAsyncModule };
FormlySelectAsyncModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    SelectModule
                ],
                declarations: [FormlySelectAsyncComponent],
                exports: [FormlySelectAsyncComponent],
                entryComponents: [FormlySelectAsyncComponent]
            },] },
];
FormlySelectAsyncModule.ctorParameters = function () { return []; };
//# sourceMappingURL=select-async.module.js.map