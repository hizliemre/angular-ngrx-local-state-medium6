import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import * as actions from "./actions";
import { Person } from "./models";

const featureKey = "personListState";
export const sliceKey = (id: string) => `${featureKey}_${id}`;

export interface PersonListState extends EntityState<Person> {
  loading: boolean;
}

export const entityAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  selectId: entity => entity.id
});

export const initialState: PersonListState = entityAdapter.getInitialState({
  loading: false
});

export const reducer = createReducer(
  initialState,
  on(actions.initialize, () => ({ ...initialState })),
  on(actions.addPerson, actions.removePerson, (state) => ({ ...state, loading: true })),
  on(actions.addPersonSuccess, (state, action) => ({
    ...entityAdapter.addOne(action.response, state),
    loading: false
  })),
  on(actions.addPersonFail, actions.removePersonFail, (state) => ({ ...state, loading: false })),
  on(actions.removePersonSuccess, (state, action) => ({
    ...entityAdapter.removeOne(action.removedPersonId, state),
    loading: false
  })),
  on(actions.destroy, () => undefined)
);

export const loading = (state: PersonListState) => state?.loading;
export const selectAll = (state: PersonListState) => {
  if (Boolean(state))
    return entityAdapter
      .getSelectors()
      .selectAll(state);
  return [];
};
