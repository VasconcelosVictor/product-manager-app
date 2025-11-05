import { inject } from "@angular/core";
import { ProductsService } from "../../services/products.service";

export const getProdutsResolver = () => {
  const productService = inject(ProductsService);
  return productService.getAll();
}
