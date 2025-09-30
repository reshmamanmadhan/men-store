import type { Product } from "../models/Product";

export class DiscountService {
  applyDiscount(product: Product, discountPercent: number): number {
    const discount = (product.cost * discountPercent) / 100;
    return product.cost - discount;
  }
}
