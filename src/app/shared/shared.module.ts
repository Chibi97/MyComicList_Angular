import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [TemplateComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [TemplateComponent, NavbarComponent, FooterComponent, CommonModule]
})
export class SharedModule { }
