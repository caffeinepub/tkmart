import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Package, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { type Order, OrderStatus } from "../backend.d";
import { useActor } from "../hooks/useActor";

const STATUS_STEPS = [
  { key: OrderStatus.pending, label: "Order Placed" },
  { key: OrderStatus.confirmed, label: "Confirmed" },
  { key: OrderStatus.processing, label: "Processing" },
  { key: OrderStatus.shipped, label: "Shipped" },
  { key: OrderStatus.outForDelivery, label: "Out for Delivery" },
  { key: OrderStatus.delivered, label: "Delivered" },
];

const STATUS_COLORS: Record<string, string> = {
  [OrderStatus.pending]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.confirmed]: "bg-blue-100 text-blue-800",
  [OrderStatus.processing]: "bg-purple-100 text-purple-800",
  [OrderStatus.shipped]: "bg-indigo-100 text-indigo-800",
  [OrderStatus.outForDelivery]: "bg-orange-100 text-orange-800",
  [OrderStatus.delivered]: "bg-green-100 text-green-800",
  [OrderStatus.cancelled]: "bg-red-100 text-red-800",
};

function OrderCard({ order }: { order: Order }) {
  const navigate = useNavigate();
  const statusIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);
  const isCancelled = order.status === OrderStatus.cancelled;

  return (
    <Card className="mb-4" data-ocid="track.order.card">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-semibold">Order #{order.id.toString()}</p>
            <p className="text-sm text-muted-foreground">
              {order.customerName}
            </p>
          </div>
          <Badge
            className={STATUS_COLORS[order.status] ?? ""}
            variant="outline"
          >
            {order.status.replace(/([A-Z])/g, " $1").trim()}
          </Badge>
        </div>

        {!isCancelled && (
          <div className="relative mb-4">
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-border" />
            <div
              className="absolute top-3 left-0 h-0.5 bg-primary transition-all duration-700"
              style={{
                width:
                  statusIndex >= 0
                    ? `${(statusIndex / (STATUS_STEPS.length - 1)) * 100}%`
                    : "0%",
              }}
            />
            <div className="relative flex justify-between">
              {STATUS_STEPS.map((step, i) => (
                <div
                  key={step.key}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / STATUS_STEPS.length}%` }}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 text-xs font-bold transition-colors ${
                      i <= statusIndex
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    {i <= statusIndex ? "✓" : i + 1}
                  </div>
                  <p
                    className="text-xs mt-1 text-center text-muted-foreground hidden md:block"
                    style={{ maxWidth: 60 }}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/orders/${order.id}`)}
          data-ocid="track.view_order.button"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default function TrackOrderPage() {
  const { actor } = useActor();
  const [mode, setMode] = useState<"id" | "phone">("id");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);

  async function handleSearch() {
    if (!actor || !query) return;
    setLoading(true);
    try {
      if (mode === "id") {
        const order = await actor.getOrder(BigInt(query));
        setOrders([order]);
      } else {
        const found = await actor.getOrdersByPhone(query);
        setOrders(found);
      }
    } catch {
      toast.error("No orders found.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-ocid="track.page">
      <div className="text-center mb-8">
        <Package className="h-12 w-12 mx-auto text-primary mb-3" />
        <h1 className="font-display text-3xl font-bold">Track Your Order</h1>
        <p className="text-muted-foreground mt-2">
          Enter your order ID or phone number to track your order.
        </p>
      </div>

      <Card data-ocid="track.search.panel">
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-2">
            <Button
              variant={mode === "id" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("id")}
              data-ocid="track.byid.tab"
            >
              Order ID
            </Button>
            <Button
              variant={mode === "phone" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("phone")}
              data-ocid="track.byphone.tab"
            >
              Phone
            </Button>
          </div>
          <div>
            <Label>{mode === "id" ? "Order ID" : "Phone Number"}</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  mode === "id" ? "Enter order ID" : "Enter phone number"
                }
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                data-ocid="track.query.search_input"
              />
              <Button
                onClick={handleSearch}
                disabled={loading || !query}
                data-ocid="track.search.button"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {orders !== null && (
        <div className="mt-6" data-ocid="track.results.list">
          {orders.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground"
              data-ocid="track.results.empty_state"
            >
              No orders found.
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard key={order.id.toString()} order={order} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
