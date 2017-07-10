import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from 'ng-formly';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model: any;
  form: FormGroup = new FormGroup({});
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
            type: 'text',
            label: 'Fecha'
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
      ],
    },
    {
      fieldGroup: [
        {
          key: 'fecha5',
          type: 'datetime-mask',
          className: 'col-sm-6',
          templateOptions: {
            type: 'text',
            label: 'Fecha'
          }
        },
        {
          key: 'fecha6',
          type: 'datetime-mask',
          className: 'col-sm-6',
          templateOptions: {
            type: 'text',
            label: 'Fecha'
          }
        }
      ]
    }
  ]
}
