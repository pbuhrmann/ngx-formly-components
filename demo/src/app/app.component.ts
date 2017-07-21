import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from 'ng-formly';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  JSON: any;
  model: {
    fecha1: Date,
    select1: number,
    chips1: string
  };
  form: FormGroup = new FormGroup({});
  chipsCollection: BehaviorSubject<any> = new BehaviorSubject<any>(['Argentina', 'Brazil', 'Italy', 'France', 'Germany', 'China', 'USA', 'England', 'Japan', 'Portugal', 'Canada', 'Mexico', 'Spain']);
  selectCollection: BehaviorSubject<any> = new BehaviorSubject<any>([
    { name: 'ARG', value: 1 },
    { name: 'BR', value: 2 },
    { name: 'CH', value: 3 },
    { name: 'CL', value: 4 },
    { name: 'NZ', value: 5 }
  ]);

  constructor() {
    this.JSON = (<any>window).JSON;
    this.model = {
      fecha1: new Date(),
      select1: 3,
      chips1: "Argentina|Brazil|France"
    }
  }

  ngOnInit() {
  }

  formlyFields: FormlyFieldConfig[] = [
    {
      className: 'row',
      fieldGroup: [
        {
          key: 'fecha1',
          type: 'datetime',
          className: 'col-sm-3',
          templateOptions: {
            label: 'Datetime',
            format: 'DD-MM-YYYY HH:mm',
            mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]
          }
        },
        {
          key: 'select1',
          type: 'select',
          className: 'col-sm-3',
          templateOptions: {
            label: 'Select',
            source: this.selectCollection
          }
        },
        {
          className: 'col-sm-3',
          key: 'chips1',
          type: 'chips',
          templateOptions: {
            label: 'Chips',
            joinString: '|',
            source: this.chipsCollection,
            onlyAutocomplete: true,
            maxItems: 15
          }
        },
      ],
    },
    {
      className: 'row',
      fieldGroup: [

      ]
    }
  ]
}
