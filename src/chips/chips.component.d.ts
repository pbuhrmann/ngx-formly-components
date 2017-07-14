import { OnInit, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { Observable } from 'rxjs';
export declare class FormlyChipsComponent extends Field implements OnInit, OnDestroy {
    _model: any[];
    private suggestions;
    private ngUnsubscribe;
    ngOnInit(): void;
    onAdd(e: any): void;
    onRemove(e: any): void;
    requestAutocompleteItems: (text: string) => Observable<any>;
    match(query: string, opcion: any): boolean;
    ngOnDestroy(): void;
}
