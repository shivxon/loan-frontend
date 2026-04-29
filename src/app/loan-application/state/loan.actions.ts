import { createAction, props } from '@ngrx/store';

export const loadDraft = createAction('[Loan] Load Draft');
export const loadDraftSuccess = createAction(
  '[Loan] Load Draft Success',
  props<{ loanType: string; formData: Record<string, string> }>()
);
export const loadDraftFailure = createAction(
  '[Loan] Load Draft Failure',
  props<{ error: any }>()
);

export const saveDraft = createAction(
  '[Loan] Save Draft',
  props<{ loanType: string; formData: Record<string, string> }>()
);
export const saveDraftSuccess = createAction('[Loan] Save Draft Success');
export const saveDraftFailure = createAction(
  '[Loan] Save Draft Failure',
  props<{ error: any }>()
);

export const clearDraft = createAction('[Loan] Clear Draft');
export const clearDraftSuccess = createAction('[Loan] Clear Draft Success');
