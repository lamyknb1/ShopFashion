import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  private subscription: Subscription;
  private productClass: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProduct();
  }

  listProduct() {
    this.subscription = this.productService.getListProduct().subscribe(
      data => { this.productClass = data; console.log(data); },
        error => { console.log(error); });
  }

}
