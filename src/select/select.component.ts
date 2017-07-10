import { Component, DoCheck, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from 'ng-formly';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Rx';
import { SelectComponent } from 'ng-select';

@Component({
  selector: 'formly-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.css', 'ng2-select.css']
})
export class FormlySelectAsyncComponent extends Field implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mySelect') mySelect: SelectComponent;

  items: any[] = [];
  placeholder: string;
  sub_items: Subscription;
  disabled: boolean = false;

  ngOnInit() {
    this.sub_items = (<any>this.to).options.filter(x => x != null).subscribe(x => {
      this.items = x.map(x => {
        return {
          label: x.name,
          value: x.id
        }
      });
    });
    this.isDisabled();
  }

  selected(e: any): void {
    this.formControl.setValue(e.value);
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
      if (item.value == this.formControl.value) {
        this.mySelect.select(item.value);
        break;
      }
    }
  }

  ngOnDestroy() {
    this.sub_items && this.sub_items.unsubscribe();
  }
}
