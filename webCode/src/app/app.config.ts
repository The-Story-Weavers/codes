import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzModalService } from 'ng-zorro-antd/modal';
import { routes } from './app.routes';
import { HttpInterceptor } from './service/http-interceptor';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

const ngZorroConfig: NzConfig = {
  modal: { nzMaskClosable: false }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withInterceptors([HttpInterceptor])),
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'yyyy-MM-dd HH:mm:ss'} },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    DatePipe,
    NzModalService
  ]
};
