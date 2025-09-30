import type { Order } from "../models/Order";
import { products } from "./products";

export const orders: Order[] = [
  {
    orderId: "ORD_001",
    userId: "u1",
    products: [products[0], products[1]],
    totalAmount: products[0].cost + products[1].cost,
    status: "pending",
    log: `Order_001_pending`,
  },
  {
    orderId: "ORD_002",
    userId: "u2",
    products: [products[2]],
    totalAmount: products[2].cost,
    status: "paid",
    log: `Order_002_paid`,
  },
  {
    orderId: "ORD_003",
    userId: "u1",
    products: [products[1], products[3]],
    totalAmount: products[1].cost + products[3].cost,
    status: "shipped",
    log: `Order_003_shipped`,
  },
];
