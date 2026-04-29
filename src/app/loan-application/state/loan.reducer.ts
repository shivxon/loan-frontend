import { createReducer, on } from '@ngrx/store';
import * as LoanActions from './loan.actions';

export interface LoanState {
  draft: {
    loanType: string;
    formData: Record<string, string>;
  } | null;
  loading: boolean;
  error: any;
}

export const initialState: LoanState = {
  draft: null,
  loading: false,
  error: null,
};

export const loanReducer = createReducer(
  initialState,
  on(LoanActions.loadDraft, (state) => ({ ...state, loading: true })),
  on(LoanActions.loadDraftSuccess, (state, { loanType, formData }) => ({
    ...state,
    draft: { loanType, formData },
    loading: false,
    error: null,
  })),
  on(LoanActions.loadDraftFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(LoanActions.saveDraft, (state, { loanType, formData }) => ({
    ...state,
    draft: { loanType, formData },
  })),
  on(LoanActions.clearDraftSuccess, (state) => ({
    ...state,
    draft: null,
  }))
);
