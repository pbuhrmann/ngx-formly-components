import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Field } from 'ng-formly';
import { Subscription } from 'rxjs/Rx';
import { SelectComponent } from 'ng2-select';
export declare class FormlySelectAsyncComponent extends Field implements OnInit, OnDestroy, AfterViewInit {
    mySelect: SelectComponent;
    items: any[];
    selectedItem: any;
    placeholder: string;
    sub_items: Subscription;
    disabled: boolean;
    ngOnInit(): void;
    selected(e: any): void;
    isDisabled(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
