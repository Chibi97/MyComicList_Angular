import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';

import { LoginComponent, RegisterComponent } from './forms/index';
import { LayoutComponent, FooterComponent, NavbarComponent,
  SliderItemDirective, SliderComponent } from './shared/index';
import { IndexComponent, HomeFiltersComponent,
  HomeSliderComponent } from './home/index';
import { ComicComponent } from './shared/comic/comic.component';
import { BrowseComponent } from './browse/browse.component';
import { RegexDirective } from './shared/validators/regex.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    IndexComponent,
    HomeFiltersComponent,
    HomeSliderComponent,
    SliderComponent,
    SliderItemDirective,
    ComicComponent,
    BrowseComponent,
    RegexDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
