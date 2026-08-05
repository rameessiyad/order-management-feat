import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const STATUS_STYLES: Record<
  OrderStatus,
  {
    label: string;
    className: string;
  }
> = {
  RECEIVED: {
    label: "Order Received",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },

  PREPARING: {
    label: "Preparing",
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },

  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    className: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },

  DELIVERED: {
    label: "Delivered",
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = STATUS_STYLES[status];

  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
}
