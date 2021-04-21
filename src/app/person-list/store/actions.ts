import { createAction, props } from '@ngrx/store';
import { Person } from './models';

export const addPerson = createAction('[PERSON LIST][API] Add', props<{ identifier: string, person: Person }>());
export const addPersonSuccess = createAction('[PERSON LIST][API] Add success', props<{ identifier: string, response: Person }>());
export const addPersonFail = createAction('[PERSON LIST][API] Add fail', props<{ identifier: string, error: Error }>());

export const removePerson = createAction('[PERSON LIST][API] Remove', props<{ identifier: string, person: Person }>());
export const removePersonSuccess = createAction('[PERSON LIST][API] Remove success', props<{ identifier: string, removedPersonId: string }>());
export const removePersonFail = createAction('[PERSON LIST][API] Remove fail', props<{ identifier: string, error: Error }>());

export const initialize = createAction('[PERSON LIST][STATE] Initialize', props<{ identifier: string }>());
export const destroy = createAction('[PERSON LIST][STATE] Destroy', props<{ identifier: string }>());

