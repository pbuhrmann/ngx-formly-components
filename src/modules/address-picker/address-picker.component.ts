import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Field } from 'ng-formly';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdAutocomplete } from '@angular/material';
import { FormlyAddressPickerMapComponent } from './map/map.component';

@Component({
    selector: 'formly-ngx-address-picker',
    styles: [`
    .open-map {
        cursor: pointer;
    }
  `],
    template: `
    <div [ngStyle]="{color:formControl.errors?'#f44336':'inherit'}">
        <md-input-container style="width: 100%">
            <input mdInput [placeholder]="to.placeholder" type="text" [formControl]="fControl" [mdAutocomplete]="autocomplete" [value]="value"/>
            <i mdSuffix class="material-icons md-18 open-map" [class.disabled]="to.disabled" (click)="!to.disabled && openMap()" [mdTooltip]="to.tooltip" mdTooltipPosition="below">my_location</i>
        </md-input-container>
        <md-autocomplete #autocomplete="mdAutocomplete" [displayWith]="displayFn">
            <md-option *ngFor="let item of items" [value]="item" (click)="clicked(item)">{{item.formatted_address}}</md-option>
        </md-autocomplete>
    </div>
  `,
})
export class FormlyAddressPickerComponent extends Field implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public fControl: FormControl = new FormControl();
    public items: any[];
    public value: string;
    private sub: Subscription;
    private timeout: any;

    constructor(private http: Http, public dialog: MdDialog) {
        super();
    }

    public ngOnInit() {
        if (this.to.disabled) {
            this.fControl.disable();
        }
        if (this.to.source) {
            this.to.source.takeUntil(this.ngUnsubscribe).subscribe(x => {
                // source
            });
        }
        if (this.to.defaultValue && !this.formControl.value) {
            this.formControl.setValue(this.to.defaultValue);
        }
        this.fControl.setValue(this.formControl.value);

        this.fControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(e => {
            if (e && !e.formatted_address) {
                this.formControl.setValue(e);
                let address = e.replace(/ /g, '+');
                this.timeout && clearTimeout(this.timeout);
                this.sub && this.sub.unsubscribe();
                this.timeout = setTimeout(() => {
                    this.sub = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&components=country:${this.to.country}&key=${this.to.api_key}`).subscribe(x => {
                        if (x) {
                            let res = JSON.parse(x.text());
                            if (res && res.results && res.results.length > 0) {
                                this.items = [res.results[0]];
                            }
                        }
                    });
                }, 250);
            }
        });
    }

    clicked(e: any) {
        let lat = e.geometry.location.lat;
        let lng = e.geometry.location.lng;
        this.formControl.setValue(
            {
                formatted_address: e.formatted_address,
                lat: lat,
                lng: lng
            }
        );
    }

    displayFn(addressObj: any): string {
        return addressObj ? addressObj.formatted_address ? addressObj.formatted_address : addressObj : null;
    }

    openMap() {
        this.items = [];
        let dialogRef = this.dialog.open(FormlyAddressPickerMapComponent, {
            width: '80vw',
            height: '80vh',
            data: {
                address: this.formControl.value,
                country: this.to.country,
                api_key: this.to.api_key,
                placeholder: this.to.placeholder,
                mapCenterCoords: this.to.mapCenterCoords,
                tileLayerSource: this.to.tileLayerSource,
                yes: this.to.yes || 'Yes',
                no: this.to.no || 'No'
            }
        });
        dialogRef.afterClosed().takeUntil(this.ngUnsubscribe).filter(x => !!x).subscribe(result => {
            this.fControl.setValue(result);
            this.formControl.setValue(result);
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}