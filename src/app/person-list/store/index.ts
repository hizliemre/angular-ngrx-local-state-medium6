import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

const getFeatureState = (id: string) =>
  createFeatureSelector<fromReducer.PersonListState>(fromReducer.sliceKey(id));

export const selectLoading = (id: string) => createSelector(getFeatureState(id),
  (state) => fromReducer.loading(state));
export const selectAll = (id: string) => createSelector(getFeatureState(id),
  (state) => fromReducer.selectAll(state));
