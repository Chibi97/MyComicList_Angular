import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent, TemplateComponent, NavbarComponent, FooterComponent, SliderComponent,
  AdvertisementComponent, FilteringComponent, BrowseComicsComponent } from './index';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    SliderComponent,
    AdvertisementComponent,
    FilteringComponent,
    BrowseComicsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MDBBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export const routing = RouterModule.forRoot(APP_ROUTES, { enableTracing: true });

