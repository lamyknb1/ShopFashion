import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../../services/category.service';
import {SizeService} from '../../../services/size.service';
import {ColorService} from '../../../services/color.service';
import {Subscription} from 'rxjs';
import {Category} from '../../../models/category';
import {Size} from '../../../models/size';

@Component({
  selector: 'app-category-action',
  templateUrl: './category-action.component.html',
  styleUrls: ['./category-action.component.css']
})
export class CategoryActionComponent implements OnInit {
  private subscription: Subscription;
  private categoryClass: Category[];
  private sizeClass: Size[];

  constructor(private toasterService: ToastrService,
              private categoryService: CategoryService,
              private sizeService: SizeService) { }

  ngOnInit(): void {
    this.listCategory();
    this.listSize();
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
}
