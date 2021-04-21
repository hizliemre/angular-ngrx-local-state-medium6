import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import * as actions from "./actions";
import { Person } from "./models";

export const featureKey = "personListState";

export interface AllPersonListsState {
  lists: Record<string, PersonListState>;
}

export const allPersonListInitialState: AllPersonListsState = {
  lists: {}
};

export interface PersonListState extends EntityState<Person> {
  loading: boolean;
}

export const allPersonListReducer = createReducer(allPersonListInitialState);

export const entityAdapter: EntityAdapter<Person> = createEntityAdapter<Person>(
  {
    selectId: entity => entity.id
  }
);

export const initialState: PersonListState = entityAdapter.getInitialState({
  loading: false
});

export const reducer = createReducer(
  allPersonListInitialState,
  on(actions.initialize, (state, action) => ({
    ...state,
    lists: {
      ...state.lists,
      [action.identifier]: {
        ...initialState
      }
    }
  })),
  on(actions.addPerson, actions.removePerson, (state, action) => ({
    ...state,
    lists: {
      ...state.lists,
      [action.identifier]: {
        ...stateSlice(action, state),
        loading: true
      }
    }
  })),

  on(actions.addPersonSuccess, (state, action) => ({
    ...state,
    lists: {
      ...state.lists,
      [action.identifier]: {
        ...entityAdapter.addOne(action.response, stateSlice(action, state)),
        loading: false
      }
    }
  })),
  on(actions.addPersonFail, actions.removePersonFail, (state, action) => ({
    ...state,
    lists: {
      ...state.lists,
      [action.identifier]: {
        ...stateSlice(action, state),
        loading: false
      }
    }
  })),
  on(actions.removePersonSuccess, (state, action) => ({
    ...state,
    lists: {
      ...state.lists,
      [action.identifier]: {
        ...entityAdapter.removeOne(
          action.removedPersonId,
          stateSlice(action, state)
        ),
        loading: false
      }
    }
  })),
  on(actions.removePersonFail, actions.removePersonFail, (state, action) => ({
    ...state,
    lists: {
      ...state.lists,
      [action.identifier]: {
        ...stateSlice(action, state),
        loading: false
      }
    }
  })),
  on(actions.destroy, (state, action) => ({
    ...state,
    lists: {
      ...state.lists,
      [action.identifier]: undefined
    }
  }))
);

const stateSlice = (
  action: any,
  state: AllPersonListsState
): PersonListState => {
  if (!Boolean(action.identifier)) throw Error("Action'da identifier yok.");
  return state.lists[action.identifier];
};

export const loading = (state: AllPersonListsState, props: { identifier: string }) => state.lists[props.identifier].loading;

export const selectAll = (state: AllPersonListsState, props: { identifier: string }) => {
  if (Boolean(state.lists[props.identifier]))
    return entityAdapter
      .getSelectors()
      .selectAll(state.lists[props.identifier]);
  return [];
};
