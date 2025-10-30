import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/products.inteface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);
    
  constructor() { }

  getAll(){
    return this.httpClient.get<Product[]>('/api/products');

  }

  
}
