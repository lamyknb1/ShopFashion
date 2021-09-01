import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {Category} from '../../models/category';
import {FormGroup, Validators} from '@angular/forms';
import {Supplier} from '../../models/supplier';
import {TokenStorageService} from '../../auth/service-auth/token-storage.service';
import {CategoryService} from '../../services/category.service';
import {SupplierService} from '../../services/supplier.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {PictureService} from '../../services/picture.service';
import {formatNumber} from '@angular/common';
// import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  private subscription: Subscription;
  private productClass: Product[];
  // create
  productForm: FormGroup;
  product: Product;
  message = false;
  category: any;
  supplier: any;
  pictures: any[];
  price: any;
  name: any;
  quantity: any;
  description: any;
  categoryId: any;
  supplierId: any;
  supplierList: Supplier[];
  categoryList: Category[];
  previewUrl: any[];
  useFile: any[];
  // page
  private page = 1;
  private totalPage: number;
  private productPage: Product[];
  private listProductNotPage: Product[];
  // delete
  notification: string;
  // edit

  constructor(private productService: ProductService,
              private token: TokenStorageService,
              private categoryService: CategoryService,
              private supplierService: SupplierService,
              private pictureService: PictureService,
              private fb: FormBuilder,
              private router: Router,
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
    this.productForm = this.fb.group({
      productId: '',
      name: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      // category: [''],
      // supplier: [''],
    });
    this.supplierService.getListSupplier().subscribe(next => this.supplierList = next);
    this.categoryService.getListCategory().subscribe(next => this.categoryList = next);
    this.useFile = [];
    this.previewUrl = [];
    this.pictures = [];
    this.category = [];
    this.supplier = [];
  }
  /*listProduct() {
    this.subscription = this.productService.getListProduct().subscribe(
      data => {
        this.productClass = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }*/
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
  createProduct() {
    console.log('Thêm sản phẩm');
    this.product.pictures = this.pictures;
    this.product.category = this.category;
    this.product.supplier = this.supplier;
    this.productService.postProduct(this.product).subscribe(next => {
      this.ngOnInit();
      // this.message = true;
      alert('Thêm Thành Công!');
      this.lastPage();
    });
  }
  selectCategoryById(id) {
    this.subscription = this.categoryService.getCategoryById(id).subscribe(
      data => this.category = data);
  }
  selectSupplierById(id) {
    this.subscription = this.supplierService.getSupplierById(id).subscribe(
      data => this.supplier = data);
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
  onSubmit() {
    if (this.productForm.valid) {
      const {value} = this.productForm;
      this.product = value;
      for (const preview of this.previewUrl) {
        this.pictureService.postPicture(preview).subscribe(
          next => {
            this.pictures.push({
              pictureId: next
            });
          }
        );
      }
    } else {
      console.log('error');
    }
    setTimeout(() => {
      this.createProduct();
    }, 2);
  }
  preview() {
    // Show preview
    for (let i = 0; i < this.useFile.length; i++) {
      const mimeType = this.useFile[i].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.useFile[i]);
      reader.onload = event => {
        if (typeof reader.result === 'string') {
          this.previewUrl[i] = reader.result;
        }
      };
    }
    console.log(this.previewUrl);
  }
  onSelectFile(event) {
    this.useFile = [];
    this.useFile = event.srcElement.files;
    console.log(this.useFile);
    this.preview();
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
  openEdit(product: any) {

  }
  editProduct(product) {
    console.log(`chỉnh sửa sản phẩm`);
    this.productService.putProduct(this.product).subscribe(next => {
      this.firstPage();
      alert('Update is succeed!');
    });
  }
}
