import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin-product', title: 'Quản lý Sản Phẩm',  icon: 'design_app', class: '' },
    { path: '/admin-order', title: 'Quản lý Đặt Hàng',  icon: 'shopping_delivery-fast', class: '' },
    { path: '/admin-category', title: 'Quản lý Danh Mục',  icon: 'files_single-copy-04', class: '' },
    { path: '/admin-supplier', title: 'Quản lý Nhà Cung Cấp',  icon: 'files_box', class: '' },
    { path: '/admin-user', title: 'Quản lý Người Dùng',  icon: 'users_circle-08', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'education_atom', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  }
}
