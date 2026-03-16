import { c as createLucideIcon, d as useParams, u as useCart, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, e as Badge, M as Minus, S as ShoppingCart, a as ue } from "./index-b4x91cWD.js";
import { S as Skeleton } from "./skeleton-DrqqNMY_.js";
import { u as useActor, a as useQuery } from "./useActor-CDA4Lc3g.js";
import { P as Plus } from "./plus-CTlbtscY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function formatPrice(price) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}
function ProductDetailPage() {
  const { id } = useParams();
  const { actor } = useActor();
  const { addItem, items, updateQuantity } = useCart();
  const [qty, setQty] = reactExports.useState(1);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => actor.getProduct(BigInt(id)),
    enabled: !!actor && !!id
  });
  const cartItem = items.find((i) => i.productId === (product == null ? void 0 : product.id));
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-8",
        "data-ocid": "product.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 w-full rounded-xl" })
      }
    );
  if (!product)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-16 text-center",
        "data-ocid": "product.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Product not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Back to Products" }) })
        ]
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", "data-ocid": "product.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/products",
        className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6",
        "data-ocid": "product.back.link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to Products"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: product.image.getDirectURL(),
          alt: product.name,
          className: "w-full h-full object-cover",
          onError: (e) => {
            e.target.src = "/placeholder.png";
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "w-fit mb-3", children: [
          "Category #",
          product.category.toString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-3", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-primary mb-2", children: formatPrice(product.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: product.stock > 0n ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success font-medium", children: [
          "In Stock (",
          product.stock.toString(),
          " left)"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "Out of Stock" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setQty((q) => Math.max(1, q - 1)),
              "data-ocid": "product.qty.minus.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm font-medium", children: qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setQty((q) => q + 1),
              "data-ocid": "product.qty.plus.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
            }
          )
        ] }) }),
        cartItem ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => updateQuantity(product.id, cartItem.quantity - 1),
              "data-ocid": "product.dec.button",
              children: "-"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", disabled: true, className: "flex-1", children: [
            cartItem.quantity,
            " in cart"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => updateQuantity(product.id, cartItem.quantity + 1),
              "data-ocid": "product.inc.button",
              children: "+"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            disabled: product.stock <= 0n,
            onClick: () => {
              for (let i = 0; i < qty; i++)
                addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image.getDirectURL()
                });
              ue.success(`${product.name} added to cart`);
            },
            "data-ocid": "product.addcart.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5 mr-2" }),
              product.stock <= 0n ? "Out of Stock" : "Add to Cart"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProductDetailPage as default
};
