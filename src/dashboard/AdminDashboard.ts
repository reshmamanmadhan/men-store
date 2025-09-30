import type { Product, Category } from "../models/Product";
import type { Order } from "../models/Order";

function getTotalSalesPerCategory(products: Product[], orders: Order[]): Record<Category, number> {
  const sales: Record<Category, number> = {
    Shirts: 0,
    Trousers: 0,
    Jackets: 0,
    Accessories: 0,
  };

  for (const order of orders) {
    for (const product of order.products) {
      const matchedProduct = products.find(p => p.productId === product.productId);
      if (matchedProduct) {
        sales[matchedProduct.type] += product.cost;
      }
    }
  }

  return sales;
}

function getTopSellingProducts(products: Product[], orders: Order[], topN: number = 3): ReadonlyArray<{ productId: string; name: string; sold: number }> {
  const salesCount: Record<string, { name: string; sold: number }> = {};

  for (const order of orders) {
    for (const product of order.products) {
      if (!salesCount[product.productId]) {
        salesCount[product.productId] = { name: product.name, sold: 0 };
      }
      salesCount[product.productId].sold += 1;
    }
  }

  return Object.entries(salesCount)
    .sort(([, a], [, b]) => b.sold - a.sold)
    .slice(0, topN)
    .map(([productId, data]) => ({ productId, name: data.name, sold: data.sold }));
}

export { getTotalSalesPerCategory, getTopSellingProducts };
