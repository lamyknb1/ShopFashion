import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8000/api/auth/admin/product';
  private url = 'http://localhost:8000/api/auth/product';

  constructor(private http: HttpClient) { }

  getListProduct(): Observable<any> {
    return this.http.get<Product[]>(`${this.url}`);
  }
  // postProduct(): Observable<any>
}
