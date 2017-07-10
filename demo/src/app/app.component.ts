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
      fecha2: new Date().setFullYear(2018),
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
            type: 'text',
            label: 'Fecha',
            format: 'DD-MM-YYYY HH:mm',
            mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]
          }
        },
        {
          key: 'fecha2',
          type: 'datetime-mask',
          className: 'col-sm-6',
          templateOptions: {
            label: 'Fecha'
          }
        }
      ],
    },
    {
      fieldGroup: [
        {
          key: 'select1',
          type: 'select-async',
          className: 'col-sm-3',
          templateOptions: {
            label: 'Lista',
            options: <any>new Observable<any>(o => {
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
          key: 'fecha3',
          type: 'datetime-mask',
          className: 'col-sm-3',
          templateOptions: {
            type: 'text',
            label: 'Fecha'
          }
        }
      ]
    }
  ]
}
