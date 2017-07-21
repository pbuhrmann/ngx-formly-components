import { Component, OnInit, Input, EventEmitter, Output, ViewChild, DoCheck, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { MdAutocomplete } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ngx-material-chips',
  styles: [`
    md-chip {
      outline: none;
    }
  `],
  template: `
    <md-input-container>
      <input type="text" mdInput [formControl]="formControl" [mdAutocomplete]="autocomplete" (keyup.enter)="add()">
    </md-input-container>
    <md-autocomplete #autocomplete="mdAutocomplete">
      <md-option *ngFor="let option of filteredOptions" [value]="option" (click)="add(option)">
          {{ option }}
      </md-option>
    </md-autocomplete>
    <button md-icon-button (click)="add()"><i class="material-icons md-24">add</i></button>
    <md-chip-list>
      <md-chip *ngFor="let item of items">{{item}}
          <span (click)="remove(item)" class="fa fa-times" style="cursor: pointer"></span>
      </md-chip>
    </md-chip-list>
    `
})
export class NgxMaterialChipsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

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
    this.items = this.values;
    this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
      this.filteredOptions = this.filter(x);
      this.inputVal = x;
    });
  }

  filter(val: string): string[] {
    if (!this.options) {
      return null;
    }
    return this.options.filter(option => {
      if (!option) {
        return false;
      }
      if (!val) {
        return true;
      }
      option = option.toString();
      val = val.toString();
      return option.toLowerCase().indexOf(val.toLowerCase()) >= 0;
    }).filter(x => {
      if (!this.items) {
        return true;
      }
      return this.items.indexOf(x) == -1;
    });
  }

  add() {
    let val = this.inputVal;
    this.formControl.setValue(null);
    if (this.items && val) {
      if (this.items.indexOf(val) == -1) {
        if (this.onlyAutocomplete && this.options.indexOf(val) == -1) {
          return;
        }
        this.items.push(val);
        this.filteredOptions = this.filter(null);
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
