import { r as reactExports, j as jsxRuntimeExports, s as Package, B as Button, I as Input, b as Search, a as ue, f as useNavigate, e as Badge } from "./index-Cy1OHAvE.js";
import { C as Card, a as CardContent } from "./card-DX8nNcXU.js";
import { L as Label } from "./label-D2N_xUJ0.js";
import { O as OrderStatus } from "./backend.d-Cl8msXO2.js";
import { u as useActor } from "./useActor-BzORTtQ7.js";
import { L as LoaderCircle } from "./loader-circle-VPutQR0z.js";
const STATUS_STEPS = [
  { key: OrderStatus.pending, label: "Order Placed" },
  { key: OrderStatus.confirmed, label: "Confirmed" },
  { key: OrderStatus.processing, label: "Processing" },
  { key: OrderStatus.shipped, label: "Shipped" },
  { key: OrderStatus.outForDelivery, label: "Out for Delivery" },
  { key: OrderStatus.delivered, label: "Delivered" }
];
const STATUS_COLORS = {
  [OrderStatus.pending]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.confirmed]: "bg-blue-100 text-blue-800",
  [OrderStatus.processing]: "bg-purple-100 text-purple-800",
  [OrderStatus.shipped]: "bg-indigo-100 text-indigo-800",
  [OrderStatus.outForDelivery]: "bg-orange-100 text-orange-800",
  [OrderStatus.delivered]: "bg-green-100 text-green-800",
  [OrderStatus.cancelled]: "bg-red-100 text-red-800"
};
function OrderCard({ order }) {
  const navigate = useNavigate();
  const statusIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);
  const isCancelled = order.status === OrderStatus.cancelled;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-4", "data-ocid": "track.order.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
          "Order #",
          order.id.toString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: order.customerName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          className: STATUS_COLORS[order.status] ?? "",
          variant: "outline",
          children: order.status.replace(/([A-Z])/g, " $1").trim()
        }
      )
    ] }),
    !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-0 right-0 h-0.5 bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-3 left-0 h-0.5 bg-primary transition-all duration-700",
          style: {
            width: statusIndex >= 0 ? `${statusIndex / (STATUS_STEPS.length - 1) * 100}%` : "0%"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-between", children: STATUS_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center",
          style: { width: `${100 / STATUS_STEPS.length}%` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 text-xs font-bold transition-colors ${i <= statusIndex ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground"}`,
                children: i <= statusIndex ? "✓" : i + 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mt-1 text-center text-muted-foreground hidden md:block",
                style: { maxWidth: 60 },
                children: step.label
              }
            )
          ]
        },
        step.key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: () => navigate(`/orders/${order.id}`),
        "data-ocid": "track.view_order.button",
        children: "View Details"
      }
    )
  ] }) });
}
function TrackOrderPage() {
  const { actor } = useActor();
  const [mode, setMode] = reactExports.useState("id");
  const [query, setQuery] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [orders, setOrders] = reactExports.useState(null);
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
      ue.error("No orders found.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", "data-ocid": "track.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-12 w-12 mx-auto text-primary mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Track Your Order" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Enter your order ID or phone number to track your order." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "track.search.panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: mode === "id" ? "default" : "outline",
            size: "sm",
            onClick: () => setMode("id"),
            "data-ocid": "track.byid.tab",
            children: "Order ID"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: mode === "phone" ? "default" : "outline",
            size: "sm",
            onClick: () => setMode("phone"),
            "data-ocid": "track.byphone.tab",
            children: "Phone"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: mode === "id" ? "Order ID" : "Phone Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: mode === "id" ? "Enter order ID" : "Enter phone number",
              onKeyDown: (e) => e.key === "Enter" && handleSearch(),
              "data-ocid": "track.query.search_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSearch,
              disabled: loading || !query,
              "data-ocid": "track.search.button",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }) }),
    orders !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", "data-ocid": "track.results.list", children: orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-8 text-muted-foreground",
        "data-ocid": "track.results.empty_state",
        children: "No orders found."
      }
    ) : orders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order }, order.id.toString())) })
  ] });
}
export {
  TrackOrderPage as default
};
