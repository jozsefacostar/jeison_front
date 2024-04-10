import * as Actions from "./bank-state.actions.ts";

import { createReducer, on, props } from "@ngrx/store";

import { BankState } from "./bank-state.model.ts";

const initialState: BankState = {
  showSpinner: false
};

export const BankReducer = createReducer(
  initialState,
  on(Actions.GET_CUSTOMER_SUCCESS, (state, action) => ({ ...state, customers: action.data})),
  on(Actions.SHOW_SPINNER, (state, action) => ({ ...state, showSpinner: true})),
  on(Actions.HIDE_SPINNER, (state, action) => ({ ...state, showSpinner: false}))
);
