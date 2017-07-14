import { OnInit } from '@angular/core';
import { Field } from 'ng-formly';
export declare class FormlyDateTimeMaskComponent extends Field implements OnInit {
    model: any;
    format: string;
    autoCorrectedDatePipe: any;
    mask: (string | RegExp)[];
    errors: string;
    ngOnInit(): void;
    isValid(): boolean;
    today(): void;
    onChange(e: any): void;
}
