"use client";

import Link from "next/link";
import CartDrawer from "../cart/card-drawer";

export default function Navbar() {
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

        <CartDrawer />
      </div>
    </header>
  );
}
