import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../../services/category.service';
import {SizeService} from '../../../services/size.service';
import {ColorService} from '../../../services/color.service';
import {Subscription} from 'rxjs';
import {Category} from '../../../models/category';
import {Size} from '../../../models/size';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-category-action',
  templateUrl: './category-action.component.html',
  styleUrls: ['./category-action.component.css']
})
export class CategoryActionComponent implements OnInit {
  private subscription: Subscription;
  private categoryClass: Category[];
  private editCategory: Category;
  private deleteCategory: Category;
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
  onAddCategory(addForm: NgForm): void {
    document.getElementById('add-category-form').click();
    this.categoryService.postCategory(addForm.value).subscribe(
      (response: Category) => {
        console.log(response);
        alert('Thêm Thành Công');
        this.listCategory();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  onUpdateCategory(category: Category): void {
    document.getElementById('edit-category-form').click();
    this.categoryService.putCategory(category).subscribe(
      (response: Category) => {
        console.log(response);
        this.listCategory();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onDeleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (response: void) => {
        console.log(response);
        this.listCategory();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(category: Category, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editCategory = category;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteCategory = category;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

  // size
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
