import { createAction, props } from '@ngrx/store';

import { CustomerDto } from 'src/app/models/customer/customer-dto';
import { SaveCustomerPayload } from 'src/app/models/customer/save-customer-payload';

const GET_CUSTOMER = createAction('[BANK] Get Customer');
const GET_CUSTOMER_SUCCESS = createAction('[BANK] Get Customer Success', props<{data: Array<CustomerDto>}>());
const GET_CUSTOMER_ERROR = createAction('[BANK] Get Customer Error');

const SAVE_CUSTOMER = createAction('[BANK] Save Customer', props<{data: SaveCustomerPayload}>());
const SAVE_CUSTOMER_SUCCESS = createAction('[BANK] Save Customer Success');
const SAVE_CUSTOMER_ERROR = createAction('[BANK] Save Customer Error');

const SHOW_SPINNER = createAction('[SPINNER] Show Spinner');
const HIDE_SPINNER = createAction('[SPINNER] Hide Spinner');

export {
  GET_CUSTOMER,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_ERROR,
  SAVE_CUSTOMER,
  SAVE_CUSTOMER_SUCCESS,
  SAVE_CUSTOMER_ERROR,
  SHOW_SPINNER,
  HIDE_SPINNER
};
