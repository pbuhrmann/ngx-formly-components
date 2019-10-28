import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs';
import { MatDialog, MatAutocomplete } from '@angular/material';
import { FormlyAddressPickerMapComponent } from './map/map.component';
import { Observable } from 'rxjs';
import { takeUntil, filter, first } from 'rxjs/operators';

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
    <div [ngStyle]="{color:formControl?.errors?'#f44336':'inherit'}">
        <mat-form-field style="width: 100%">
            <input matInput [placeholder]="to.placeholder" type="text" [(ngModel)]="value" (ngModelChange)="changed($event)" [disabled]="formControl?.disabled" [matAutocomplete]="autocomplete"/>
            <i *ngIf="to.map !== false" mdSuffix class="material-icons mat-18 open-map" [class.disabled]="formControl?.disabled" (click)="openMap()" [matTooltip]="to.tooltip" matTooltipPosition="below">my_location</i>
        </mat-form-field>
        <mat-autocomplete #autocomplete="matAutocomplete" (optionSelected)="clicked($event.option.value)" [displayWith]="displayAutocomplete.bind(this)">
            <mat-option *ngFor="let item of items" [value]="item" [title]="optionDisplayFn(item)">{{optionDisplayFn(item)}}</mat-option>
        </mat-autocomplete>
    </div>
  `,
})
export class FormlyAddressPickerComponent extends FieldType implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public items: any[];
    public value: string;
    private sub: Subscription;
    private timeout: any;
    private metadata: string;
    private lat: number;
    private lng: number;

    constructor(private http: Http, public dialog: MatDialog) {
        super();
    }

    public ngOnInit() {
        this.to.disabled && this.formControl.disable();

        this.value = this.formControl.value;
        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            this.value = x;
            this.to.changed && this.to.changed(x);
        });
        this.to.metadata && this.to.metadata.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
            this.metadata = x;
        });
    }

    changed(e: any) {
        if (!e) {
            this.items = [];
        }
        this.formControl.setValue(e);
        if (e && e.length >= 3) {
            let address = e.replace(/ /g, '+');
            this.timeout && clearTimeout(this.timeout);
            this.sub && this.sub.unsubscribe();
            this.timeout = setTimeout(() => {
                this.sub = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address} ${this.metadata}&key=${this.to.api_key}`).pipe(first()).subscribe(x => {
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
        this.lat = e.geometry && e.geometry.location && e.geometry.location.lat || null;
        this.lng = e.geometry && e.geometry.location && e.geometry.location.lng || null;
        this.formControl.setValue(this.displayFn(e));
        this.to.response && this.to.response(e);
        this.to.location && this.to.location({ lat: this.lat, lng: this.lng });
    }

    displayAutocomplete(e: any): string {
        if (e && e.formatted_address) {
            return this.displayFn(e);
        }
        return e;
    }

    displayFn(e: any): string {
        return this.to && this.to.displayFn && this.to.displayFn(e) || null;
    }

    optionDisplayFn(e: any): string {
        return this.to && this.to.optionDisplayFn && this.to.optionDisplayFn(e) || this.displayFn(e);
    }

    openMap() {
        if (!this.to.disabled && !this.formControl.disabled) {
            this.items = [];
            let dialogRef = this.dialog.open(FormlyAddressPickerMapComponent, {
                width: '80vw',
                height: '80vh',
                data: {
                    address: this.formControl.value,
                    lat: this.lat,
                    lng: this.lng,
                    api_key: this.to.api_key,
                    placeholder: this.to.placeholder || 'Address',
                    mapCenterCoords: this.to.mapCenterCoords,
                    tileLayerSource: this.to.tileLayerSource,
                    yes: this.to.yes || 'Yes',
                    no: this.to.no || 'No',
                    displayFn: this.optionDisplayFn.bind(this),
                    metadata: this.metadata
                }
            });
            dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe),filter(x => !!x)).subscribe(e => {
                this.clicked(e.value);
                /*this.lat = e && e.value && e.value.lat || null;
                this.lng = e && e.value && e.value.lng || null;
                this.formControl.setValue(e && e.value && e.value.address || null);
                this.to.response && this.to.response(e && e.response || null);
                this.to.location && this.to.location({ lat: this.lat, lng: this.lng });*/
            });
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}