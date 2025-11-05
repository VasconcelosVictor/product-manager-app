import { inject } from "@angular/core";
import { ActivatedRouteSnapshot  } from "@angular/router";
import { ProductsService } from "../../services/products.service";

export const getProduct =
(route: ActivatedRouteSnapshot, ) => {
  const productService = inject(ProductsService);
  return productService.get(route.params['id']);
}
