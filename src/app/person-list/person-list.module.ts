import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PersonListComponent } from './person-list.component';
import * as fromReducer from './store/reducer';
import { PersonListService } from './store/service';

@NgModule({
  declarations: [PersonListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer)
  ],
  exports: [PersonListComponent],
  providers: [PersonListService]
})
export class PersonListModule { }
