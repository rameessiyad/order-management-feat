"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/app/context/cart-context";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">🍔</span>

          <div>
            <h1 className="text-lg font-bold">FoodExpress</h1>
            <p className="text-xs text-muted-foreground">
              Fresh Food Delivered
            </p>
          </div>
        </Link>

        <Button variant="outline" className="relative rounded-full">
          <ShoppingCart className="h-5 w-5" />

          {totalItems > 0 && (
            <Badge className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full px-1">
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
