"use client";

import {
  CheckCircle2,
  Circle,
  ChefHat,
  PackageCheck,
  Truck,
} from "lucide-react";

import { OrderStatus } from "@/lib/types";

interface OrderStatusTrackerProps {
  status: OrderStatus;
}

const STEPS = [
  {
    status: "RECEIVED" as OrderStatus,
    label: "Order Received",
    icon: PackageCheck,
  },
  {
    status: "PREPARING" as OrderStatus,
    label: "Preparing",
    icon: ChefHat,
  },
  {
    status: "OUT_FOR_DELIVERY" as OrderStatus,
    label: "Out for Delivery",
    icon: Truck,
  },
  {
    status: "DELIVERED" as OrderStatus,
    label: "Delivered",
    icon: CheckCircle2,
  },
];

export default function OrderStatusTracker({
  status,
}: OrderStatusTrackerProps) {
  const currentIndex = STEPS.findIndex((step) => step.status === status);

  return (
    <div className="space-y-6">
      {STEPS.map((step, index) => {
        const completed = index < currentIndex;
        const current = index === currentIndex;

        const Icon = step.icon;

        return (
          <div key={step.status} className="relative flex items-start gap-4">
            {index !== STEPS.length - 1 && (
              <div
                className={`absolute left-5 top-10 h-12 w-0.5 ${
                  completed ? "bg-green-500" : "bg-muted"
                }`}
              />
            )}

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors
                ${
                  completed
                    ? "border-green-500 bg-green-500 text-white"
                    : current
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-muted bg-background text-muted-foreground"
                }
              `}
            >
              {completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Icon className="h-5 w-5" />
              )}
            </div>

            <div className="pt-1">
              <p
                className={`font-medium ${
                  completed || current
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>

              {current && (
                <p className="text-sm text-orange-500">Current Status</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
