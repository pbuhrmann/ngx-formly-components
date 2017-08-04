import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ngx-material-select',
  styles: [`

  `],
  template: `
    <md-select [disabled]="disabled" style="width: 70%" [placeholder]="placeholder" [(ngModel)]="value" (change)="changed($event)" name="select-list" [multiple]="multiple">
      <md-option *ngFor="let item of items" [value]="item.value">{{item.name}}</md-option>
    </md-select>
    <button md-icon-button *ngIf="!nonull" (click)="clear()"><i class="material-icons md-24">clear</i></button>
    `
})
export class NgxMaterialSelectComponent implements OnInit {

  @Input() value: any = null;
  @Input() items: { name: string, value: any }[] = [];
  @Input() placeholder: string = "";
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;
  @Input() nonull: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  changed(e: any) {
    if (e) {
      this.change.emit(e.value);
    }
  }

  clear() {
    if (this.nonull) {
      return;
    }
    this.value = null;
    this.change.emit(null);
  }

}
