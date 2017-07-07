import { OnInit } from '@angular/core';
import { Field } from 'ng-formly';
export declare class FormlyDateTimeMaskComponent extends Field implements OnInit {
    fecha: string;
    autoCorrectedDatePipe: (conformedValue: any) => false | {
        value: any;
        indexesOfPipedChars: any[];
    };
    mascara: (string | RegExp)[];
    errors: string;
    ngOnInit(): void;
    isValid(): boolean;
    today(): void;
    onChange(e: any): void;
}
