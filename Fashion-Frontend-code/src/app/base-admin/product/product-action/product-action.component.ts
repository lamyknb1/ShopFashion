import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {TokenStorageService} from '../../../auth/service-auth/token-storage.service';
import {CategoryService} from '../../../services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import {SupplierService} from '../../../services/supplier.service';
import {PictureService} from '../../../services/picture.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProductCreateComponent} from '../product-create/product-create.component';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.css']
})
export class ProductActionComponent implements OnInit {

  private subscription: Subscription;
  // page
  private page = 1;
  private totalPage: number;
  private productPage: Product[] = [];
  private listProductNotPage: Product[];
  private notification: string;

  constructor(private productService: ProductService,
              private token: TokenStorageService,
              private categoryService: CategoryService,
              private supplierService: SupplierService,
              private pictureService: PictureService,
              private fb: FormBuilder,
              private router: Router,
              public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.pageListProduct();
    this.subscription = this.productService.getListProduct().subscribe(
      (data: Product[]) => {
        this.listProductNotPage = data;
        // tslint:disable-next-line:triple-equals
        if ((this.listProductNotPage.length % 6) != 0) {
          this.totalPage = (Math.round(this.listProductNotPage.length / 6)) + 1;
        }
      }
    );
  }
  pageListProduct() {
    this.subscription = this.productService.getPageProduct(this.page).subscribe(
      data => {
        this.productPage = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  firstPage() {
    this.page = 1;
    this.ngOnInit();
  }
  previousPage() {
    this.page = this.page - 1;
    if (this.page <= 0) {
      this.page = 1;
      this.ngOnInit();
    } else {
      this.productService.getPageProduct((this.page)).subscribe(data => {
          this.productPage = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    }
  }
  nextPage() {
    this.page = this.page + 1;
    if (this.page > Math.floor(this.listProductNotPage.length / 6) + 1) {
      this.page = this.page - 1;
    }
    this.productService.getPageProduct(this.page).subscribe(data => {
        this.productPage = data; console.log(data);
      },
      error => { console.log(error);
      });
  }
  lastPage() {
    // @ts-ignore
    this.page = Math.floor(this.listProductNotPage.length / 6 + 1);
    this.productService.getPageProduct(this.page).subscribe(data => {
        this.productPage = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  deleteProduct(productId) {
    if (this.token.getToken()) {
      for (const role of this.token.getAuthorities()) {
        if (role === 'ROLE_ADMIN') { // role === 'ROLE_ADMIN' || role === 'ROLE_PM' || role === 'ROLE_USER'
          const choice = confirm('Bạn có chắc chắn muốn xoá sản phẩm?');
          if (choice) {
            this.productService.deleteProduct(productId).subscribe(
              response => {
                console.log(response);
                this.notification = `xoá sản phẩm ${productId} thành công`;
                console.log(this.notification);
                alert(`xoá sản phẩm ${productId} thành công`);
                this.firstPage();
                this.router.navigate(['admin', 'product']);
              });
          }
        }
      }
    }
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '90%';
    this.dialog.open(ProductCreateComponent, dialogConfig);
  }
  editProduct() {
    console.log('edit product');
  }
}
