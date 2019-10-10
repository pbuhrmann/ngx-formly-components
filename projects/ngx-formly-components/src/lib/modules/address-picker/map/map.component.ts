import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subject } from 'rxjs';
import { Subscription } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from "@angular/material";
import * as L from 'leaflet';
//declare var L;
@Component({
	selector: 'formly-ngx-address-picker-map',
	styles: [`
  `],
	template: `
	<div style="width: 100%; height: 100%; position: relative">
		<mat-form-field style="width: 100%">
			<input matInput [placeholder]="data.placeholder" type="text" [(ngModel)]="value" (ngModelChange)="changed($event)" [matAutocomplete]="autocomplete"/>
		</mat-form-field>
		<mat-autocomplete #autocomplete="matAutocomplete" (optionSelected)="clicked($event.option.value)" [displayWith]="displayAutocomplete">
			<mat-option *ngFor="let item of items" [value]="item">{{displayFn(item)}}</mat-option>
		</mat-autocomplete>
		<div id="ngx-formly-components-map-{{mapId}}" style="height: calc(100% - 100px); width: 100%; position: relative"></div>
		<div style="margin-top: 15px">
			<button mat-raised-button color="primary" [mat-dialog-close]="{value: result, response: response}"><i class="material-icons">done</i> {{data.yes}}</button>
			<button mat-button color="primary" [mat-dialog-close]="false"><i class="material-icons">cancel</i> {{data.no}}</button>		
		</div>
	</div>
  `,
})
export class FormlyAddressPickerMapComponent implements OnInit, AfterViewInit, OnDestroy {

	public map: any;

	private ngUnsubscribe: Subject<void> = new Subject<void>();
	public value: any;
	public result: any;
	public items: any[];
	public response: any;
	private sub_geo: Subscription;
	private timeout_geo: any;
	private sub_inverse: Subscription;
	private timeout_inverse: any;
	private featureGroup = new L.FeatureGroup();
	private location = null;
	public mapId = Math.round(Math.random() * 10000000);

	constructor(private http: Http, @Inject(MAT_DIALOG_DATA) public data: any) {
	}

	public ngOnInit() {
		this.value = this.data.address;
	}

	ngAfterViewInit() {
		this.map = L.map('ngx-formly-components-map-' + this.mapId, {
			maxZoom: 18,
			minZoom: 6,
			attributionControl: false
		}).setView(this.data.mapCenterCoords, 12);
		L.tileLayer(this.data.tileLayerSource, {
			attribution: '',
			maxZoom: this.map.options.maxZoom,
			minZoom: this.map.options.minZoom
		}).addTo(this.map);
		this.map.addLayer(this.featureGroup);
		this.map.on('click', (e: any) => {
			let latlng = e.latlng;
			this.timeout_inverse && clearTimeout(this.timeout_inverse);
			this.sub_inverse && this.sub_inverse.unsubscribe();
			this.timeout_inverse = setTimeout(() => {
				this.sub_inverse = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${this.data.api_key}`).subscribe(x => {
					if (x) {
						let res = JSON.parse(x.text());
						if (res && res.results && res.results.length > 0) {
							this.clicked(res.results[0], false);
						}
					}
				});
			}, 250);
		});
		this.setLocation(this.data.lat, this.data.lng);
	}

	changed(e: any) {
		if (e && !e.address && !e.formatted_address) {
			let address = e.replace(/ /g, '+');
			this.timeout_geo && clearTimeout(this.timeout_geo);
			this.sub_geo && this.sub_geo.unsubscribe();
			this.timeout_geo = setTimeout(() => {
				this.sub_geo = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address} ${this.data.metadata}&key=${this.data.api_key}`).subscribe(x => {
					if (x) {
						let res = JSON.parse(x.text());
						if (res && res.results && res.results.length > 0) {
							if (this.displayFn && res.results) {
								this.items = res.results.filter(x => this.displayFn(x) != null);
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

	setLocation(lat: number, lng: number) {
		if (lat && lng) {
			this.location = new L.CircleMarker([lat, lng], { radius: 6 });
			this.featureGroup.clearLayers();
			this.featureGroup.addLayer(this.location);
			this.map.addLayer(this.location);
			this.map.setView([lat, lng], 15);
		}
	}

	clicked(e: any, center = true) {
		if (e) {
			let lat = e.geometry && e.geometry.location && e.geometry.location.lat || null;
			let lng = e.geometry && e.geometry.location && e.geometry.location.lng || null;
			let val = {
				address: this.displayFn(e),
				lat: lat,
				lng: lng
			}
			this.value = val;
			this.result = e;
			this.response = e;
			this.setLocation(lat, lng);
		}
	}

	displayAutocomplete(e: any): string {
		return e && e.address || null;
	}

	displayFn(e: any): string {
		return this.data && this.data.displayFn(e);
	}

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}