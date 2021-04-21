import { Actions, createEffect, EffectNotification, ofType, OnIdentifyEffects, OnRunEffects } from '@ngrx/effects';
import { Action, ActionCreator } from '@ngrx/store';
import { FunctionWithParametersType } from '@ngrx/store/src/models';
import { Observable, of, pipe, UnaryFunction } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import * as actions from './actions';
import { PersonListService } from './service';

export class PersonListEffects implements OnRunEffects, OnIdentifyEffects {

  constructor(
    private _actions$: Actions,
    private _service: PersonListService,
    private _identifier: string
  ) { }

  $addPerson = createEffect(() => {
    return this._actions$.pipe(
      this.localOfType(actions.addPerson),
      switchMap((action) => this._service.addPerson(action.person)
        .pipe(
          map((response) => actions.addPersonSuccess({ identifier: action.identifier, response })),
          catchError((error: Error) => of(actions.addPersonFail({ identifier: action.identifier, error })))
        )
      )
    );
  });

  $addPersonSuccess = createEffect(() => {
    return this._actions$.pipe(
      this.localOfType(actions.addPersonSuccess),
      tap(() => alert('save success'))
    );
  }, { dispatch: false });

  $removePerson = createEffect(() => {
    return this._actions$.pipe(
      this.localOfType(actions.removePerson),
      switchMap((action) => this._service.removePerson(action.person)
        .pipe(
          map((removedPersonId) => actions.removePersonSuccess({ identifier: action.identifier, removedPersonId })),
          catchError((error: Error) => of(actions.removePersonFail({ identifier: action.identifier, error })))
        )
      )
    );
  });

  $removePersonSuccess = createEffect(() => {
    return this._actions$.pipe(
      this.localOfType(actions.removePersonSuccess),
      tap(() => alert('remove success'))
    );
  }, { dispatch: false });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>):
    Observable<EffectNotification> {
    return resolvedEffects$.pipe(
      takeUntil(this._actions$.pipe(this.localOfType(actions.destroy)))
    );
  }

  ngrxOnIdentifyEffects(): string {
    return this._identifier;
  }

  private localOfType<T>(action: ActionCreator<string, FunctionWithParametersType<T[], object>> | string):
    UnaryFunction<Observable<Action>, Observable<T>> {
    return pipe(
      ofType(action),
      filter((action: any) => action.identifier === this._identifier)
    );
  }

}
