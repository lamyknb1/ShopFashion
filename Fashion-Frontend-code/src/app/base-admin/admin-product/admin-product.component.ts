import { Component, OnInit } from '@angular/core';
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
  previewUrl: any[];
  useFile: any[];
  pictures: any[];
  price: any;
  name: any;
  quantity: any;
  supplierList: Supplier[];
  categoryList: Category[];
  // page
  private page = 1;
  private totalPage: number;
  private productPage: Product[];
  private listProductNotPage: Product[];


  constructor(private productService: ProductService,
              private token: TokenStorageService,
              private categoryService: CategoryService,
              private supplierService: SupplierService,
              private fb: FormBuilder,
              private router: Router,
              ) { }

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
    this.supplierService.getListSupplier().subscribe(next => this.supplierList = next);
    this.categoryService.getListCategory().subscribe(next => this.categoryList = next);

    this.productForm = this.fb.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]]
    });
  }
  listProduct() {
    this.subscription = this.productService.getListProduct().subscribe(
      data => { this.productClass = data; console.log(data); },
        error => { console.log(error); }
        );
  }
  pageListProduct() {
    this.subscription = this.productService.getPageProduct(this.page).subscribe(
      data => { this.productPage = data; console.log(data); },
      error => { console.log(error); }
    );
  }
  createProduct() {
    if (this.token.getToken()) {
      this.product.pictures = this.pictures;
      this.product.category = this.category;
      this.product.supplier = this.supplier;
      this.productService.postProduct(this.product).subscribe(next => {
        this.ngOnInit();
        this.message = true;
        alert('Created a new product!');
      });
    }
  }

  selectCategory(id) {
    this.subscription = this.categoryService.getCategoryById(id).subscribe(
      next => this.category = next);
  }
  selectSupplier(id) {
    this.subscription = this.supplierService.getSupplierById(id).subscribe(
      next => this.supplier = next);
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
      this.productService.getPageProduct((this.page)).subscribe(data => { this.productPage = data; console.log(data); },
        error => { console.log(error);
      });
    }
  }
  nextPage() {
    this.page = this.page + 1;
    if (this.page > this.totalPage) {
      this.page = this.page - 1;
    }
    this.productService.getPageProduct((this.page)).subscribe(data => { this.productPage = data; console.log(data); },
      error => { console.log(error);
      });
  }
  lastPage() {
    this.page = ((this.listProductNotPage.length % 6) + 1);
    this.productService.getPageProduct((this.page)).subscribe(data => { this.productPage = data; console.log(data); },
      error => { console.log(error);
      });
  }
}
