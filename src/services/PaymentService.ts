import type { Order, OrderStatus, OrderItem } from "../models/Order";

export class OrderService {
  private orders: Order[] = [];

  placeOrder(userId: string, items: OrderItem[], totalAmount: number): Order {
    const order: Order = {
      orderId: "ORD_" + Date.now(),
      userId,
      items,
      totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }

  updateStatus(orderId: string, status: OrderStatus) {
    const order = this.orders.find((o) => o.orderId === orderId);
    if (order) {
      order.status = status;
    }
  }

  getAll(): Order[] {
    return this.orders;
  }
}
