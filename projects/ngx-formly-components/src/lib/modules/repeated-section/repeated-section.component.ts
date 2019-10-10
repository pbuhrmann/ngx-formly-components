import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FieldArrayType } from '@ngx-formly/core';
declare var require: any;
var clone: any = require('lodash.clonedeep');

@Component({
  selector: 'formly-repeated-section',
  styles: [`
    :host {
        width: 100%;
    }
  `],
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index;" style="position: relative; display: table; width: 100%">
        <formly-group [field]="field" [form]="formControl" [ngClass]="field.className">
        </formly-group>
        <div class="removeSectionBtn mat-raised-button mat-warn" [matTooltip]="to.removeText" matTooltipPosition="below" *ngIf="to.canRemove" (click)="remove(i)" style="position: absolute;top: -15px; right: 0px; background: #f44336; color: #fff; padding: 0px; height: 20px; min-width: 20px; cursor: pointer; line-height: normal;">
          <i class="material-icons" style="font-size: 20px">close</i>
        </div>
    </div>
    <div class="col-xs-12" *ngIf="to.canAdd && (to.maxSections ? to.maxSections > sectionsNumber : true)">
      <button mat-raised-button color="primary" (click)="add()" style="margin-top: 5px">
        <i class="material-icons">add</i>
        {{to.addText || 'Add'}}
      </button>
    </div>
  `
})
export class FormlyRepeatedSectionComponent extends FieldArrayType implements OnInit {
  public _fields = [];
  public sectionsNumber: number = 0;
  public mycontrols: any;

  get newOptions() {
    return clone(this.options);
  }

  public ngOnInit() {
    // this.mycontrols = (<any>this.formControl).controls;
    this.sectionsNumber++;
    (<FormArray>this.formControl).push(new FormGroup({}));
    let fieldGroup = clone(this.field.fieldArray.fieldGroup);
    let length = this._fields.push(fieldGroup);
    this.field.fieldArray.fieldGroup.forEach((campo, i) => {
      this._fields[length - 1][i].templateOptions = campo.templateOptions;
    });
  }

  public add() {
    if (this.field.formControl.disabled) {
      return;
    }
    this.sectionsNumber++;
    super.add();
  }

  public remove(i) {
    if (this.formControl.disabled) {
      return;
    }
    let result = true;
    if (this.to.removeWarning) {
      result = confirm(this.to.removeWarning);
    }
    if (result === true) {
      this.sectionsNumber--;
      super.remove(i);
    }
  }

  private clone(value) {
    if (!this.isObject(value)) {
      return value;
    }
    return Array.isArray(value) ? value.slice(0) : Object.assign({}, value);
  }

  private isObject(x) {
    return x != null && typeof x === 'object';
  }
}