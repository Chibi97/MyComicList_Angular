import { NgModule, HostBinding } from '@angular/core';
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
import { LimitWordsPipe } from '../pipes/limit-words';
import { ComicPreviewComponent } from './comic-preview/comic-preview.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'comics', component: ComicsComponent},
  { path: 'publishers', component: PublishersComponent}
];

@NgModule({
  declarations: [
    DashboardComponent,
    TemplateComponent,
    ComicsComponent,
    PublishersComponent,
    PublisherFormComponent,
    LimitWordsPipe,
    ComicPreviewComponent
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
    ComicPreviewComponent
  ],
  exports: [DashboardComponent]
})
export class AdminModule {}

