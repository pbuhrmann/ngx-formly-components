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
import { Component, ViewChild } from '@angular/core';
import { Field } from 'ng-formly';
var FormlySelectAsyncComponent = (function (_super) {
    __extends(FormlySelectAsyncComponent, _super);
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
}(Field));
export { FormlySelectAsyncComponent };
FormlySelectAsyncComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-select',
                styles: ["\n  .input-group {\n        margin-bottom: 15px;\n  }\n\n  :host /deep/ .ui-select-choices {\n      display: block !important;\n  }\n\n  :host /deep/ .ui-select-toggle .dropdown-toggle {\n      float: right;\n  }\n\n  :host /deep/ .ui-select-toggle.caret-hidden .dropdown-toggle {\n      display: none;\n  }\n  "],
                template: "\n  <div [formGroup]=\"form\">\n    <label for=\"key\" style=\"display: inline-block;\">{{ to.label }}</label>\n    <div class=\"header-search\">\n        <ng-select #mySelect [allowClear]=\"true\" [disabled]=\"disabled\" [items]=\"items\" [active]=\"selectedItem\" (selected)=\"selected($event)\" [placeholder]=\"placeholder\" [ngClass]=\"{'form-control-danger': valid}\">\n        </ng-select>\n    </div>\n  </div>\n  "
            },] },
];
FormlySelectAsyncComponent.ctorParameters = function () { return []; };
FormlySelectAsyncComponent.propDecorators = {
    'mySelect': [{ type: ViewChild, args: ['mySelect',] },],
};
//# sourceMappingURL=select-async.component.js.map