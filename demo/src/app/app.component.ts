import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from 'ng-formly';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  JSON: any;
  model: any = {
    fecha1: null
  };
  form: FormGroup = new FormGroup({});

  constructor() {
    this.JSON = (<any>window).JSON;
    this.model = {
      fecha1: new Date(),
      fecha2: new Date(new Date().setFullYear(2018)),
      select1: 3,
      fecha3: null
    }
  }

  formlyFields: FormlyFieldConfig[] = [
    {
      className: 'row',
      fieldGroup: [
        {
          key: 'fecha1',
          type: 'datetime-mask',
          className: 'col-sm-3',
          templateOptions: {
            label: 'Datetime Mask',
            format: 'DD-MM-YYYY HH:mm',
            mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]
          }
        },
        {
          key: 'select1',
          type: 'select-async',
          className: 'col-sm-3',
          templateOptions: {
            label: 'Select',
            options: Observable.create(o => {
              o.next([
                { id: 1, name: 'one' },
                { id: 2, name: 'two' },
                { id: 3, name: 'three' },
                { id: 4, name: 'four' },
              ])
            })
          }
        },
        {
          className: 'col-sm-3',
          key: 'chips1',
          type: 'chips',
          templateOptions: {
            label: 'Chips',
            joinString: '|',
            source: Observable.create(o => {
              o.next(['Argentina', 'Brazil', 'Italy', 'France', 'Germany', 'USA', 'England', 'Japan', 'Portugal', 'Canada', 'Mexico', 'Spain'])
            }),
            onlyFromAutocomplete: true,
            maxItems: 15
          }
        }
      ],
    },
    {
      className: 'row',
      fieldGroup: [

      ]
    }
  ]
}
