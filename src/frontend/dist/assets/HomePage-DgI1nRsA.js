import { c as createLucideIcon, u as useCart, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, S as ShoppingCart, a as ue } from "./index-Cy1OHAvE.js";
import { C as Card, a as CardContent } from "./card-DX8nNcXU.js";
import { S as Skeleton } from "./skeleton-BjvE2dT_.js";
import { u as useActor, a as useQuery } from "./useActor-BzORTtQ7.js";
import { l as loadLocalProducts } from "./useLocalProducts-CrYzXwer.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
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
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
const Quote = createLucideIcon("quote", __iconNode);
function formatPrice(price) {
  return `₹${(price / 100).toFixed(2)}`;
}
const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];
function handleImageError(e) {
  const img = e.currentTarget;
  img.src = "/placeholder.png";
}
function HomePage() {
  const { actor } = useActor();
  const { addItem } = useCart();
  const [products, setProducts] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    setProducts(loadLocalProducts());
    setIsLoading(false);
    const handler = () => setProducts(loadLocalProducts());
    window.addEventListener("tkmart_products_updated", handler);
    return () => window.removeEventListener("tkmart_products_updated", handler);
  }, []);
  const { data: adVideos } = useQuery({
    queryKey: ["adVideos"],
    queryFn: () => actor.getActiveAdVideos(),
    enabled: !!actor
  });
  const handleAddToCart = (product) => {
    addItem({
      productId: BigInt(product.id),
      name: product.name,
      price: BigInt(product.price),
      image: product.imageUrl
    });
    ue.success(`${product.name} added to cart`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[90vh] flex items-center justify-center overflow-hidden",
        "data-ocid": "home.hero.section",
        style: {
          background: "radial-gradient(ellipse at 50% 0%, oklch(0.25 0.06 75 / 0.5) 0%, oklch(0.12 0.01 45) 70%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-0 left-0 right-0 h-px",
                    style: {
                      background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 0.5), transparent)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 right-0 h-px",
                    style: {
                      background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 0.3), transparent)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 opacity-5",
                    style: {
                      backgroundImage: "repeating-linear-gradient(0deg, oklch(0.78 0.14 85) 0px, oklch(0.78 0.14 85) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, oklch(0.78 0.14 85) 0px, oklch(0.78 0.14 85) 1px, transparent 1px, transparent 60px)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 text-center animate-fade-in relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs font-semibold uppercase tracking-[0.3em] mb-6",
                style: { color: "oklch(0.78 0.14 85)" },
                children: "✦ Premium Shopping Experience ✦"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-6xl md:text-8xl font-bold mb-4 gold-shimmer", children: "TKMART" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display text-2xl md:text-3xl italic mb-6",
                style: { color: "oklch(0.88 0.10 85)" },
                children: "Luxury. Delivered."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed", children: "Experience premium shopping with curated products and TKMART Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 justify-center flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  className: "px-8 font-semibold tracking-wide",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.78 0.14 85), oklch(0.88 0.18 90))",
                    color: "oklch(0.12 0.01 45)"
                  },
                  "data-ocid": "hero.shop.button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                    "Shop Now ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  variant: "outline",
                  className: "px-8 border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary/70",
                  "data-ocid": "hero.track.button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/track", children: "Track Order" })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    adVideos && adVideos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 px-4 bg-muted", "data-ocid": "home.ads.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-2", children: adVideos.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-shrink-0 w-80 rounded-lg overflow-hidden border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              src: v.video.getDirectURL(),
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              className: "w-full h-48 object-cover",
              "aria-label": v.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 text-sm font-medium text-center", children: v.title })
        ]
      },
      v.id.toString()
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4", "data-ocid": "home.products.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs uppercase tracking-widest mb-1",
              style: { color: "oklch(0.78 0.14 85)" },
              children: "Curated Selection"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold", children: "Featured Products" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "ghost",
            className: "text-primary hover:text-primary/80",
            "data-ocid": "home.viewall.button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
              "View All ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
            ] })
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-4 gap-4",
          "data-ocid": "home.products.loading_state",
          children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }, k))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-4 gap-4",
          "data-ocid": "home.products.list",
          children: ((products == null ? void 0 : products.slice(0, 8)) ?? []).map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "group hover:border-primary/50 transition-all duration-300 bg-card border-border overflow-hidden",
              "data-ocid": `home.product.item.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/products/${product.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl || "/placeholder.png",
                    alt: product.name,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                    onError: handleImageError
                  }
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/products/${product.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm line-clamp-1 hover:text-primary transition-colors", children: product.name }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-bold mt-1",
                      style: { color: "oklch(0.78 0.14 85)" },
                      children: formatPrice(product.price)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "w-full mt-2 text-xs",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.78 0.14 85), oklch(0.88 0.18 90))",
                        color: "oklch(0.12 0.01 45)"
                      },
                      onClick: () => handleAddToCart(product),
                      "data-ocid": `home.product.addcart.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3 w-3 mr-1" }),
                        " Add to Cart"
                      ]
                    }
                  )
                ] })
              ] })
            },
            String(product.id)
          ))
        }
      ),
      !isLoading && (!products || products.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 text-muted-foreground",
          "data-ocid": "home.products.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No products available yet." })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 px-4",
        "data-ocid": "home.owner.section",
        style: {
          background: "linear-gradient(135deg, oklch(0.14 0.015 55), oklch(0.18 0.02 65))"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs uppercase tracking-widest text-center mb-2",
              style: { color: "oklch(0.78 0.14 85)" },
              children: "About the Founder"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-center mb-10", children: "The Vision Behind TKMART" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8",
              style: {
                background: "oklch(0.16 0.012 45)",
                border: "1px solid oklch(0.78 0.14 85 / 0.3)",
                boxShadow: "0 0 40px oklch(0.78 0.14 85 / 0.08)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-28 h-28 rounded-full flex items-center justify-center font-display text-2xl font-bold",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.20 0.02 55), oklch(0.25 0.03 65))",
                      border: "2px solid oklch(0.78 0.14 85 / 0.6)",
                      color: "oklch(0.78 0.14 85)",
                      boxShadow: "0 0 20px oklch(0.78 0.14 85 / 0.2)"
                    },
                    children: "ATK"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold mb-1", children: "Ashwin T K" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-medium tracking-wide mb-4",
                      style: { color: "oklch(0.78 0.14 85)" },
                      children: "Founder & CEO, TKMART"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Quote,
                      {
                        className: "absolute -top-1 -left-1 w-5 h-5 opacity-40",
                        style: { color: "oklch(0.78 0.14 85)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display text-lg italic pl-6",
                        style: { color: "oklch(0.88 0.10 85)" },
                        children: "Bringing premium products to your doorstep since 2024"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "TKMART was founded with a vision to make luxury accessible. We curate the finest products and ensure they reach you with care and speed." })
                ] })
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  HomePage as default
};
