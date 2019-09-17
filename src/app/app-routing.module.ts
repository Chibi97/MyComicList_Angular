import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent } from './forms/index';
import { IndexComponent } from './home/index';
import { BrowseComponent } from './browse/browse.component';
import { AdminActivator } from './services/admin-activator.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'browse', component: BrowseComponent},
  { path: 'browse/filter/:genreId', component: BrowseComponent},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AdminActivator]},
  { path: '', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
