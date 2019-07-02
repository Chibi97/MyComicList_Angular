import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, BrowseComicsComponent, MyListComponent } from './index';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'browse', component: BrowseComicsComponent },
  { path: 'mylist', component: MyListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'auth', loadChildren: './authorization/authorization.module#AuthorizationModule' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
