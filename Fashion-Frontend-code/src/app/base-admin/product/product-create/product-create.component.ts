import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {Supplier} from '../../../models/supplier';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {SupplierService} from '../../../services/supplier.service';
import {PictureService} from '../../../services/picture.service';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {TokenStorageService} from '../../../auth/service-auth/token-storage.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  product: Product;
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

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public message: string,
              private categoryService: CategoryService,
              private supplierService: SupplierService,
              private pictureService: PictureService,
              private fb: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]],
    });
  }
  onSubmit() {
    console.log('mai k fix dc');
  }
  onClick() {
    console.log('mtp');
  }
}
