import { u as useCart, r as reactExports, j as jsxRuntimeExports, b as Search, I as Input, B as Button, L as Link, S as ShoppingCart, a as ue } from "./index-Cy1OHAvE.js";
import { C as Card, a as CardContent } from "./card-DX8nNcXU.js";
import { S as Skeleton } from "./skeleton-BjvE2dT_.js";
import { l as loadLocalProducts } from "./useLocalProducts-CrYzXwer.js";
function formatPrice(price) {
  return `₹${(price / 100).toFixed(2)}`;
}
const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];
function handleImageError(e) {
  e.currentTarget.src = "/placeholder.png";
}
function ProductsPage() {
  const { addItem } = useCart();
  const [search, setSearch] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const [products, setProducts] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    setProducts(loadLocalProducts());
    setIsLoading(false);
    const handler = () => setProducts(loadLocalProducts());
    window.addEventListener("tkmart_products_updated", handler);
    return () => window.removeEventListener("tkmart_products_updated", handler);
  }, []);
  const { data: categories } = {
    data: Array.from(
      new Map(
        products.map((p) => [
          p.category,
          { id: p.category, name: p.categoryName }
        ])
      ).values()
    ).filter((c) => c.name)
  };
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === null || p.category === selectedCategory;
    return matchSearch && matchCat;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", "data-ocid": "products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-6", children: "All Products" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search products...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "products.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: selectedCategory === null ? "default" : "outline",
            size: "sm",
            onClick: () => setSelectedCategory(null),
            "data-ocid": "products.all.tab",
            children: "All"
          }
        ),
        categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: selectedCategory === cat.id ? "default" : "outline",
            size: "sm",
            onClick: () => setSelectedCategory(cat.id),
            "data-ocid": "products.category.tab",
            children: cat.name
          },
          cat.id
        ))
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-4 gap-4",
        "data-ocid": "products.loading_state",
        children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl" }, k))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-24 text-muted-foreground",
        "data-ocid": "products.empty_state",
        children: "No products found."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-4 gap-4",
        "data-ocid": "products.list",
        children: filtered.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "group hover:shadow-lg transition-shadow",
            "data-ocid": `products.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/products/${product.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden rounded-t-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl || "/placeholder.png",
                  alt: product.name,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                  onError: handleImageError
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/products/${product.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm line-clamp-2 hover:text-primary mb-1", children: product.name }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold", children: formatPrice(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
                  "Stock: ",
                  product.stock
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "w-full text-xs",
                    disabled: product.stock <= 0,
                    onClick: () => {
                      addItem({
                        productId: BigInt(product.id),
                        name: product.name,
                        price: BigInt(product.price),
                        image: product.imageUrl
                      });
                      ue.success(`${product.name} added to cart`);
                    },
                    "data-ocid": `products.addcart.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3 w-3 mr-1" }),
                      product.stock <= 0 ? "Out of Stock" : "Add to Cart"
                    ]
                  }
                )
              ] })
            ] })
          },
          String(product.id)
        ))
      }
    )
  ] });
}
export {
  ProductsPage as default
};
