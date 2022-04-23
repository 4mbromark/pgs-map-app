import { StandardCoordinatesEditorComponent } from './pgs-common/standard-component/standard-coordinates-editor/standard-coordinates-editor.component';
import { SidebarComponent } from './pgs-frame/sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { SimpleNotificationsModule } from 'angular2-notifications';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from './pgs-module/map/map.component';
import { EditorMarkerComponent } from './pgs-module/map/editor-marker/editor-marker.component';
import { EditorImageComponent } from './pgs-module/map/editor-image/editor-image.component';
import { EditorGpsComponent } from './pgs-module/map/editor-gps/editor-gps.component';
import { EditorGeneralComponent } from './pgs-module/map/editor-general/editor-general.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapComponent,
    EditorMarkerComponent,
    EditorImageComponent,
    StandardCoordinatesEditorComponent,
    EditorGpsComponent,
    EditorGeneralComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    FontAwesomeModule,

    MatSidenavModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSliderModule,
    MatSnackBarModule,

    SimpleNotificationsModule.forRoot()
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
