import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './base-admin/components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './base-admin/layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserLayoutComponent } from './base-user/layouts/user-layout/user-layout.component';
import { httpInterceptorProviders } from './auth/helpers/auth-interceptor';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserActionComponent } from './base-admin/user/user-action/user-action.component';
import { UserComponentsModule } from './base-user/components/user-components.module';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule,
    UserComponentsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    LoginComponent,
    RegisterComponent,
    UserActionComponent,
  ],
  providers: [httpInterceptorProviders,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
