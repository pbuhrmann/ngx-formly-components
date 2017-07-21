import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { MdAutocomplete } from '@angular/material';

@Component({
  selector: 'ngx-material-chips',
  templateUrl: './ngx-material-chips.component.html',
  styleUrls: ['./ngx-material-chips.component.css']
})
export class NgxMaterialChipsComponent implements OnInit {

  @Input() values: string[] = [];
  @Input() options: string[] = [];
  @Input() maxItems: number = 1000;
  @Input() onlyAutocomplete: boolean = false;
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  formControl: FormControl = new FormControl();
  filteredOptions: any[];
  inputVal: string;
  option: any = null;
  items: any[] = [];

  constructor() { }

  ngOnInit() {
    this.items = this.values.slice();
    this.formControl.valueChanges.subscribe(x => {
      this.filteredOptions = this.filter(x);
      this.inputVal = x;
    });
  }

  filter(val: string): string[] {
    return this.options.filter(option => {
      if (!val || !option) {
        return false;
      }
      return option.toLowerCase().indexOf(val.toLowerCase()) >= 0;
    }).filter(x => {
      return this.items.indexOf(x) == -1;
    });
  }

  add() {
    let val = this.inputVal;
    this.formControl.setValue(null);
    if (val) {
      if (this.items.indexOf(val) == -1) {
        if (this.onlyAutocomplete && this.options.indexOf(val) == -1) {
          return;
        }
        this.items.push(val);
        this.changed.emit(this.items);
      }
    }
  }

  remove(e) {
    this.items = this.items.filter(x => {
      return x != e;
    });
    this.changed.emit(this.items);
  }

}
