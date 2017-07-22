import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from 'ng-formly';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  JSON: any;
  model: any;
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
      datetime: moment().format('DD-MM-YYYY HH:mm'),
      select: 1,
      chips: "Argentina|Brazil|France",
      "formatted-input": null
    }
  }

  ngOnInit() {
  }

  formlyFields: FormlyFieldConfig[] = [
    {
      className: 'row',
      fieldGroup: [
        {
          key: 'datetime',
          type: 'datetime',
          className: 'col-sm-3',
          templateOptions: {
            label: 'Datetime',
            format: 'DD-MM-YYYY HH:mm',
            text_today: 'Today',
            mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]
          },
          validators: {
            validation: Validators.compose([(e) => {
              if (!e.value) {
                return { datetime: 'invalid' };
              }
              let valid = moment(e.value, 'DD-MM-YYYY HH:mm').isSameOrBefore(moment());
              valid = valid && e.value.indexOf('_') == -1;
              return valid ? null : { datetime: 'invalid' }
            }])
          }
        },
        {
          key: 'select',
          type: 'select',
          className: 'col-sm-3',
          wrapper: [],
          templateOptions: {
            label: 'Select',
            source: this.selectCollection,
            multiple: false,
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          className: 'col-sm-3',
          key: 'chips',
          type: 'chips',
          templateOptions: {
            label: 'Chips',
            joinString: '|',
            source: this.chipsCollection,
            onlyAutocomplete: true,
            maxItems: 15
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          className: 'col-sm-3',
          key: 'formatted-input',
          type: 'formatted-input',
          templateOptions: {
            label: 'Formatted-input',
            format: (e: string) => e.trim().toUpperCase().replace(/(_|\W)+/g, '') // alphanumeric
          },
          validators: {
            validation: Validators.compose([Validators.required])
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
