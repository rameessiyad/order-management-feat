"use client";

import { useCart } from "@/app/context/cart-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OrderSummary() {
  const { cart, totalItems, totalPrice } = useCart();

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.menuItem.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{item.menuItem.name}</p>

              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </div>

            <span className="font-medium">
              ₹{(Number(item.menuItem.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <Separator />

        <div className="flex justify-between">
          <span>Total Items</span>

          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
