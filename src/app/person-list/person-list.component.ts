import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromStore from "./store";
import * as actions from "./store/actions";
import { Person } from "./store/models";

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"]
})
export class PersonListComponent implements OnInit, OnDestroy {
  @Input() id: string;

  persons$: Observable<Person[]>;
  loading$: Observable<boolean>;

  constructor(private _store$: Store) {}

  ngOnInit(): void {
    this._store$.dispatch(actions.initialize({ identifier: this.id }));
    this.persons$ = this._store$.select(fromStore.selectAll, {
      identifier: this.id
    });
    this.loading$ = this._store$.select(fromStore.selectLoading, {
      identifier: this.id
    });
  }

  ngOnDestroy(): void {
    this._store$.dispatch(actions.destroy({ identifier: this.id }));
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
