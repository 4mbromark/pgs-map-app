import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './pgs-module/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pgs-module/home/home.component';
import { MapMenuComponent } from './pgs-module/map/map-menu/map-menu.component';

import {MatButtonModule} from '@angular/material/button';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StandardCoordinatesEditorComponent } from './pgs-common/standard-component/standard-coordinates-editor/standard-coordinates-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    MapMenuComponent,
    StandardCoordinatesEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    FontAwesomeModule,

    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private readonly library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }
}
