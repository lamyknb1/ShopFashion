import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import {AdminProductComponent} from '../../admin-product/admin-product.component';
import {AdminOrderComponent} from '../../admin-order/admin-order.component';
import {AdminCategoryComponent} from '../../admin-category/admin-category.component';
import {AdminUserComponent} from '../../admin-user/admin-user.component';
import {AdminSupplierComponent} from '../../admin-supplier/admin-supplier.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'product',  component: AdminProductComponent },
    { path: 'order',    component: AdminOrderComponent },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'supplier', component: AdminSupplierComponent },
    { path: 'user',     component: AdminUserComponent },
    { path: 'profile',  component: UserProfileComponent },
    { path: 'icons',    component: IconsComponent }
];
