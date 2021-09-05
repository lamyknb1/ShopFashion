import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ProductActionComponent} from '../../product/product-action/product-action.component';
import {ProductCreateComponent} from '../../product/product-create/product-create.component';
import {ProductDeleteComponent} from '../../product/product-delete/product-delete.component';
import {ProductUpdateComponent} from '../../product/product-update/product-update.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ChartsModule,
        NgbModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        MatFormFieldModule
    ],
  declarations: [
    UserProfileComponent,
    IconsComponent,
    ProductActionComponent,
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductUpdateComponent
  ]
})

export class AdminLayoutModule {}
