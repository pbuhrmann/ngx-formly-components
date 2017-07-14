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
import { Component } from '@angular/core';
import { Field } from 'ng-formly';
import { Observable, Subject } from 'rxjs';
var FormlyChipsComponent = (function (_super) {
    __extends(FormlyChipsComponent, _super);
    function FormlyChipsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._model = [];
        _this.ngUnsubscribe = new Subject();
        _this.requestAutocompleteItems = function (text) {
            if (_this.suggestions && _this.suggestions.length > 0) {
                return Observable.of(_this.suggestions);
            }
            else {
                return Observable.of([]);
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
}(Field));
export { FormlyChipsComponent };
FormlyChipsComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-chips',
                styles: [],
                template: "\n  <div class=\"form-group\">\n    <div class=\"header-search\">\n        <label for=\"key\" style=\"display: inline-block;\">{{ to.label }}</label>\n        <tag-input [ngModel]=\"_model\" [secondaryPlaceholder]=\"to['placeholder'] ? to['placeholder'] : 'Add  values'\" [placeholder]=\"'+'\"\n            [maxItems]=\"to['maxItems']\" [onlyFromAutocomplete]=\"to['onlyFromAutocomplete'] || false\"\n            (onAdd)=\"onAdd($event)\" (onRemove)=\"onRemove($event)\" [onTextChangeDebounce]=\"500\">\n            <tag-input-dropdown [autocompleteObservable]=\"requestAutocompleteItems\" [focusFirstElement]=\"true\" [showDropdownIfEmpty]=\"true\">\n            </tag-input-dropdown>\n        </tag-input>\n        <small class=\"text-muted\">{{to.helpMessage || \"Press 'Enter' to add value\"}}</small>\n    </div>\n  </div>\n  ",
            },] },
];
FormlyChipsComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=chips.component.js.map