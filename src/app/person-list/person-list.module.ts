import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PersonListComponent } from './person-list.component';
import { PersonListService } from './store/service';
import * as fromReducer from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { PersonListEffects } from './store/effects';

@NgModule({
  declarations: [PersonListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer),
    EffectsModule.forFeature([PersonListEffects])
  ],
  exports: [PersonListComponent],
  providers: [PersonListService]
})
export class PersonListModule { }
