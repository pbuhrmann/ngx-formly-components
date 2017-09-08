import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Field } from 'ng-formly';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdAutocomplete } from '@angular/material';
import { FormlyAddressPickerMapComponent } from './map/map.component';

@Component({
    selector: 'ngx-formly-component-address-picker',
    styles: [`
    .open-map {
        cursor: pointer;
    }
    .disabled {
        color: #b0b0b0;
    }
  `],
    template: `
    <div [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container style="width: 100%">
            <input mdInput [placeholder]="to.placeholder" type="text" [(ngModel)]="value" (ngModelChange)="changed($event)" [disabled]="formControl.disabled" [mdAutocomplete]="autocomplete"/>
            <i mdSuffix class="material-icons md-18 open-map" [class.disabled]="formControl.disabled" (click)="openMap()" [mdTooltip]="to.tooltip" mdTooltipPosition="below">my_location</i>
        </md-input-container>
        <md-autocomplete #autocomplete="mdAutocomplete" (optionSelected)="clicked($event.option.value)" [displayWith]="displayAutocomplete">
            <md-option *ngFor="let item of items" [value]="item">{{displayFn(item)}}</md-option>
        </md-autocomplete>
    </div>
  `,
})
export class FormlyAddressPickerComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any[];
    public value: string;
    private sub: Subscription;
    private timeout: any;
    private components: string;
    private metadata: string;

    constructor(private http: Http, public dialog: MdDialog) {
        super();
    }

    public ngOnInit() {
        this.to.disabled && this.formControl.disable();

        this.value = this.formControl.value;
        this.formControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.value = x;
            this.to.changed && this.to.changed(x);
        });
        this.to.metadata && this.to.metadata.takeUntil(this.ngUnsubscribe).subscribe(x => {
            this.metadata = x;
        });
    }

    changed(e: any) {
        if (!e) {
            this.items = [];
        }
        this.formControl.setValue({ address: e, lat: null, lng: null });
        if (e && e.length >= 3) {
            let address = e.replace(/ /g, '+');
            this.timeout && clearTimeout(this.timeout);
            this.sub && this.sub.unsubscribe();
            this.timeout = setTimeout(() => {
                this.sub = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address} ${this.metadata}&components=${this.to.components}&key=${this.to.api_key}`).first().subscribe(x => {
                    if (x) {
                        let res = JSON.parse(x.text());
                        if (res && res.results && res.results.length > 0) {
                            if (this.to.displayFn && res.results) {
                                this.items = res.results.filter(x => this.to.displayFn(x) != null);
                            }
                            else {
                                this.items = res.results;
                            }
                        }
                    }
                });
            }, 300);
        }
    }

    clicked(e: any) {
        if (e) {
            let val = {
                address: this.displayFn(e),
                lat: e.geometry && e.geometry.location && e.geometry.location.lat || null,
                lng: e.geometry && e.geometry.location && e.geometry.location.lng || null
            }
            this.formControl.setValue(val);
        }
    }

    displayAutocomplete(e: any): string {
        return e && e.address || null;
    }

    displayFn(e: any): string {
        return this.to && this.to.displayFn && this.to.displayFn(e) || null;
    }

    openMap() {
        if (!this.to.disabled && !this.formControl.disabled) {
            this.items = [];
            let dialogRef = this.dialog.open(FormlyAddressPickerMapComponent, {
                width: '80vw',
                height: '80vh',
                data: {
                    address: this.formControl.value,
                    api_key: this.to.api_key,
                    placeholder: this.to.placeholder || 'Address',
                    mapCenterCoords: this.to.mapCenterCoords,
                    tileLayerSource: this.to.tileLayerSource,
                    yes: this.to.yes || 'Yes',
                    no: this.to.no || 'No',
                    displayFn: this.displayFn.bind(this),
                    components: this.components,
                    metadata: this.metadata
                }
            });
            dialogRef.afterClosed().takeUntil(this.ngUnsubscribe).filter(x => !!x).subscribe(e => {
                this.formControl.setValue(e);
            });
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}