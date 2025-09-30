import type { Product, Category } from "../models/Product";
import type { User } from "../models/User";

export class ProductService {
  private products: Product[] = [];

  constructor(initialProducts: Product[] = []) {
    this.products = initialProducts;
  }

  addProduct(user: User, product: Product) { //by admin only
    if (user.role !== "admin") {
      throw new Error("Only admin can add products");
    }
    this.products.push(product);
  }

  updateProduct(productId: string, update: Partial<Product>) {
    this.products = this.products.map((p) =>
      p.productId === productId ? { ...p, ...update } : p
    );
  }

  deleteProduct(productId: string) {
    this.products = this.products.filter((p) => p.productId !== productId);
  }

  filterByCategory(category: Category): Product[] {
    return this.products.filter((p) => p.type === category);
  }

  getAll(): Product[] {
    return this.products;
  }
}
