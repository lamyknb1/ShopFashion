import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../services/category.service';
import {Subscription} from 'rxjs';
import {Category} from '../../models/category';
import {SizeService} from '../../services/size.service';
import {Size} from '../../models/size';
import {ColorService} from '../../services/color.service';
import {Colors} from '../../models/colors';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  private subscription: Subscription;
  private categoryClass: Category[];
  private sizeClass: Size[];
  private colorsClass: Colors[];
  constructor(private toasterService: ToastrService,
              private categoryService: CategoryService,
              private sizeService: SizeService,
              private colorsService: ColorService) {}

  ngOnInit() {
    this.listCategory();
    this.listSize();
    this.listColor();
  }
  listCategory() {
    this.subscription = this.categoryService.getListCategory().subscribe(
      data => {
        this.categoryClass = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  listSize() {
    this.subscription = this.sizeService.getSizeList().subscribe(
      data => {
        this.sizeClass = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  listColor() {
    this.subscription = this.colorsService.getColorList().subscribe(
      data => {
        this.colorsClass = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
