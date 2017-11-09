import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType } from 'ng-formly';
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
    <div *ngFor="let control of mycontrols; let i = index;" style="position: relative; display: table; width: 100%">
        <formly-form [fields]="fields(i)" [options]="newOptions" [form]="this.formControl.at(i)" [ngClass]="field.fieldArray.className">
        </formly-form>
        <div class="removeSectionBtn mat-raised-button mat-warn" [mdTooltip]="to.removeText" mdTooltipPosition="below" *ngIf="to.canRemove" (click)="remove(i)" style="position: absolute;top: -15px; right: 0px; background: #f44336; color: #fff; padding: 0px; height: 20px; min-width: 20px; cursor: pointer; line-height: normal;">
          <i class="material-icons" style="font-size: 20px">close</i>
        </div>
    </div>
    <div class="col-xs-12" *ngIf="to.canAdd && (to.maxSections ? to.maxSections > sectionsNumber : true)">
      <button md-raised-button color="primary" (click)="add()" style="margin-top: 5px">
        <i class="material-icons">add</i>
        {{to.addText || 'Add'}}
      </button>
    </div>
  `
})
export class FormlyRepeatedSectionComponent extends FieldType implements OnInit {
  public _fields = [];
  public sectionsNumber: number = 0;
  public mycontrols: any;

  get newOptions() {
    return clone(this.options);
  }

  public ngOnInit() {
    this.mycontrols = (<any>this.formControl).controls;
    this.sectionsNumber++;
    (<FormArray>this.formControl).push(new FormGroup({}));
    let fieldGroup = clone(this.field.fieldArray.fieldGroup);
    let length = this._fields.push(fieldGroup);
    this.field.fieldArray.fieldGroup.forEach((campo, i) => {
      this._fields[length - 1][i].templateOptions = campo.templateOptions;
    });
  }

  public add() {
    if (this.formControl.disabled) {
      return;
    }
    this.sectionsNumber++;
    if (this.to.class) {
      this.model.push(new this.to.class());
    } else {
      this.model.push({});
    }
    let fieldGroup = clone(this.field.fieldArray.fieldGroup);
    let largo = this._fields.push(fieldGroup);
    this.field.fieldArray.fieldGroup.forEach((campo, i) => {
      this._fields[largo - 1][i].templateOptions = campo.templateOptions;
    });
    (<FormArray>this.formControl).push(new FormGroup({}));
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
      (<FormArray>this.formControl).removeAt(i);
      this.model.splice(i, 1);
      this._fields.splice(i, 1);
    }
  }

  public fields(i) {
    if (this._fields[i]) {
      return this._fields[i];
    }

    this._fields.splice(i, 0, this.field.fieldArray.fieldGroup);

    return this._fields[i];
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