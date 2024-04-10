import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

import { AppState } from 'src/app/store/core/app-state.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { bankRoot } from 'src/app/store/bank-state/bank-state.root.ts';

@Injectable()
export class LoadSpinnerInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(bankRoot.SHOW_SPINNER());

    return next
      .handle(request)
      .pipe(
        finalize(this.finalize.bind(this))
      );
  }

  finalize = (): void => {
    setTimeout(() => {
      this.store.dispatch(bankRoot.HIDE_SPINNER())
    }, 500)
  };
}
