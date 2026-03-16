import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../hooks/useCart";
import type { LocalProduct } from "../hooks/useLocalProducts";
import { loadLocalProducts } from "../hooks/useLocalProducts";

function formatPrice(price: number) {
  return `₹${(price / 100).toFixed(2)}`;
}

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.src = "/placeholder.png";
}

export default function ProductsPage() {
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
          { id: p.category, name: p.categoryName },
        ]),
      ).values(),
    ).filter((c) => c.name),
  };

  const filtered = products.filter((p: LocalProduct) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === null || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-ocid="products.page">
      <h1 className="font-display text-3xl font-bold mb-6">All Products</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="products.search_input"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            data-ocid="products.all.tab"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              data-ocid="products.category.tab"
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          data-ocid="products.loading_state"
        >
          {SKELETON_KEYS.map((k) => (
            <Skeleton key={k} className="h-72 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-24 text-muted-foreground"
          data-ocid="products.empty_state"
        >
          No products found.
        </div>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          data-ocid="products.list"
        >
          {filtered.map((product: LocalProduct, idx: number) => (
            <Card
              key={String(product.id)}
              className="group hover:shadow-lg transition-shadow"
              data-ocid={`products.item.${idx + 1}`}
            >
              <CardContent className="p-0">
                <Link to={`/products/${product.id}`}>
                  <div className="aspect-square overflow-hidden rounded-t-xl bg-muted">
                    <img
                      src={product.imageUrl || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={handleImageError}
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary mb-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-primary font-bold">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Stock: {product.stock}
                  </p>
                  <Button
                    size="sm"
                    className="w-full text-xs"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      addItem({
                        productId: BigInt(product.id),
                        name: product.name,
                        price: BigInt(product.price),
                        image: product.imageUrl,
                      });
                      toast.success(`${product.name} added to cart`);
                    }}
                    data-ocid={`products.addcart.${idx + 1}`}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
