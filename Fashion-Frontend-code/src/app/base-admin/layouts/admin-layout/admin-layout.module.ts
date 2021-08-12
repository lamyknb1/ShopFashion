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
import {AdminProductComponent} from '../../admin-product/admin-product.component';
import {AdminOrderComponent} from '../../admin-order/admin-order.component';
import {AdminCategoryComponent} from '../../admin-category/admin-category.component';
import {AdminUserComponent} from '../../admin-user/admin-user.component';
import {AdminSupplierComponent} from '../../admin-supplier/admin-supplier.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ChartsModule,
        NgbModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule
    ],
  declarations: [
    UserProfileComponent,
    IconsComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminCategoryComponent,
    AdminSupplierComponent,
    AdminUserComponent
  ]
})

export class AdminLayoutModule {}
