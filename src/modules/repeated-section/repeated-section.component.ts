import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FormlyFormBuilder } from 'ng-formly';
import * as clonedeep from 'lodash.clonedeep';

@Component({
  selector: 'formly-repeated-section',
  styles: [`
    :host {
        width: 100%;
    }
  `],
  template: `
    <div *ngFor="let control of formControl.controls; let i = index;" style="position: relative; display: table; width: 100%">
      <formly-form
        [fields]="fields(i)"
        [options]="options"
        [form]="this.formControl.at(i)"
        [ngClass]="field.fieldArray.className">
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
  `,
})
export class FormlyRepeatedSectionComponent extends FieldType implements OnInit {
  formControl: FormArray;
  _fields = [];
  public sectionsNumber: number = 999;

  constructor(private builder: FormlyFormBuilder) {
    super();
  }

  get newFields() {
    return clonedeep(this.field.fieldArray.fieldGroup);
  }

  ngOnInit() {
    if (this.model) {
      this.model.map(() => this.add());
    }
  }

  add() {
    const form = new FormGroup({}),
      i = this._fields.length;

    if (!this.model[i]) {
      this.model.push({});
      this.sectionsNumber++;
    }

    this._fields.push(this.newFields);
    this.builder.buildForm(form, this._fields[i], this.model[i], this.options);
    this.formControl.push(form);
  }

  remove(i) {
    if (this.formControl.disabled) {
      return;
    }
    let result = true;
    if (this.to.removeWarning) {
      result = confirm(this.to.removeWarning);
    }
    if (result === true) {
      this.formControl.removeAt(i);
      this.model.splice(i, 1);
      this._fields.splice(i, 1);
      this.sectionsNumber--;
    }
  }

  fields(i) {
    if (this._fields[i]) {
      return this._fields[i];
    }

    this._fields.splice(i, 0, this.newFields);

    return this._fields[i];
  }
}