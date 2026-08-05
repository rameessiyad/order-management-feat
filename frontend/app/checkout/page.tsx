"use client";

import { useRouter } from "next/navigation";

import { useCart } from "@/app/context/cart-context";

import CheckoutForm from "@/components/checkout/checkout-form";
import OrderSummary from "@/components/checkout/order-summary";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CheckoutPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { cart } = useCart();

  if (isRedirecting) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Your cart is empty</h1>

            <p className="mt-3 text-muted-foreground">
              Add some delicious items to your cart before proceeding to
              checkout.
            </p>

            <Button className="mt-6" onClick={() => router.push("/")}>
              Browse Menu
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm onRedirecting={() => setIsRedirecting(true)} />
          </div>

          <OrderSummary />
        </div>
      </main>
    </>
  );
}
