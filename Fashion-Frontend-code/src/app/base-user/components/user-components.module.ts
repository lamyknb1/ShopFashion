
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import { HeaderUserComponent } from './header-user/header-user.component';
import { FooterUserComponent } from './footer-user/footer-user.component';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    HeaderUserComponent,
    FooterUserComponent,
    SidebarUserComponent,

  ],
  exports: [
    HeaderUserComponent,
    FooterUserComponent,
    SidebarUserComponent
  ]
})

export class UserComponentsModule {
}
