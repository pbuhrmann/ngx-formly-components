import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConfigService {

    private data = {};
    constructor() { }

    // se llama desde el APP_INITIALIZER en el home module
    // esto hace que los demas modulos esperen a que esta promise devuelva resolve(true)
    public load(http: Http) {
        return new Promise((resolve, reject) => {
            http.get('./assets/config.json')
                .map((res) => {
                    return res.json();
                })
                .subscribe((data) => {
                    this.data = data;
                    resolve(true);
                },
                (err) => { reject('Unable to load configuration file.'); },
                () => console.log('Configuration file has been loaded.'));
        });
    }
    public get(key: string, defecto?: any) {
        return this.data[key] ? this.data[key] : defecto;
    }
}
