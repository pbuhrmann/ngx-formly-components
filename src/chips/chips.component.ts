import { Component, DoCheck, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Field } from 'ng-formly';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'formly-chips',
  styles: [],
  template: `
  <div class="form-group">
    <div class="header-search">
        <label for="key" style="display: inline-block;">{{ to.label }}</label>
        <tag-input [ngModel]="_model" [secondaryPlaceholder]="to['placeholder'] ? to['placeholder'] : 'Add  values'" [placeholder]="'+'"
            [maxItems]="to['maxItems']" [onlyFromAutocomplete]="to['onlyFromAutocomplete'] || false"
            (onAdd)="onAdd($event)" (onRemove)="onRemove($event)" [onTextChangeDebounce]="500">
            <tag-input-dropdown [autocompleteObservable]="requestAutocompleteItems" [focusFirstElement]="true" [showDropdownIfEmpty]="true">
            </tag-input-dropdown>
        </tag-input>
        <small class="text-muted">{{to.helpMessage || "Press 'Enter' to add value"}}</small>
    </div>
  </div>
  `,
})
export class FormlyChipsComponent extends Field implements OnInit, OnDestroy {
  public _model: any[] = [];
  private suggestions: string[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public ngOnInit() {
    this.to.source.takeUntil(this.ngUnsubscribe).subscribe((x: any) => {
      this.suggestions = x;
    });
    if (this.formControl.value) {
      if (typeof this.formControl.value == "string") {
        if (this.to.joinString) {
          this._model = this.formControl.value.split(this.to.joinString);
        } else {
          this._model = this.formControl.value.split('|');
        }
      } else {
        this._model = [this.formControl.value.toString()];
      }
    }
  }

  public onAdd(e: any) {
    this._model.push(e.value);
    if (this.to.joinString) {
      this.formControl.setValue(this._model.join(this.to.joinString));
    } else {
      this.formControl.setValue(this._model.join('|'));
    }
  }

  public onRemove(e: any) {
    let index = this._model.indexOf(e);
    this._model.splice(index, 1);
    if (this.to.joinString) {
      this.formControl.setValue(this._model.join(this.to.joinString));
    } else {
      this.formControl.setValue(this._model.join('|'));
    }
  }

  public requestAutocompleteItems = (text: string): Observable<any> => {
    if (this.suggestions && this.suggestions.length > 0) {
      return Observable.of(this.suggestions);
    }
    else {
      return Observable.of([]);
    }
    /*if (this.to.source) {
      return this.to.source(text);
    } else {
      return Observable.of([]);
    }*/
  }

  public match(query: string, opcion: any): boolean {
    return true;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
