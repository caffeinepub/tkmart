import { c as createLucideIcon, d as useParams, u as useCart, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, e as Badge, M as Minus, S as ShoppingCart, a as ue } from "./index-CUvGTilV.js";
import { S as Skeleton } from "./skeleton-DlZjQ4Jl.js";
import { g as getLocalProduct } from "./useLocalProducts-CrYzXwer.js";
import { P as Plus } from "./plus-T302F43B.js";
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
  return `₹${(price / 100).toFixed(2)}`;
}
function ProductDetailPage() {
  const { id } = useParams();
  const { addItem, items, updateQuantity } = useCart();
  const [qty, setQty] = reactExports.useState(1);
  const [product, setProduct] = reactExports.useState(void 0);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (id) {
      setProduct(getLocalProduct(Number(id)));
    }
    setIsLoading(false);
    const handler = () => {
      if (id) setProduct(getLocalProduct(Number(id)));
    };
    window.addEventListener("tkmart_products_updated", handler);
    return () => window.removeEventListener("tkmart_products_updated", handler);
  }, [id]);
  const cartItem = items.find((i) => i.productId === BigInt((product == null ? void 0 : product.id) ?? 0));
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
          src: product.imageUrl || "/placeholder.png",
          alt: product.name,
          className: "w-full h-full object-cover",
          onError: (e) => {
            e.target.src = "/placeholder.png";
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "w-fit mb-3", children: product.categoryName || `Category #${product.category}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-3", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-primary mb-2", children: formatPrice(product.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: product.stock > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success font-medium", children: [
          "In Stock (",
          product.stock,
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
              onClick: () => updateQuantity(BigInt(product.id), cartItem.quantity - 1),
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
              onClick: () => updateQuantity(BigInt(product.id), cartItem.quantity + 1),
              "data-ocid": "product.inc.button",
              children: "+"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            disabled: product.stock <= 0,
            onClick: () => {
              for (let i = 0; i < qty; i++)
                addItem({
                  productId: BigInt(product.id),
                  name: product.name,
                  price: BigInt(product.price),
                  image: product.imageUrl
                });
              ue.success(`${product.name} added to cart`);
            },
            "data-ocid": "product.addcart.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5 mr-2" }),
              product.stock <= 0 ? "Out of Stock" : "Add to Cart"
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
