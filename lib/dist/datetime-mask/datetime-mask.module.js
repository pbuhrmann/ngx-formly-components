import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormlyDateTimeMaskComponent } from './datetime-mask.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
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
export { FormlyDatetimeMaskModule };
FormlyDatetimeMaskModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    TextMaskModule
                ],
                declarations: [FormlyDateTimeMaskComponent],
                exports: [FormlyDateTimeMaskComponent],
                entryComponents: [FormlyDateTimeMaskComponent]
            },] },
];
/** @nocollapse */
FormlyDatetimeMaskModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datetime-mask.module.js.map