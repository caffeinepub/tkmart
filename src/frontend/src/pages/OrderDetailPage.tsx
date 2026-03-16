import { Badge } from "@/components/ui/badge";

const ORDER_CODES_KEY = "tkmart_order_codes";
function getOrderCode(orderId: string): string {
  try {
    const codes = JSON.parse(localStorage.getItem(ORDER_CODES_KEY) ?? "{}");
    return codes[orderId] ?? "";
  } catch {
    return "";
  }
}
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Printer } from "lucide-react";
import { useParams } from "react-router-dom";
import { type Order, type OrderItem, OrderStatus } from "../backend.d";
import { useActor } from "../hooks/useActor";

function formatPrice(price: bigint) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}

const STATUS_COLORS: Record<string, string> = {
  [OrderStatus.pending]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.confirmed]: "bg-blue-100 text-blue-800",
  [OrderStatus.processing]: "bg-purple-100 text-purple-800",
  [OrderStatus.shipped]: "bg-indigo-100 text-indigo-800",
  [OrderStatus.outForDelivery]: "bg-orange-100 text-orange-800",
  [OrderStatus.delivered]: "bg-green-100 text-green-800",
  [OrderStatus.cancelled]: "bg-red-100 text-red-800",
};

function InvoiceItem({ item, index }: { item: OrderItem; index: number }) {
  return (
    <tr className="border-b">
      <td className="py-2">
        {index + 1}. Product #{item.productId.toString()}
      </td>
      <td className="text-right py-2">{item.quantity.toString()}</td>
      <td className="text-right py-2">{formatPrice(item.price)}</td>
      <td className="text-right py-2">
        {formatPrice(item.price * item.quantity)}
      </td>
    </tr>
  );
}

function Invoice({ order }: { order: Order }) {
  return (
    <div id="invoice" className="print-only p-8 max-w-2xl mx-auto">
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="font-display text-3xl font-bold">TKMART</h1>
        <p className="text-sm text-muted-foreground">Premium Shopping</p>
        <h2 className="text-xl font-bold mt-3">INVOICE</h2>
        <p className="text-sm">Order #{order.id.toString()}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="font-semibold">Bill To:</p>
          <p>{order.customerName}</p>
          <p>{order.customerPhone}</p>
          <p>{order.address}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Order Date:</p>
          <p>
            {new Date(
              Number(order.createdAt / 1_000_000n),
            ).toLocaleDateString()}
          </p>
          <p className="font-semibold mt-2">Payment:</p>
          <p>
            {order.paymentMethod.__kind__ === "cod"
              ? "Cash on Delivery"
              : `UPI: ${order.paymentMethod.upi.transactionId}`}
          </p>
        </div>
      </div>
      <table className="w-full text-sm border-collapse mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <InvoiceItem
              key={item.productId.toString()}
              item={item}
              index={i}
            />
          ))}
        </tbody>
      </table>
      <div className="text-right font-bold text-lg">
        Total: {formatPrice(order.totalAmount)}
      </div>
    </div>
  );
}

function ShippingLabel({ order }: { order: Order }) {
  return (
    <div
      id="shipping-label"
      className="print-only border-2 border-black p-6 max-w-sm mx-auto mt-8"
    >
      <h2 className="font-display text-2xl font-bold text-center border-b pb-2 mb-3">
        TKMART
      </h2>
      <p className="text-xs text-center mb-4">
        Order ID: #{order.id.toString()}
      </p>
      <div className="space-y-1">
        <p className="font-bold text-sm">DELIVER TO:</p>
        <p className="font-bold">{order.customerName}</p>
        <p className="text-sm">{order.address}</p>
        <p className="text-sm">Phone: {order.customerPhone}</p>
      </div>
    </div>
  );
}

function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <div className="flex justify-between text-sm">
      <span>
        Product #{item.productId.toString()} × {item.quantity.toString()}
      </span>
      <span className="font-medium">
        {formatPrice(item.price * item.quantity)}
      </span>
    </div>
  );
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { actor } = useActor();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => actor!.getOrder(BigInt(id!)),
    enabled: !!actor && !!id,
  });

  if (isLoading)
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-8"
        data-ocid="order.loading_state"
      >
        <Skeleton className="h-64" />
      </div>
    );
  if (!order)
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-16 text-center"
        data-ocid="order.error_state"
      >
        Order not found.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-ocid="order.page">
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="font-display text-2xl font-bold">
          Order #{order.id.toString()}
        </h1>
        <Button
          variant="outline"
          onClick={() => window.print()}
          data-ocid="order.print.button"
        >
          <Printer className="h-4 w-4 mr-2" /> Print
        </Button>
      </div>

      <div className="no-print space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold">Status</p>
              <Badge
                className={STATUS_COLORS[order.status] ?? ""}
                variant="outline"
              >
                {order.status.replace(/([A-Z])/g, " $1").trim()}
              </Badge>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div>
                <p className="text-muted-foreground">Customer</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{order.customerPhone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Address</p>
                <p className="font-medium">{order.address}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment</p>
                <p className="font-medium">
                  {order.paymentMethod.__kind__ === "cod"
                    ? "Cash on Delivery"
                    : "UPI"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Order Date</p>
                <p className="font-medium">
                  {new Date(
                    Number(order.createdAt / 1_000_000n),
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Code */}
        {(() => {
          const code = getOrderCode(order.id.toString());
          if (!code) return null;
          const delivered = order.status === OrderStatus.delivered;
          return (
            <div
              className={`rounded-xl border-2 p-4 text-center ${delivered ? "opacity-50" : ""}`}
              style={{
                borderColor: "oklch(0.78 0.14 85)",
                background: "oklch(0.78 0.14 85 / 0.08)",
              }}
              data-ocid="order.verif_code.panel"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Delivery Verification Code
              </p>
              <p
                className="text-4xl font-bold font-mono tracking-widest mb-1"
                style={{ color: "oklch(0.78 0.14 85)" }}
              >
                {code}
              </p>
              {delivered ? (
                <p className="text-xs text-muted-foreground">
                  Code expired (order delivered)
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Give this code to the delivery person when your order arrives.
                </p>
              )}
            </div>
          );
        })()}

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <OrderItemRow key={item.productId.toString()} item={item} />
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Invoice order={order} />
      <ShippingLabel order={order} />
    </div>
  );
}
