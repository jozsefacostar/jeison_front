import * as BankActions from './bank-state.actions.ts'

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { finished, inProcess, inQueue } from 'src/app/common/utils/actions-proccess';

import { CustomerService } from 'src/app/services/customer/customer.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankEffects {

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {
  }

  // getTasksEffect$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(BankActions.GET_CUSTOMER),
  //     tap((action) => inQueue(action.type)),
  //     mergeMap((action) => {
  //       inProcess(action.type);
  //       return this.customerService.getCustomers()
  //       .pipe(
  //         map(response => {
  //           if (response) {
  //             return BankActions.GET_CUSTOMER_SUCCESS({data: response})
  //           } else {
  //             return BankActions.GET_CUSTOMER_ERROR()
  //           }
  //         }),
  //         catchError(error => of(BankActions.GET_CUSTOMER_ERROR())),
  //         tap((action) => finished(action.type))
  //       );
  //     })
  //   );
  // });

  saveTaskEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BankActions.SAVE_CUSTOMER),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.customerService.saveCustomer(action.data)
        .pipe(
          map(response => {
            if (response) {
              return BankActions.SAVE_CUSTOMER_SUCCESS()
            } else {
              return BankActions.SAVE_CUSTOMER_ERROR()
            }
          }),
          catchError(error => of(BankActions.SAVE_CUSTOMER_ERROR())),
          tap((action) => finished(action.type))
        );
      })
    );
  });

}
