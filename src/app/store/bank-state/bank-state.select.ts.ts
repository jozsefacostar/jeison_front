import { BankState } from "./bank-state.model.ts";
import { createSelector } from "@ngrx/store";

const getSpinnerInfo = (state: BankState): boolean => state.showSpinner;

const selectSpinner = createSelector((state: { bankState: BankState }) => state.bankState, getSpinnerInfo);

export { selectSpinner };
