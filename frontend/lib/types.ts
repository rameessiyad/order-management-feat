export type OrderStatus =
  | "RECEIVED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  priceAtOrder: string;
  menuItem: MenuItem;
}

export interface Order {
  id: number;
  customerName: string;
  address: string;
  phone: string;
  status: OrderStatus;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  customerName: string;
  address: string;
  phone: string;
  items: { menuItemId: number; quantity: number }[];
}
