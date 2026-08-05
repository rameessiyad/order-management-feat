"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { Order } from "@/lib/types";

import OrderDetails from "@/components/order/order-details";
import OrderStatusTracker from "@/components/order/order-status-tracker";
import Navbar from "@/components/common/navbar";
import { connectSocket, disconnectSocket } from "@/lib/socket";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderPage({ params }: PageProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { id } = await params;

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
  }, [params]);

  useEffect(() => {
    async function setupOrder() {
      const { id } = await params;

      setOrderId(id);

      const socket = connectSocket();

      socket.emit("joinOrder", id);

      socket.on("orderStatusUpdated", (updatedOrder) => {
        console.log("STATUS UPDATED:", updatedOrder);

        setOrder((prev) => {
          if (!prev) return updatedOrder;

          return {
            ...prev,
            status: updatedOrder.status,
          };
        });
      });

      return () => {
        socket.off("orderStatusUpdated");
        disconnectSocket();
      };
    }

    setupOrder();
  }, [params]);

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

        <OrderStatusTracker status={order.status} />

        <OrderDetails order={order} />
      </main>
    </>
  );
}
