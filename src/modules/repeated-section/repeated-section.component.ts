import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType } from 'ng-formly';
declare var require: any;
var clone: any = require('clone');

@Component({
  selector: 'formly-repeated-section',
  template: `
    <div *ngFor="let control of mycontrols; let i = index;">
        <formly-form [model]="model[i]" [fields]="fields(i)" [options]="newOptions" [form]="this.formControl.at(i)" [ngClass]="field.fieldArray.className">
        </formly-form>
        <br>
        <div class="col-xs-12" style="margin-top: 10px">
          <button md-raised-button *ngIf="to['canRemove']" color="warn" (click)="remove(i)">
            <i class="material-icons">remove</i>
            {{to['removeText'] || 'Quitar'}}
          </button>
          <hr>
        </div>
    </div>
    <div class="col-xs-12">
      <button md-raised-button color="primary" *ngIf="to['canAdd'] && (to['maxSections'] ? to['maxSections'] > sectionsNumber : true)" (click)="add()">
        <i class="material-icons">add</i>
        {{to['addText'] || 'Agregar'}}
      </button>
    </div>
  `,
  styles: [`
    :host {
        width: 100%;
    }
  `]
})
export class FormlyRepeatedSectionComponent extends FieldType implements OnInit {
  public _fields = [];
  public sectionsNumber: number = 0;
  public mycontrols: any;

  get newOptions() {
    return this.clone(this.options);
  }

  public ngOnInit() {
    this.mycontrols = (<any>this.formControl).controls;
    if (this.model) {
      this.model.map(() => {
        this.sectionsNumber++;
        (<FormArray>this.formControl).push(new FormGroup({}));
        let fieldGroup = clone(this.field.fieldArray.fieldGroup);
        let length = this._fields.push(fieldGroup);
        this.field.fieldArray.fieldGroup.forEach((campo, i) => {
          this._fields[length - 1][i].templateOptions = campo.templateOptions;
        });
      });
    }
  }

  public add() {
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
    this.sectionsNumber--;
    (<FormArray>this.formControl).removeAt(i);
    this.model.splice(i, 1);
    this._fields.splice(i, 1);
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