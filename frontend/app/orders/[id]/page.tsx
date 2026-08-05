"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { Order } from "@/lib/types";

import OrderDetails from "@/components/order/order-details";
import OrderStatusTracker from "@/components/order/order-status-tracker";
import Navbar from "@/components/common/navbar";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrder() {
      try {
        console.log("ORDER ID:", id);

        const data = await api.getOrder(Number(id));

        console.log("ORDER DATA:", data);

        setOrder(data);
      } catch (error) {
        console.log("ORDER FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const socket = connectSocket();

    socket.emit("subscribeToOrder", Number(id));

    socket.on("orderStatusUpdate", (data) => {
      console.log("STATUS UPDATE:", data);

      setOrder((prev) =>
        prev
          ? {
              ...prev,
              status: data.status,
            }
          : prev,
      );
    });

    return () => {
      socket.off("orderStatusUpdate");
      disconnectSocket();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Order not found
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>

          <p className="text-muted-foreground">Track your food delivery</p>
        </div>

        <Button variant="outline" onClick={() => router.push("/")}>
          ← Back to Menu
        </Button>

        <OrderStatusTracker status={order.status} />

        <OrderDetails order={order} />
      </main>
    </>
  );
}
