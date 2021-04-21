import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Person } from './models';

@Injectable()
export class PersonListService {

  addPerson(person: Person): Observable<Person> {
    return of({ ...person, id: Guid.create().toString() })
      .pipe(
        delay(3000) // for loading effect
      );
  }

  removePerson(person: Person): Observable<string> {
    return of(person.id)
      .pipe(
        delay(3000) // for loading effect
      );
  }

}
