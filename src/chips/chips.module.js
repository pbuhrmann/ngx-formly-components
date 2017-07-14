import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { FormlyChipsComponent } from './chips.component';
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
export { FormlyChipsModule };
FormlyChipsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    TagInputModule
                ],
                declarations: [FormlyChipsComponent],
                exports: [FormlyChipsComponent]
            },] },
];
FormlyChipsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=chips.module.js.map