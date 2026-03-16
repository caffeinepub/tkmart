import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useCart } from "../hooks/useCart";

function formatPrice(price: bigint) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.src = "/placeholder.png";
}

export default function ProductsPage() {
  const { actor } = useActor();
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<bigint | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => actor!.getAllProducts(),
    enabled: !!actor,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => actor!.getCategories(),
    enabled: !!actor,
  });

  const filtered = (products ?? []).filter((p: Product) => {
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
          {(categories ?? []).map((cat) => (
            <Button
              key={cat.id.toString()}
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
          {filtered.map((product: Product, idx: number) => (
            <Card
              key={product.id.toString()}
              className="group hover:shadow-lg transition-shadow"
              data-ocid={`products.item.${idx + 1}`}
            >
              <CardContent className="p-0">
                <Link to={`/products/${product.id}`}>
                  <div className="aspect-square overflow-hidden rounded-t-xl bg-muted">
                    <img
                      src={product.image.getDirectURL()}
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
                    Stock: {product.stock.toString()}
                  </p>
                  <Button
                    size="sm"
                    className="w-full text-xs"
                    disabled={product.stock <= 0n}
                    onClick={() => {
                      addItem({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image.getDirectURL(),
                      });
                      toast.success(`${product.name} added to cart`);
                    }}
                    data-ocid={`products.addcart.${idx + 1}`}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    {product.stock <= 0n ? "Out of Stock" : "Add to Cart"}
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
