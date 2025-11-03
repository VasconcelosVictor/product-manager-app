import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/products.inteface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);

  constructor() { }

  getAll(){
    return this.httpClient.get<Product[]>('/api/products');
  }
  get(id: string){
    return this.httpClient.get<Product>(`/api/products/${id}`);
  }
  post(playload: ProductPayload) {
    return this.httpClient.post('/api/products', playload);
  }

  put(id: string, playload: ProductPayload) {
    return this.httpClient.put(`/api/products/${id}`, playload);
  }




}
