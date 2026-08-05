"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useCart } from "@/app/context/cart-context";

export default function CartDrawer() {
  const {
    cart,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <ShoppingCart className="h-5 w-5" />

          {totalItems > 0 && (
            <Badge className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full px-1">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-xl">Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {cart.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="rounded-xl border bg-white p-3 shadow-sm"
                >
                  <div className="flex gap-3">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={item.menuItem.imageUrl}
                        alt={item.menuItem.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">
                            {item.menuItem.name}
                          </h4>

                          <p className="text-sm text-muted-foreground">
                            ₹{item.menuItem.price}
                          </p>
                        </div>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFromCart(item.menuItem.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => decreaseQuantity(item.menuItem.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="w-5 text-center font-medium">
                            {item.quantity}
                          </span>

                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => increaseQuantity(item.menuItem.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <span className="font-semibold">
                          ₹
                          {(
                            Number(item.menuItem.price) * item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t bg-background p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Items</span>

                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>

                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <Button className="h-11 w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
