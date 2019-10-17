import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Punto, Inverso, Buscador, PuntoMulti } from './domain';
import { Http, Headers } from '@angular/http';
import { ConfigService } from './services/config.service';
import { GeoDireccion, GeoReferenciar } from './domain/classes';
import { map } from 'rxjs/operators';

@Injectable()
export class GeoService {

	private urlGeoServer: string;
	private header: Headers;

	constructor(private http: Http, private configService: ConfigService, @Inject('geo-server') key) {
		this.urlGeoServer = this.configService.get(key);
		this.header = this.defaultHeader();
	}

	public inverso(punto: Punto, opcional?: Buscador[]): Observable<Inverso> {    
		return this.http.post(this.urlGeoServer + '/inverso', JSON.stringify(punto), { headers: this.header }).pipe(map(
			 (data) => {
				  return JSON.parse(data.text()) || null;
			 }
		));
  }

  public inverso_multiple(puntos: PuntoMulti[]): Observable<any> {
		return this.http.post(this.urlGeoServer + '/inverso-multiple', JSON.stringify(puntos), { headers: this.header }).pipe(map(
			 (data) => {
				  return JSON.parse(data.text()) || null;
			 }
		));
  }

  public georeferenciar(geoDireccion: GeoDireccion): Observable<GeoReferenciar> {
		return this.http.post(this.urlGeoServer + '/buscar', JSON.stringify(geoDireccion), { headers: this.header }).pipe(map(
			 (data) => {
				  return JSON.parse(data.text()) || null;
			 }
		));
  }

  public soloCalle(geoDireccion: GeoDireccion): Observable<GeoReferenciar> {
	return this.http.post(this.urlGeoServer + '/solodireccion', JSON.stringify(geoDireccion), { headers: this.header }).pipe(map(
		 (data) => {
			  return JSON.parse(data.text()) || null;
		 }
	));
}


  private defaultHeader() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=UTF-8');
		return headers;
  }

}