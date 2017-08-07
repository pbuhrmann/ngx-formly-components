import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { Field } from 'ng-formly';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Http } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { MD_DIALOG_DATA } from "@angular/material";
import * as L from 'leaflet';

@Component({
	selector: 'formly-ngx-address-picker-map',
	styles: [`
  `],
	template: `
	<div style="width: 100%; height: 100%; position: relative">
		<md-input-container style="width: 100%">
			<input mdInput [placeholder]="data.placeholder" type="text" [formControl]="fControl" [mdAutocomplete]="autocomplete"/>
		</md-input-container>
		<md-autocomplete #autocomplete="mdAutocomplete" [displayWith]="displayFn">
			<md-option *ngFor="let item of items" [value]="item" (click)="setValue(item)">{{item.formatted_address}}</md-option>
		</md-autocomplete>
		<div id="myMap" style="height: calc(100% - 100px); width: 100%; position: relative"></div>
		<div style="margin-top: 15px">
			<button md-button color="primary" [md-dialog-close]="fControl.value">{{data.yes}}</button>
			<button md-button color="accent" [md-dialog-close]="false">{{data.no}}</button>		
		</div>
	</div>	
  `,
})
export class FormlyAddressPickerMapComponent implements OnInit, OnDestroy {

	public map: L.Map;

	private ngUnsubscribe: Subject<void> = new Subject<void>();
	public fControl: FormControl = new FormControl();
	public items: any[];
	private sub_geo: Subscription;
	private timeout_geo: any;
	private sub_inverse: Subscription;
	private timeout_inverse: any;
	private featureGroup: L.FeatureGroup = new L.FeatureGroup();
	private location: L.Layer = null;

	constructor(private http: Http, @Inject(MD_DIALOG_DATA) public data: any) {
	}

	public ngOnInit() {
		console.log(this.data);
		this.fControl.setValue(this.data.address);

		this.fControl.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(e => {
			if (e && !e.formatted_address) {
				let address = e.replace(/ /g, '+');
				this.timeout_geo && clearTimeout(this.timeout_geo);
				this.sub_geo && this.sub_geo.unsubscribe();
				this.timeout_geo = setTimeout(() => {
					this.sub_geo = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&components=country:${this.data.country}&key=${this.data.api_key}`).subscribe(x => {
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

		this.map = L.map('myMap', {
			maxZoom: 18,
			minZoom: 6
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
							this.setValue(res.results[0], false);
						}
					}
				});
			}, 250);
		});

		this.setLocation(this.data.address);
	}

	setLocation(e: any) {
		if (e.formatted_address) {
			this.location = new L.CircleMarker([e.lat, e.lng], { radius: 5 });
			this.featureGroup.clearLayers();
			this.featureGroup.addLayer(this.location);
			this.map.addLayer(this.location);
			this.map.setView([e.lat, e.lng], 15);
		}
	}

	setValue(e: any, center = true) {
		let lat = e.geometry.location.lat;
		let lng = e.geometry.location.lng;
		let val = {
			formatted_address: e.formatted_address,
			lat: lat,
			lng: lng
		}
		this.fControl.setValue(val);
		this.setLocation(val);
		center && this.map.setView([lat, lng], 15);
	}

	displayFn(addressObj: any): string {
		return addressObj ? addressObj.formatted_address ? addressObj.formatted_address : addressObj : null;
	}

	ngOnDestroy() {

	}
}