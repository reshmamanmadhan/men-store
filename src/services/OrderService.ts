import type { Order, OrderStatus } from "../models/Order";
import type { Product } from "../models/Product";

export class OrderService {
  private orders: Order[] = [];

  placeOrder(userId: string, products: Product[], totalAmount: number): Order {
    const order: Order = {
      orderId: "ORD_" + Date.now(),
      userId,
      products,
      totalAmount,
      status: "pending",
      log: `Order_${Date.now()}_${"pending"}` as `Order_${string}_pending`,
      // createdAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }

  updateStatus(orderId: string, status: OrderStatus) {
    const order = this.orders.find((o) => o.orderId === orderId);
    if (order) {
      order.status = status;
      order.log = `Order_${orderId.split("_")[1]}_${status}` as Order["log"];
    }
  }

  getAll(): Order[] {
    return this.orders;
  }
}