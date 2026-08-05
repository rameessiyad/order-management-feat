"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Order } from "@/lib/types";

import OrderStatusBadge from "./order-status-badge";
import OrderStatusTracker from "./order-status-tracker";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left */}
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Order #{order.id}</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <OrderStatusBadge status={order.status} />
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold">Customer</h3>

              <p className="text-muted-foreground">{order.customerName}</p>

              <p className="text-muted-foreground">{order.phone}</p>

              <p className="text-muted-foreground">{order.address}</p>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 font-semibold">Ordered Items</h3>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{item.menuItem.name}</p>

                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ₹{(Number(item.priceAtOrder) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total Amount</span>

              <span>₹{Number(order.totalAmount).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right */}
      <div>
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>

          <CardContent>
            <OrderStatusTracker status={order.status} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
