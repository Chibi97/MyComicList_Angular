import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { ComicsComponent } from './comics/comics.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublishersComponent } from './publishers/publishers.component';
import { PublisherFormComponent } from './forms/publisher-form/publisher-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LimitWordsPipe } from '../shared/pipes/limit-words';
import { ComicPreviewComponent } from './comic-preview/comic-preview.component';
import { GenresComponent } from './genres/genres.component';
import { GenreFormComponent } from './forms/genre-form/genre-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'comics', component: ComicsComponent},
  { path: 'publishers', component: PublishersComponent},
  { path: 'genres', component: GenresComponent}
];

@NgModule({
  declarations: [
    DashboardComponent,
    TemplateComponent,
    ComicsComponent,
    PublishersComponent,
    PublisherFormComponent,
    LimitWordsPipe,
    ComicPreviewComponent,
    GenresComponent,
    GenreFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    PublisherFormComponent,
    ComicPreviewComponent,
    GenreFormComponent
  ],
  exports: [DashboardComponent]
})
export class AdminModule {}

