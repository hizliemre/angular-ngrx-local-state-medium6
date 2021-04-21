import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonListComponent } from './person-list.component';
import { PersonListService } from './store/service';

@NgModule({
  declarations: [PersonListComponent],
  imports: [
    CommonModule,
  ],
  exports: [PersonListComponent],
  providers: [PersonListService]
})
export class PersonListModule { }
