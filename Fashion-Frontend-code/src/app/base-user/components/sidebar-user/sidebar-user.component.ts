import { Component, OnInit } from '@angular/core';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'trangchu', title: 'Trang Chủ',  icon: 'design_app', class: '' },
  { path: 'sanpham', title: 'Sản Phẩm',  icon: 'design_app', class: '' },
  { path: 'giohang', title: 'Giỏ hàng',  icon: 'design_app', class: '' },

];
@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {

   menuItems: any[];
  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
