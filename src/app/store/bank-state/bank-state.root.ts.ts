import {
  GET_CUSTOMER,
  HIDE_SPINNER,
  SAVE_CUSTOMER,
  SHOW_SPINNER
} from './bank-state.actions.ts'
import { selectSpinner } from './bank-state.select.ts';

import { BankEffects } from './bank-state.effects.ts';
import { BankReducer } from './bank-state.reducer.ts';

export const bankRoot = {
  GET_CUSTOMER,
  SAVE_CUSTOMER,
  SHOW_SPINNER,
  HIDE_SPINNER,
  BankReducer,
  BankEffects,
  selectSpinner
};
