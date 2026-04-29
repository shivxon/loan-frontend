import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoanState } from './loan.reducer';

export const selectLoanState = createFeatureSelector<LoanState>('loan');

export const selectDraft = createSelector(
  selectLoanState,
  (state) => state.draft
);

export const selectIsLoadingDraft = createSelector(
  selectLoanState,
  (state) => state.loading
);
