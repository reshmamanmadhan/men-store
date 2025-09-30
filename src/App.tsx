
import { useState, useEffect } from 'react';
import { getTotalSalesPerCategory, getTopSellingProducts } from './dashboard/AdminDashboard';
import { products } from './data/products';
import { mockUsers } from './data/users';
import './index.css';
import type { Order } from './models/Order';
import type { Category, Product } from './models/Product';
import type { User } from './models/User';
import { DiscountService } from './services/DiscountService';
import { OrderService } from './services/OrderService';
import { ProductService } from './services/ProductService';
import { UserService } from './services/UserService';
import { getProperty, filterByProperty } from './utils/GenericUtils';
import { validateArray, validateNumber, validateString } from './utils/ValidationUtils';

const productService = new ProductService(products);
const userService = new UserService();
const orderService = new OrderService();
const discountService = new DiscountService();

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [salesPerCategory, setSalesPerCategory] = useState<Record<Category, number> | null>(null);
  const [topProducts, setTopProducts] = useState<ReadonlyArray<{ productId: string; name: string; sold: number }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      mockUsers.forEach((user) => {
        validateString(user.userId, 'User ID');
        validateString(user.name, 'Name');
        validateString(user.email, 'Email');
        userService.register(user);
      });
      setUsers(userService.getAll());
      setOrders(orderService.getAll());
      setSalesPerCategory(getTotalSalesPerCategory(products, orders));
      setTopProducts(getTopSellingProducts(products, orders, 3));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [orders]);

  const handleAddProduct = (adminId: string, product: Product) => {
    try {
      const admin = userService.getUserById(adminId);
      if (!admin || getProperty(admin, 'role') !== 'admin') {
        throw new Error('Only admins can add products' as never);
      }
      validateString(product.productId, 'Product ID');
      validateString(product.name, 'Name');
      validateNumber(product.cost, 'Cost');
      validateArray(product.availableSizes, 'Sizes');
      productService.addProduct(admin, product);
      alert(`Product ${product.name} added successfully!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handlePlaceOrder = (userId: string, category: Category) => {
    try {
      const user = userService.getUserById(userId);
      if (!user) throw new Error('User not found');
      const orderProducts = filterByProperty(products, 'type', category);
      validateArray<Product>(orderProducts, 'Order Products');
      const totalAmount = orderProducts.reduce((sum, p) => sum + discountService.applyDiscount(p, 10), 0);
      validateNumber(totalAmount, 'Total Amount');
      const order = orderService.placeOrder(userId, orderProducts, totalAmount);
      orderService.updateStatus(order.orderId, 'paid');
      setOrders([...orderService.getAll()]);
      alert(`Order ${order.orderId} placed for ${user.name}! Total: ${totalAmount} INR`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div className="app-container">
      <h1>E-Commerce Dashboard</h1>
      {error && <div className="error">{error}</div>}
      <section>
        <h2>Admin Actions</h2>
        <button
          onClick={() =>
            handleAddProduct('u1', {
              productId: `p${Date.now()}`,
              name: 'New Product',
              cost: 1000,
              availableSizes: ['M', 'L'],
              type: 'Accessories',
              quantityInStock: 20,
              description: 'A new product',
              imageUrl: 'https://example.com/images/new.jpg',
            })
          }
        >
          Add Sample Product (Admin: Alice)
        </button>
      </section>
      <section>
        <h2>Customer Actions</h2>
        <button onClick={() => handlePlaceOrder('u2', 'Shirts')}>
          Place Order for Shirts (Bob)
        </button>
      </section>
      <section>
        <h2>Analytics</h2>
        {salesPerCategory && (
          <>
            <h3>Total Sales per Category</h3>
            <ul>
              {Object.entries(salesPerCategory).map(([category, total]) => (
                <li key={category}>
                  {category}: {total} INR
                </li>
              ))}
            </ul>
          </>
        )}
        {topProducts.length > 0 && (
          <>
            <h3>Top 3 Selling Products</h3>
            <ul>
              {topProducts.map((product) => (
                <li key={product.productId}>
                  {product.name}: {product.sold} units sold
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
};

export default App;