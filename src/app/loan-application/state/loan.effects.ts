import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoanApplicationsService } from '../loan-applications.service';
import * as LoanActions from './loan.actions';

@Injectable()
export class LoanEffects {
  private readonly actions$ = inject(Actions);
  private readonly loanService = inject(LoanApplicationsService);

  loadDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoanActions.loadDraft),
      switchMap(() =>
        this.loanService.getDraft().pipe(
          map((draft) => LoanActions.loadDraftSuccess(draft)),
          catchError((error) => of(LoanActions.loadDraftFailure({ error })))
        )
      )
    )
  );

  saveDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoanActions.saveDraft),
      mergeMap((action) =>
        this.loanService.saveDraft(action.loanType, action.formData).pipe(
          map(() => LoanActions.saveDraftSuccess()),
          catchError((error) => of(LoanActions.saveDraftFailure({ error })))
        )
      )
    )
  );

  clearDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoanActions.clearDraft),
      mergeMap(() =>
        this.loanService.deleteDraft().pipe(
          map(() => LoanActions.clearDraftSuccess()),
          catchError(() => of(LoanActions.clearDraftSuccess()))
        )
      )
    )
  );
}
