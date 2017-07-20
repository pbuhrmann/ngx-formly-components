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

  @Input() options = [];
  @Input() value;
  @Output() changed = new EventEmitter<any>();
  @ViewChild('autocomplete') autocomplete: MdAutocomplete;

  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  inputVal: string;
  option: any = null;
  items: any[] = [];

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.startWith(null).map(val => val ? this.filter(val) : this.options.slice());
    this.myControl.valueChanges.subscribe(x => {
      this.inputVal = x;
    })
  }

  filter(val: string): string[] {
    return this.options.filter(option => new RegExp(`^${val}`, 'gi').test(option));
  }

  add() {
    if (this.inputVal) {
      if (this.items.indexOf(this.inputVal) == -1) {
        this.items.push(this.inputVal);
      }
      this.myControl.setValue(null);
    }
  }

  remove(e) {
    console.log(e);
    this.items = this.items.filter(x => {
      return x != e;
    });
  }

}
