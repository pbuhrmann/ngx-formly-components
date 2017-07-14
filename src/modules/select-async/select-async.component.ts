import { Component, DoCheck, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from 'ng-formly';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Rx';
import { SelectComponent } from 'ng2-select';

@Component({
  selector: 'formly-select',
  styles: [`
  .input-group {
        margin-bottom: 15px;
  }

  :host /deep/ .ui-select-choices {
      display: block !important;
  }

  :host /deep/ .ui-select-toggle .dropdown-toggle {
      float: right;
  }

  :host /deep/ .ui-select-toggle.caret-hidden .dropdown-toggle {
      display: none;
  }
  `],
  template: `
  <div [formGroup]="form">
    <label for="key" style="display: inline-block;">{{ to.label }}</label>
    <div class="header-search">
        <ng-select #mySelect [allowClear]="true" [disabled]="disabled" [items]="items" [active]="selectedItem" (selected)="selected($event)" [placeholder]="placeholder" [ngClass]="{'form-control-danger': valid}">
        </ng-select>
    </div>
  </div>
  `
})
export class FormlySelectAsyncComponent extends Field implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mySelect') mySelect: SelectComponent;

  items: any[] = [];
  selectedItem: any;
  placeholder: string;
  sub_items: Subscription;
  disabled: boolean = false;

  ngOnInit() {
    this.sub_items = (<any>this.to).options.filter((x: any) => x != null).subscribe((x: any) => {
      this.items = x.map((x: any) => {
        return {
          text: x.name,
          id: x.id
        }
      });
    });
    this.isDisabled();
  }

  selected(e: any): void {
    this.formControl.setValue(e.id);
  }

  isDisabled() {
    this.disabled = this.to.disabled || !!this.to.isDisabled && this.to.isDisabled(this.formControl.value);
  }

  ngAfterViewInit() {    
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
  }

  ngOnDestroy() {
    this.sub_items && this.sub_items.unsubscribe();
  }
}
