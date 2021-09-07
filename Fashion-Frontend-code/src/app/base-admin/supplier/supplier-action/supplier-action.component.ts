import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Supplier} from '../../../models/supplier';
import {Colors} from '../../../models/colors';
import {ColorService} from '../../../services/color.service';
import {SupplierService} from '../../../services/supplier.service';

@Component({
  selector: 'app-supplier-action',
  templateUrl: './supplier-action.component.html',
  styleUrls: ['./supplier-action.component.css']
})
export class SupplierActionComponent implements OnInit {
  private subscription: Subscription;
  private supplierClass: Supplier[];
  private colorsClass: Colors[];

  constructor(private supplierService: SupplierService,
              private colorsService: ColorService) { }

  ngOnInit(): void {
    this.listColor();
    this.listSupplier();
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
  listSupplier() {
    this.subscription = this.supplierService.getListSupplier().subscribe(
      data => {
        this.supplierClass = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
