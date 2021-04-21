import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

const getFetureState = createFeatureSelector<fromReducer.PersonListState>(fromReducer.featureKey);

export const selectLoading = createSelector(getFetureState, (state, props) => fromReducer.loading(state, props));
export const selectAll = createSelector(getFetureState, (state, props) => fromReducer.selectAll(state, props));
