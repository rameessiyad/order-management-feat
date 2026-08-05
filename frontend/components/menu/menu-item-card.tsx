"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/lib/types";
import { useCart } from "@/app/context/cart-context";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const cartItem = cart.find((cartItem) => cartItem.menuItem.id === item.id);

  return (
    <Card className="overflow-hidden rounded-xl shadow-sm">
      <div className="relative h-48 w-full">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="space-y-2 pt-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <p className="text-lg font-bold">₹{item.price}</p>
      </CardContent>

      <CardFooter className="block">
        {!cartItem ? (
          <Button onClick={() => addToCart(item)} className="rounded-full w-full">
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-full border p-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </Button>

            <span className="w-6 text-center font-semibold">
              {cartItem.quantity}
            </span>

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
