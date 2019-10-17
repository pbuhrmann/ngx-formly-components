import { Injectable } from "@angular/core";

@Injectable()
export abstract class ConfigService {

	abstract get(key: string, defecto?: any): any;
}
