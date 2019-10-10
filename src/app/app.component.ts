import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import * as clone from 'lodash.clonedeep';
// import { GeoService } from 'geo-cod-ref';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  JSON: any;
  model: any;
  options: any = {};
  form: FormGroup = new FormGroup({});
  typesCollection: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { name: 'Type 1', value: 1 },
    { name: 'Type 2', value: 2 },
    { name: 'Type 3', value: 3 },
  ]);
  subtypesCollection: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { _name: 'Fever', value: 1, type: 1, priority: 1 },
    { _name: 'Cough', value: 2, type: 1, priority: 1 },
    { _name: 'Hypotension', value: 3, type: 1, priority: 2 },
    { _name: 'Dizziness', value: 4, type: 2, priority: 2 },
    { _name: 'Hypertension', value: 5, type: 2, priority: 3 },
    { _name: 'Chest pain', value: 6, type: 2, priority: 3 },
    { _name: 'Coughing blood', value: 7, type: 3, priority: 3 },
    { _name: 'Bleeding foot', value: 8, type: 3, priority: 3 },
    { _name: 'Overdose', value: 9, type: 3, priority: 3 },
    { _name: 'Constipation', value: 10, type: 3, priority: 3 },
  ]);
  subtypesCollection_filtered: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  prioritiesCollection: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { name: 'Low', value: 0 },
    { name: 'Normal', value: 1 },
    { name: 'High', value: 2 },
  ]);
  animalsCollection: BehaviorSubject<{ name: string, value: string | number }[]> = new BehaviorSubject<{ name: string, value: string | number }[]>([
    { name: 'Horse', value: 1 },
    { name: 'Cow', value: 2 },
    { name: 'Dog', value: 3 },
    { name: 'Bird', value: 4 },
    { name: 'Fish', value: 5 },
    { name: 'Cat', value: 6 },
    { name: 'Wolf', value: 7 }
  ]);
  /*animalsCollection2: BehaviorSubject<{ name: string, value: string | number }[]> = new BehaviorSubject<{ name: string, value: string | number }[]>([
    { data: { name: 'Fish', value: 5 } },
    { data: { name: 'Cow', value: 2 } },
    { data: { name: 'Bird', value: 4 } }
  ]);*/
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(/*private geoService: GeoService*/) {
  }

  ngOnInit() {
    this.JSON = (<any>window).JSON;
    this.model = {
      datetime: moment().format('DD-MM-YYYY HH:mm'),
      //type: 2,
      subtype: {
        "name": "Cough",
        "value": 2,
        "type": 1,
        "priority": 1
      },
      //priority: { name: 'High', value: 2 },
      chips: [{ name: 'Cat', value: 7, active: false }, { name: 'Bird', value: 4, active: true }],
      input1: "Something something something",
      autocomplete: { name: 'Cat', value: 7 },
      input2: null,
      checklist1: null,
      checklist2: true,
      textarea: "This is a comment",
      address: "Eva Peron 400",
      radioGroup: { name: 'Fish', value: 5 },
      selectAutocomplete: { name: 'Fish', value: 5 },
      checklistGroup: [/*{ name: 'Cow', value: 2 }, { name: 'Fish', value: 5 }*/],
      repeated: []
    }

    //setTimeout(() => { this.form.reset() }, 3000);
    //setTimeout(() => { this.form.disable() }, 3000);
  }

  ngAfterViewInit() {
    this.model = {
      datetime: moment().format('DD-MM-YYYY HH:mm'),
      //type: 2,
      subtype: {
        "name": "Cough",
        "value": 2,
        "type": 1,
        "priority": 1
      },
      //priority: { name: 'High', value: 2 },
      chips: [{ name: 'Cat', value: 7, active: false }, { name: 'Bird', value: 4, active: true }],
      input1: "Something something something",
      autocomplete: { name: 'Cat', value: 7 },
      input2: null,
      checklist1: null,
      checklist2: true,
      textarea: "This is a comment",
      address: "Eva Peron 400",
      radioGroup: { name: 'Fish', value: 5 },
      selectAutocomplete: { name: 'Fish', value: 5 },
      checklistGroup: [],
      repeated: [{
        "chips": [
          {
            "name": "Horse",
            "value": 1
          }
        ],
        "checklist": null,
        "name": 'Test'
      }]
    }
    this.options.resetModel(this.model);
    setTimeout(() => {
      let c = clone(this.model);
      c.checklistGroup = [{ name: 'Cow', value: 2 }, { name: 'Fish', value: 5 }];
      this.options.resetModel(c);
    }, 2000);

  }

  // formlyFields: FormlyFieldConfig[] = [
  //   {
  //     className: '',
  //     wrappers: ['x-section'],
  //     templateOptions: {
  //       title: 'Components',
  //       background: '#3f51b5',
  //       color: 'rgba(255, 255, 255, 0.87)',
  //     },
  //     fieldGroup: [
  //       {
  //         key: 'datetime',
  //         type: 'x-datetime',
  //         className: 'col-sm-3',
  //         templateOptions: {
  //           placeholder: 'Datetime',
  //           tooltip: 'Today',
  //           format: 'DD-MM-YYYY HH:mm',
  //           mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]
  //         },
  //         validators: {
  //           validation: Validators.compose([(e) => {
  //             if (!e.value) {
  //               return { datetime: 'invalid' };
  //             }
  //             let valid = moment(e.value, 'DD-MM-YYYY HH:mm').isSameOrBefore(moment());
  //             valid = valid && e.value.indexOf('_') == -1;
  //             return valid ? null : { datetime: 'invalid' }
  //           }])
  //         }
  //       },
  //     ]
  //   }
  // ]

  formlyFields: FormlyFieldConfig[] = [
    {
      className: '',
      wrappers: ['x-section'],
      templateOptions: {
        title: 'Components',
        background: '#3f51b5',
        color: 'rgba(255, 255, 255, 0.87)',
      },
      fieldGroup: [
        {
          key: 'datetime',
          type: 'x-datetime',
          className: 'col-sm-3',
          templateOptions: {
            placeholder: 'Datetime',
            tooltip: 'Today',
            format: 'DD-MM-YYYY HH:mm',
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
          className: 'col-sm-3',
          key: 'type',
          type: 'x-select',
          wrappers: [],
          templateOptions: {
            placeholder: 'Type',
            source: this.typesCollection,
            mapFn: (e) => {
              return e && e.value ? e.value : e;
            },
            initialized: (e) => {
              console.log(e);
              if (e) {
                let list = this.subtypesCollection.value.filter(x => x.type == e);
                this.subtypesCollection_filtered.next(list);
              }
            },
            changed: (e) => {
              if (e) {
                let list = this.subtypesCollection.value.filter(x => x.type == e);
                this.subtypesCollection_filtered.next(list);
              }
            }
          }
        },
        {
          className: 'col-sm-3',
          key: 'subtype',
          type: 'x-select-autocomplete',
          wrappers: [],
          templateOptions: {
            placeholder: 'Subtype',
            source: this.subtypesCollection_filtered,
            mapFn: (e) => e && e.value ? e.value : e,
            displayFn: (e) => e && e._name ? e._name : null,
            displayExtraFn: (e) => e && e.priority ? e.priority : null,
            convertOutput: false
          }
        },
        {
          className: 'col-sm-3',
          key: 'priority',
          type: 'x-select',
          wrappers: [],
          templateOptions: {
            placeholder: 'Priority',
            source: this.prioritiesCollection,
            mapFn: (e) => {
              return e && e.value != null ? e.value : e;
            }
          }
        },
        {
          type: 'x-blank',
          className: 'col-xs-12',
        },
        {
          className: 'col-sm-3',
          key: 'chips',
          type: 'x-chips',
          templateOptions: {
            placeholder: "Chips",
            source: this.animalsCollection,
            onlyAutocomplete: true,
            maxItems: 10,
            /*mapFn: e => {
              return e && e.value ? e.value : e;
            },*/
            filterFn: e => {
              return e && e.filter(x => x.active !== false);
            }
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          className: 'col-sm-3',
          key: 'input1',
          type: 'x-input',
          wrappers: [],
          templateOptions: {
            placeholder: 'Input',
            disabled: false,
            source: this.animalsCollection.pipe(map(x => x.map(y => y.name))),
            format: (e: string) => e.trim().toUpperCase().replace(/(_|\W)+/g, ''), // convert to uppercase alphanumeric
            maxLength: 10
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          className: 'col-sm-3',
          key: 'autocomplete',
          type: 'x-autocomplete',
          wrappers: [],
          templateOptions: {
            placeholder: 'Autocomplete',
            tooltip: 'right',
            source: (e: string) => {
              return new Observable(o => {
                let list = this.animalsCollection.value.filter(x => e ? x.name.toLowerCase().indexOf(e.toLowerCase()) >= 0 : true);
                o.next(list);
              });
            },
            debounceTime: 10
          }
        },
        {
          className: 'col-sm-12',
          type: 'x-blank'
        },
        // {
        //   className: 'col-sm-6',
        //   key: 'geo-address',
        //   type: 'x-search',
        //   wrappers: [],
        //   templateOptions: {
        //     placeholder: 'Search',
        //     source: (e: string) => {
        //       return this.geoService.georeferenciar({
        //         direccion: e
        //       })
        //     },
        //     inputDisplay: (e) => {
        //       return e && e.nombre && e.numero && e.localidad && e.partido ? e.nombre + ' ' + e.numero + ', ' + e.localidad + ', ' + e.partido : e;
        //     },
        //     optionDisplay: (e) => {
        //       return e && e.nombre && e.numero && e.localidad && e.partido ? e.nombre + ' ' + e.numero + ', ' + e.localidad + ', ' + e.partido : null;
        //     },
        //     searchFilter: (e) => {
        //       return e && e.nombre && e.numero && e.localidad && e.partido;
        //     },
        //     setValue: (e) => {
        //       return e && e.nombre && e.numero && e.localidad && e.partido ? e.nombre + ' ' + e.numero + ', ' + e.localidad + ', ' + e.partido : e;
        //     },
        //     tooltip: 'right',
        //     debounceTime: 500
        //   }
        // },
      ],
    },
    {
      className: '',
      wrappers: ['x-section'],
      templateOptions: {
        title: 'More Components',
        background: '#3f51b5',
        color: 'rgba(255, 255, 255, 0.87)',
      },
      fieldGroup: [
        {
          className: 'col-sm-4',
          key: 'input2',
          type: 'x-input',
          wrappers: [],
          templateOptions: {
            label: 'Input',
            placeholder: 'E-mail',
            keydown: (e) => {
              console.log(e);
            },
          },
          validators: {
            validation: Validators.compose([Validators.email])
          }
        },
        {
          className: 'col-sm-4',
          key: 'textarea',
          type: 'x-textarea',
          wrappers: [],
          templateOptions: {
            label: 'Input',
            placeholder: 'Comments',
            maxLength: 30,
            maxRows: 4,
            keydown: (e, isShiftDown) => {
              console.log(e, `Shift: ${isShiftDown}`);
            },
          }
        },
        {
          className: 'col-sm-2',
          key: 'checklist1',
          type: 'x-checklist',
          wrappers: [],
          templateOptions: {
            text: 'Short text',
            defaultValue: true
          }
        },
        {
          className: 'col-sm-2',
          key: 'checklist2',
          type: 'x-checklist',
          wrappers: [],
          templateOptions: {
            text: 'Some checklist with lots of text',
          }
        },
        {
          type: 'x-blank',
          className: 'col-sm-12'
        },
        {
          className: 'col-sm-4',
          key: 'address',
          type: 'x-address-picker',
          wrappers: [],
          templateOptions: {
            placeholder: 'Address',
            tooltip: 'Open map',
            api_key: 'AIzaSyArmiw8_wiv9nLQTIqhjynQFE6Q5Pzpxyo',
            //components: 'country:AR|administrative_area:Buenos Aires', //https://en.wikipedia.org/wiki/ISO_3166-1 && https://developers.google.com/maps/documentation/geocoding/intro#ComponentFiltering
            mapCenterCoords: [-34.561253, -58.400155],
            tileLayerSource: 'http://190.210.64.181/osm/{z}/{x}/{y}.png',
            yes: 'Accept',
            no: 'Cancel',
            /*displayFn: (e) => {
              return e && e.formatted_address !== undefined ? e.formatted_address : e;
            }*/
            metadata: Observable.create(o => {
              o.next(`MONTE CHINGOLO, LANUS, BUENOS AIRES, ARGENTINA`);
            }),
            displayFn: (e) => {
              return this.addressDisplayfn(e);
            },
            optionDisplayFn: (e) => {
              return this.addressOptionDisplayfn(e);
            },
            location: (e) => {
              console.log('location', e);
            },
            response: (e) => {
              console.log('response', e);
            }
          }
        },
        {
          className: 'col-sm-2',
          key: 'radioGroup',
          type: 'x-radio-group',
          wrappers: [],
          templateOptions: {
            label: 'Animals',
            source: this.animalsCollection,
            mapFn: (e: any) => {
              return e && e.value ? e.value : e;
            },
          }
        },
        {
          className: 'col-sm-3',
          key: 'selectAutocomplete',
          type: 'x-select-autocomplete',
          wrappers: [],
          templateOptions: {
            placeholder: 'Select-Autocomplete',
            tooltip: 'right',
            source: this.animalsCollection
          }
        },
        {
          className: 'col-sm-3',
          key: 'checklistGroup',
          type: 'x-checklist-group',
          wrappers: [],
          templateOptions: {
            label: 'Animals',
            source: this.animalsCollection,
            float: true,
            mapFn: (e: any) => {
              return e && e.value ? e.value : e;
            },
            order: true
          }
        },
      ]
    },
    {
      className: '',
      type: 'x-repeated-section',
      key: 'repeated',
      wrappers: ['x-section'],
      templateOptions: {
        title: 'Repeated Section',
        addText: 'Add Section',
        addIcon: 'fa fa-plus-square-o',
        removeText: 'Remove',
        removeIcon: 'fa fa-minus',
        class: null,
        canAdd: true,
        canRemove: true,
        // maxx-Sections: 3,
        background: '#3f51b5',
        color: 'rgba(255, 255, 255, 0.87)',
      },
      fieldArray: {
        className: '',
        fieldGroup: [
          {
            className: 'col-sm-3',
            key: 'chips',
            type: 'x-chips',
            templateOptions: {
              source: this.animalsCollection,
              onlyAutocomplete: true,
              placeholder: "Press enter to add value",
              maxItems: 10
            }
          },
          {
            className: 'col-sm-3',
            key: 'checklist',
            type: 'x-checklist',
            wrappers: [],
            templateOptions: {
              text: "I'm inside a repeated section!",
            }
          },
          {
            className: 'col-sm-3',
            key: 'name',
            type: 'x-input',
            wrappers: [],
            templateOptions: {
              placeholder: 'Name',
              disabled: false,
            },
            validators: {
              validation: Validators.compose([Validators.required])
            }
          },
        ]
      }
    }
  ];

  addressDisplayfn(e: any) {
    let address = null;
    if (e && e.address_components && e.address_components.length > 1 && e.types && e.types.length > 0) {
      if (e.types[0] == 'street_address') {
        let number = e.address_components.filter(x => x.types[0] == 'street_number').map(x => x.long_name);
        let street = e.address_components.filter(x => x.types[0] == 'route').map(x => x.long_name);
        address = street && number ? `${street} ${number}` : street && !number ? `${street}` : e;
      }
      else if (e.types[0] == 'intersection') {
        address = e.formatted_address.split(',')[0];
      }
    }
    return address;
  }

  addressOptionDisplayfn(e: any) {
    let address = null;
    if (e && e.address_components && e.address_components.length > 1 && e.types && e.types.length > 0) {
      if (e.types[0] == 'street_address') {
        let number = e.address_components.filter(x => x.types[0] == 'street_number').map(x => x.long_name);
        let street = e.address_components.filter(x => x.types[0] == 'route').map(x => x.long_name);
        let locality = e.address_components.filter(x => x.types[0] == 'locality').map(x => x.long_name);
        address = street && number && locality ? `${street} ${number}, ${locality}` : street && !number ? `${street}` : e;
      }
      else if (e.types[0] == 'intersection') {
        address = e.formatted_address.split(',')[0];
      }
    }
    return address;
  }

  submit() {
    console.log(this.form.getRawValue());
  }

  cancel() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
