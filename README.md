# Installation

```
npm install ngx-formly-components
```

# Usage

`app.module.ts`
```
import { FormlyComponentsModule } from 'ngx-formly-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ...
    BrowserAnimationsModule,
    FormlyComponentsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

`app.component.html`
```
<div class="container">
    <formly-form [model]="model" [fields]="formlyFields" [form]="form">
    </formly-form>
    <br>
    <div class="col-sm-12">
        <button type="button" (click)="submit()" class="btn btn-primary" [disabled]="!form.valid"><i class="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
        <button type="button" (click)="cancel()" class="btn btn-secondary"><i class="fa fa-times" aria-hidden="true"></i> Cancel</button>
    </div>
    <br> 
    Model:
    <br>
    <textarea disabled rows="15" cols="4" style="width: 90%">{{JSON.stringify(model, null, 2)}}</textarea>
</div>
```

`app.component.ts`
```
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
  ];

  submit() {
    console.log(this.model);
  }

  cancel() {

  }

}

```

# Components
### Datetime
#### Formly type: `'datetime'`
---
Input | Type | Example
--- | --- | ---
*@Input() mask* | `(string|RegExp)[]` | `[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]`
*@Input() format* | `string` | `'DD-MM-YYYY HH:mm'`
*@Input() txt_today* | `string` | `Fecha de Hoy`

### Select
#### Formly type: `'select'`
---
Input | Type | Example
--- | --- | ---
*source* | `BehaviorSubject<string[]>` | `new BehaviorSubject<any[]>([{ name: 'ARG', value: 1 },{ name: 'BR', value: 2 }]);`
*multiple* | `boolean` | `true`

### Chips
#### Formly type: `'chips'`
---
Input | Type | Example
--- | --- | ---
*source* | `BehaviorSubject<string[]>` | `new BehaviorSubject<any[]>(['Cheese', 'Apple', 'Pie']);`
*maxItems* | `BehaviorSubject<string[]>` | `new BehaviorSubject<any[]>([{ name: 'ARG', value: 1 },{ name: 'BR', value: 2 }]);`
*onlyAutocomplete* | `boolean` | `true`

### Formatted-input
#### Formly type: `'formatted-input'`
---
Input | Type | Example
--- | --- | ---
*format* | `(val: string) => string` | `(e: string) => e.trim().toUpperCase().replace(/(_|\W)+/g, '')`
*placeholder* | `string` | `Only alphanumeric allowed`



