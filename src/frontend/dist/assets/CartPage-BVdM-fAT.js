import { u as useCart, f as useNavigate, j as jsxRuntimeExports, B as Button, L as Link, M as Minus } from "./index-Cy1OHAvE.js";
import { C as Card, a as CardContent } from "./card-DX8nNcXU.js";
import { S as Separator } from "./separator-9NnVhImH.js";
import { S as ShoppingBag } from "./shopping-bag-CqBTPlHY.js";
import { P as Plus } from "./plus-Dn0c_s3o.js";
import { T as Trash2 } from "./trash-2-X42nrFJ9.js";
function formatPrice(price) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}
function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  if (items.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-24 text-center",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-16 w-16 mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Add some products to get started." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "cart.shop.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Shop Now" }) })
        ]
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", "data-ocid": "cart.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-6", children: "Shopping Cart" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 space-y-3", "data-ocid": "cart.list", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `cart.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex gap-4 items-center", children: [
            item.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.image,
                alt: item.name,
                className: "w-16 h-16 rounded-lg object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold", children: formatPrice(item.price) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => updateQuantity(item.productId, item.quantity - 1),
                  "data-ocid": `cart.dec.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-sm", children: item.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => updateQuantity(item.productId, item.quantity + 1),
                  "data-ocid": `cart.inc.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold w-20 text-right", children: formatPrice(item.price * BigInt(item.quantity)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "text-destructive",
                onClick: () => removeItem(item.productId),
                "data-ocid": `cart.delete_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        },
        item.productId.toString()
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "cart.summary.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "Free" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full mt-4",
            onClick: () => navigate("/checkout"),
            "data-ocid": "cart.checkout.button",
            children: "Proceed to Checkout"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "w-full mt-2 text-destructive",
            onClick: clearCart,
            "data-ocid": "cart.clear.button",
            children: "Clear Cart"
          }
        )
      ] }) }) })
    ] })
  ] });
}
export {
  CartPage as default
};
