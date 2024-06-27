import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { whiteList } from './commonConfig';
import { ToolsService } from "./tools.service";
import { Router } from "@angular/router";

export const HttpInterceptor: HttpInterceptorFn =
  (request: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
    const toolsService = inject(ToolsService);
    const router = inject(Router);
    return next(request).pipe(
      tap({
        next: event => {
          if (event.type && event['url'].indexOf('.json') === -1) {
            if (whiteList.filter(e => event['url'].indexOf(e) !== -1).length > 0) {
              return;
            }
            if (event['body']['code'] === 200) {
              return
            } else if (event['body']['code'] !== 200) {
              toolsService.tip('error', event['body']['msg']);
            }
          }
        },
        error: error => {
          toolsService.tip('error', '系统错误');
        },
      })
    );

  }