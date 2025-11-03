import { Product } from "./products.inteface";

export type ProductPayload = Omit<Product, 'id'>;