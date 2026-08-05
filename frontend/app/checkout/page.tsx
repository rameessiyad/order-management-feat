"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/app/context/cart-context";

import CheckoutForm from "@/components/checkout/checkout-form";
import OrderSummary from "@/components/checkout/order-summary";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();

  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/");
    }
  }, [cart, router]);

  if (cart.length === 0) return null;

  return (
    <main className="container mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        <OrderSummary />
      </div>
    </main>
  );
}
