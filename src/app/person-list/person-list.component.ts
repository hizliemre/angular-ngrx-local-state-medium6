import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Actions, EffectSources } from '@ngrx/effects';
import { ReducerManager, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromStore from "./store";
import * as actions from "./store/actions";
import { PersonListEffects } from './store/effects';
import { Person } from "./store/models";
import * as fromReducer from './store/reducer';
import { PersonListService } from './store/service';
@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"]
})
export class PersonListComponent implements OnInit, OnDestroy {
  @Input() id: string;

  persons$: Observable<Person[]>;
  loading$: Observable<boolean>;

  constructor(
    private _store$: Store,
    private _actions$: Actions,
    private _effects: EffectSources,
    private _service: PersonListService,
    private _reducers: ReducerManager
  ) { }

  ngOnInit(): void {
    this._reducers.addReducer(fromReducer.sliceKey(this.id), fromReducer.reducer)
    this._effects.addEffects(new PersonListEffects(this._actions$, this._service, this.id));
    this._store$.dispatch(actions.initialize({ identifier: this.id }));
    this.persons$ = this._store$.select(fromStore.selectAll(this.id), {
      identifier: this.id
    });
    this.loading$ = this._store$.select(fromStore.selectLoading(this.id), {
      identifier: this.id
    });
  }

  ngOnDestroy(): void {
    this._store$.dispatch(actions.destroy({ identifier: this.id }));
    this._reducers.removeReducer(fromReducer.sliceKey(this.id));
  }

  save(name: string, lastname: string): void {
    const person = {
      name,
      lastname
    } as Person;
    this._store$.dispatch(
      actions.addPerson({ identifier: this.id, person: person })
    );
  }

  remove(person: Person): void {
    this._store$.dispatch(
      actions.removePerson({ identifier: this.id, person })
    );
  }
}
