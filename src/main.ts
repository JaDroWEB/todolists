import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { akitaConfig, enableAkitaProdMode, persistState } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const storage = persistState({
  persistOnDestroy: false
});

const providers = [{ provide: 'persistStorage', useValue: storage }];
akitaConfig({ resettable: true });

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
