import { c as createLucideIcon, d as useParams, j as jsxRuntimeExports, B as Button, e as Badge } from "./index-Cy1OHAvE.js";
import { C as Card, a as CardContent } from "./card-DX8nNcXU.js";
import { S as Separator } from "./separator-9NnVhImH.js";
import { S as Skeleton } from "./skeleton-BjvE2dT_.js";
import { u as useActor, a as useQuery } from "./useActor-BzORTtQ7.js";
import { O as OrderStatus } from "./backend.d-Cl8msXO2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
const ORDER_CODES_KEY = "tkmart_order_codes";
function getOrderCode(orderId) {
  try {
    const codes = JSON.parse(localStorage.getItem(ORDER_CODES_KEY) ?? "{}");
    return codes[orderId] ?? "";
  } catch {
    return "";
  }
}
function formatPrice(price) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}
const STATUS_COLORS = {
  [OrderStatus.pending]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.confirmed]: "bg-blue-100 text-blue-800",
  [OrderStatus.processing]: "bg-purple-100 text-purple-800",
  [OrderStatus.shipped]: "bg-indigo-100 text-indigo-800",
  [OrderStatus.outForDelivery]: "bg-orange-100 text-orange-800",
  [OrderStatus.delivered]: "bg-green-100 text-green-800",
  [OrderStatus.cancelled]: "bg-red-100 text-red-800"
};
function InvoiceItem({ item, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2", children: [
      index + 1,
      ". Product #",
      item.productId.toString()
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right py-2", children: item.quantity.toString() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right py-2", children: formatPrice(item.price) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right py-2", children: formatPrice(item.price * item.quantity) })
  ] });
}
function Invoice({ order }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "invoice", className: "print-only p-8 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-b pb-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "TKMART" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Premium Shopping" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mt-3", children: "INVOICE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
        "Order #",
        order.id.toString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Bill To:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.customerName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.customerPhone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.address })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Order Date:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: new Date(
          Number(order.createdAt / 1000000n)
        ).toLocaleDateString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-2", children: "Payment:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.paymentMethod.__kind__ === "cod" ? "Cash on Delivery" : `UPI: ${order.paymentMethod.upi.transactionId}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2", children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2", children: "Total" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        InvoiceItem,
        {
          item,
          index: i
        },
        item.productId.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right font-bold text-lg", children: [
      "Total: ",
      formatPrice(order.totalAmount)
    ] })
  ] });
}
function ShippingLabel({ order }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "shipping-label",
      className: "print-only border-2 border-black p-6 max-w-sm mx-auto mt-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-center border-b pb-2 mb-3", children: "TKMART" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center mb-4", children: [
          "Order ID: #",
          order.id.toString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: "DELIVER TO:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: order.customerName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: order.address }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
            "Phone: ",
            order.customerPhone
          ] })
        ] })
      ]
    }
  );
}
function OrderItemRow({ item }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "Product #",
      item.productId.toString(),
      " × ",
      item.quantity.toString()
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatPrice(item.price * item.quantity) })
  ] });
}
function OrderDetailPage() {
  const { id } = useParams();
  const { actor } = useActor();
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => actor.getOrder(BigInt(id)),
    enabled: !!actor && !!id
  });
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-8",
        "data-ocid": "order.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64" })
      }
    );
  if (!order)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-16 text-center",
        "data-ocid": "order.error_state",
        children: "Order not found."
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", "data-ocid": "order.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6 no-print", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold", children: [
        "Order #",
        order.id.toString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: () => window.print(),
          "data-ocid": "order.print.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4 mr-2" }),
            " Print"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-print space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: STATUS_COLORS[order.status] ?? "",
              variant: "outline",
              children: order.status.replace(/([A-Z])/g, " $1").trim()
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mt-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.customerName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.customerPhone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Payment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.paymentMethod.__kind__ === "cod" ? "Cash on Delivery" : "UPI" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Order Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: new Date(
              Number(order.createdAt / 1000000n)
            ).toLocaleDateString() })
          ] })
        ] })
      ] }) }),
      (() => {
        const code = getOrderCode(order.id.toString());
        if (!code) return null;
        const delivered = order.status === OrderStatus.delivered;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-xl border-2 p-4 text-center ${delivered ? "opacity-50" : ""}`,
            style: {
              borderColor: "oklch(0.78 0.14 85)",
              background: "oklch(0.78 0.14 85 / 0.08)"
            },
            "data-ocid": "order.verif_code.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: "Delivery Verification Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-4xl font-bold font-mono tracking-widest mb-1",
                  style: { color: "oklch(0.78 0.14 85)" },
                  children: code
                }
              ),
              delivered ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Code expired (order delivered)" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Give this code to the delivery person when your order arrives." })
            ]
          }
        );
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3", children: "Order Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderItemRow, { item }, item.productId.toString())),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(order.totalAmount) })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Invoice, { order }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShippingLabel, { order })
  ] });
}
export {
  OrderDetailPage as default
};
