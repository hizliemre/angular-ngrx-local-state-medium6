import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Page1Component } from "./page1/page-1.component";
import { Page2Component } from './page2/page-2.component';
import { PersonListModule } from "./person-list/person-list.module";

@NgModule({
  declarations: [AppComponent, Page1Component, Page2Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PersonListModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
