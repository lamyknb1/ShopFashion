import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import {ProductActionComponent} from '../../product/product-action/product-action.component';
import {ProductCreateComponent} from '../../product/product-create/product-create.component';
import {ProductDeleteComponent} from '../../product/product-delete/product-delete.component';
import {ProductUpdateComponent} from '../../product/product-update/product-update.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home',             component: ProductActionComponent},
    { path: 'product-create',   component: ProductCreateComponent},
    { path: 'product-delete',   component: ProductDeleteComponent},
    { path: 'product-update',   component: ProductUpdateComponent},
    { path: 'order',    component: null},
    { path: 'category', component: null},
    { path: 'supplier', component: null},
    { path: 'user',     component: null},
    { path: 'profile',  component: UserProfileComponent },
    { path: 'icons',    component: IconsComponent }
];
