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
  chipsCollection: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['Argentina', 'Brazil', 'Italy', 'France', 'Germany', 'China', 'USA', 'England', 'Japan', 'Portugal', 'Canada', 'Mexico', 'Spain']);
  selectCollection: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { name: 'ARG', value: 1 },
    { name: 'BR', value: 2 },
    { name: 'CH', value: 3 },
    { name: 'CL', value: 4 },
    { name: 'NZ', value: 5 }
  ]);

  constructor() {
  }

  ngOnInit() {
    this.JSON = (<any>window).JSON;
    this.model = {
      datetime: moment().format('DD-MM-YYYY HH:mm'),
      select: null,
      chips: "Argentina|Brazil|France",
      input1: "Arg",
      input2: null,
      checklist1: false,
      checklist2: true,
    }
    setTimeout(() => {
      this.selectCollection = new BehaviorSubject<any[]>([
        { name: 'ddd', value: 5 },
        { name: 'eee', value: 6 },
        { name: 'fff', value: 7 },
      ]);
      console.log(this.selectCollection);

    }, 2000);
  }

  formlyFields: FormlyFieldConfig[] = [
    {
      className: 'row',
      wrappers: ['card'],
      templateOptions: {
        title: 'Components',
        subtitle: 'Card #1',
      },
      fieldGroup: [
        {
          key: 'datetime',
          type: 'datetime',
          className: 'col-sm-3',
          templateOptions: {
            placeholder: 'Datetime',
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
          wrapper: [], //<-- in order to hide formly's default label
          templateOptions: {
            placeholder: 'Select',
            source: Observable.create(o => {
              let val = this.model.input1;
              this.selectCollection.first().subscribe(y => {
                o.next(y);
              });
              this.form.valueChanges.map(x => x.input1).filter(x => x != val).subscribe(x => {
                if (x != val) {
                  this.selectCollection.first().subscribe(y => {
                    val = x;
                    o.next(y);
                  });
                }
              });
            }),
            multiple: false,
            nonull: true
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          type: 'blank',
          className: 'col-xs-12',
        },
        {
          className: 'col-sm-3',
          key: 'chips',
          type: 'chips',
          templateOptions: {
            joinString: '|',
            source: this.chipsCollection,
            onlyAutocomplete: true,
            //maxItems: 5,
            placeholder: "Press enter to add value"
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          className: 'col-sm-3',
          key: 'input1',
          type: 'input',
          wrapper: [],
          templateOptions: {
            label: 'Input',
            source: this.chipsCollection,
            sourceFilter: (x) => {
              let arr = x.filter(x => x == 'Argentina');
              return arr;
            },
            format: (e: string) => e.trim().toUpperCase().replace(/(_|\W)+/g, '') // only uppercase alphanumeric allowed
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
      ],
    },
    {
      className: '',
      wrappers: ['card'],
      templateOptions: {
        title: 'More Components',
        subtitle: 'Card #2'
      },
      fieldGroup: [
        {
          className: 'col-sm-4',
          key: 'input2',
          type: 'input',
          wrapper: [],
          templateOptions: {
            label: 'Input',
            placeholder: 'E-mail',
          },
          validators: {
            validation: Validators.compose([Validators.email])
          }
        },
        {
          className: 'col-sm-4',
          key: 'textarea',
          type: 'textarea',
          wrapper: [],
          templateOptions: {
            label: 'Input',
            placeholder: 'Comments',
            maxLength: 5
          }
        },
        {
          className: 'col-sm-2',
          key: 'checklist1',
          type: 'checklist',
          wrapper: [],
          templateOptions: {
            text: 'Short text',
          }
        },
        {
          className: 'col-sm-2',
          key: 'checklist2',
          type: 'checklist',
          wrapper: [],
          templateOptions: {
            text: 'Some checklist with lots of text',
          }
        },
      ]
    },
    {
      className: 'row',
      type: 'repeated-section',
      key: 'repeated',
      wrappers: ['card'],
      templateOptions: {
        title: 'Repeated Section', 
        addText: 'Add Section',
        addIcon: 'fa fa-plus-square-o',
        removeText: 'Remove',
        removeIcon: 'fa fa-minus',
        class: null,
        canAdd: true,
        // maxSections: 3, Cantidad maxima que se puede agregar, en este caso de adjuntos
      },
      fieldArray: {
        className: 'row',
        fieldGroup: [
          {
            className: 'col-sm-6',
            key: 'checklist',
            type: 'checklist',
            wrapper: [],
            templateOptions: {
              text: "I'm inside a repeated section!",
            }
          },
        ]
      }
    }
  ];

  submit() {
    console.log(this.model);
  }

  cancel() {

  }

}
