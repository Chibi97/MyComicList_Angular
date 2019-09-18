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
import { ComicFormComponent } from './forms/comic-form/comic-form.component';
import { GenresComponent } from './genres/genres.component';
import { GenreFormComponent } from './forms/genre-form/genre-form.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorFormComponent } from './forms/author-form/author-form.component';
import { DescriptionPreviewComponent } from './description-preview/description-preview.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'comics', component: ComicsComponent},
  { path: 'publishers', component: PublishersComponent},
  { path: 'genres', component: GenresComponent},
  { path: 'authors', component: AuthorsComponent},
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
    ComicFormComponent,
    GenresComponent,
    GenreFormComponent,
    AuthorsComponent,
    AuthorFormComponent,
    DescriptionPreviewComponent
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
    ComicFormComponent,
    GenreFormComponent,
    AuthorFormComponent,
    DescriptionPreviewComponent
  ],
  exports: [DashboardComponent]
})
export class AdminModule {}

