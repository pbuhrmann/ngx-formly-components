import { Http } from '@angular/http';
import { ConfigService } from '../../../../src/services/config.service';

export function configFactory(config: ConfigService, http: Http) {
  return (): any => {
    return config.load(http);
  };
}
