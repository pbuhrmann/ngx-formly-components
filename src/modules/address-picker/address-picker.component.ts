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
        <md-autocomplete #autocomplete="mdAutocomplete" [displayWith]="displayFn">
            <md-option *ngFor="let item of items" [value]="item" (click)="clicked(item)">{{item.formatted_address}}</md-option>
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
    }

    changed(e: any) {
        if (!e) {
            this.items = [];
            this.formControl.setValue(null);
            return;
        }
        this.formControl.setValue(e);
        if (e && e.length >= 3) {
            let address = e.replace(/ /g, '+');
            this.timeout && clearTimeout(this.timeout);
            this.sub && this.sub.unsubscribe();
            this.timeout = setTimeout(() => {
                this.sub = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&components=${this.to.components}&key=${this.to.api_key}`).subscribe(x => {
                    if (x) {
                        let res = JSON.parse(x.text());
                        if (res && res.results && res.results.length > 0) {
                            this.items = res.results;
                        }
                    }
                });
            }, 300);
        }
    }

    clicked(e: any) {
        if (e) {
            let lat = e.geometry.location.lat;
            let lng = e.geometry.location.lng;
            this.formControl.setValue(
                {
                    formatted_address: e.formatted_address,
                    lat: lat,
                    lng: lng
                }
            );
            this.value = e.formatted_address;
        }
    }

    displayFn(e: any): string {
        return e && e.formatted_address !== undefined ? e.formatted_address : e;
    }

    openMap() {
        if (!this.to.disabled && !this.formControl.disabled) {
            this.items = [];
            let dialogRef = this.dialog.open(FormlyAddressPickerMapComponent, {
                width: '80vw',
                height: '80vh',
                data: {
                    address: this.formControl.value,
                    country: this.to.country,
                    api_key: this.to.api_key,
                    placeholder: this.to.placeholder || 'Address',
                    mapCenterCoords: this.to.mapCenterCoords,
                    tileLayerSource: this.to.tileLayerSource,
                    yes: this.to.yes || 'Yes',
                    no: this.to.no || 'No'
                }
            });
            dialogRef.afterClosed().takeUntil(this.ngUnsubscribe).filter(x => !!x).subscribe(e => {
                this.formControl.setValue(e);
                if (e && e.formatted_address) {
                    this.value = e.formatted_address;
                }
                else {
                    this.value = e;
                }
            });
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}