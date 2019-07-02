import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent, SliderComponent, AdvertisementComponent, FilteringComponent,
  BrowseComicsComponent, MyListComponent
} from './index';

import { SharedModule } from './shared/shared.module';
import { AuthorizationModule } from './authorization/authorization.module';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SliderComponent,
    AdvertisementComponent,
    FilteringComponent,
    BrowseComicsComponent,
    MyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MDBBootstrapModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
