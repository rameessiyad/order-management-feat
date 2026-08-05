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
  const { addToCart } = useCart();

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

      <CardFooter>
        <Button className="w-full" onClick={() => addToCart(item)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
