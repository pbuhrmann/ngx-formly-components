import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { GeoService } from './geo.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [GeoService]
})
export class GeoCodRefModule {
  static forRoot(configService: any, key: string): ModuleWithProviders {
    return {
      ngModule: GeoCodRefModule,
      providers: [
        { provide: ConfigService, useExisting: configService },
        { provide: 'geo-server', useValue: key }
      ]
    };
  }
}