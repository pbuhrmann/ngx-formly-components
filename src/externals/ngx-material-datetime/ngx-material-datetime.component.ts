import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'ngx-material-datetime',
  templateUrl: './ngx-material-datetime.component.html',
  styleUrls: ['./ngx-material-datetime.component.css']
})
export class NgxMaterialDatetimeComponent implements OnInit {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() value: string = null;
  @Input() format: string = null;
  @Input() mask = null;
  @Input() title = "Today";
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  public formControl: FormControl = new FormControl();
  public autoCorrectedDatePipe: any;

  constructor() { }

  ngOnInit() {
    if (!this.format) {
      console.error('Format is missing: <ngx-material-datetime format="DD-MM-YYYY"></ngx-material-datetime>');
    }
    if (!this.mask) {
      console.error('Mask is missing: <ngx-material-datetime [mask]="[/\d/, /\d/, \' - \', /\d/, /\d/, \' - \', /\d/, /\d/, /\d/, /\d/, \' \', /\d/, /\d/, \':\', /\d/, /\d/]"></ngx-material-datetime>');
    }
    this.autoCorrectedDatePipe = this.createAutoCorrectedDateTimePipe(this.format);
    this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
      this.changed.emit(x);
    });
  }

  today() {
    this.value = moment().format(this.format);
  }

  createAutoCorrectedDateTimePipe(dateFormat: string) {
    return (conformedValue: any) => {
      const indexesOfPipedChars: any[] = [];
      const dateFormatArray: any = dateFormat.split(/[^DMYHms]+/);
      const maxValue: any = { 'DD': 31, 'MM': 12, 'YY': 99, 'YYYY': 9999, 'HH': 23, 'mm': 59, 'ss': 59 };
      const minValue: any = { 'DD': 1, 'MM': 1, 'YY': 0, 'YYYY': 1, 'HH': 0, 'mm': 0, 'ss': 0 };
      const conformedValueArr: any = conformedValue.split('');

      // Check first digit
      dateFormatArray.forEach((format: any) => {
        const position = dateFormat.indexOf(format);
        const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

        if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
          conformedValueArr[position + 1] = conformedValueArr[position];
          conformedValueArr[position] = 0;
          indexesOfPipedChars.push(position);
        }
      });

      // Check for invalid date
      const isInvalid = dateFormatArray.some((format: any) => {
        const position: any = dateFormat.indexOf(format);
        const length: any = format.length;
        const textValue: any = conformedValue.substr(position, length).replace(/\D/g, '');
        const value: any = parseInt(textValue, 10);

        return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
      });

      if (isInvalid) {
        return false;
      }

      return {
        value: conformedValueArr.join(''),
        indexesOfPipedChars
      };
    };
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
