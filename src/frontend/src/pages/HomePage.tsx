import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Quote, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useCart } from "../hooks/useCart";
import type { LocalProduct } from "../hooks/useLocalProducts";
import { loadLocalProducts } from "../hooks/useLocalProducts";

function formatPrice(price: number) {
  return `₹${(price / 100).toFixed(2)}`;
}

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  img.src = "/placeholder.png";
}

export default function HomePage() {
  const { actor } = useActor();
  const { addItem } = useCart();

  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProducts(loadLocalProducts());
    setIsLoading(false);
    const handler = () => setProducts(loadLocalProducts());
    window.addEventListener("tkmart_products_updated", handler);
    return () => window.removeEventListener("tkmart_products_updated", handler);
  }, []);

  const { data: adVideos } = useQuery({
    queryKey: ["adVideos"],
    queryFn: () => actor!.getActiveAdVideos(),
    enabled: !!actor,
  });

  const handleAddToCart = (product: LocalProduct) => {
    addItem({
      productId: BigInt(product.id),
      name: product.name,
      price: BigInt(product.price),
      image: product.imageUrl,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div data-ocid="home.page">
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        data-ocid="home.hero.section"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.25 0.06 75 / 0.5) 0%, oklch(0.12 0.01 45) 70%)",
        }}
      >
        {/* Decorative gold lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 0.5), transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.78 0.14 85 / 0.3), transparent)",
            }}
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, oklch(0.78 0.14 85) 0px, oklch(0.78 0.14 85) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, oklch(0.78 0.14 85) 0px, oklch(0.78 0.14 85) 1px, transparent 1px, transparent 60px)",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in relative z-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] mb-6"
            style={{ color: "oklch(0.78 0.14 85)" }}
          >
            ✦ Premium Shopping Experience ✦
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-4 gold-shimmer">
            TKMART
          </h1>
          <p
            className="font-display text-2xl md:text-3xl italic mb-6"
            style={{ color: "oklch(0.88 0.10 85)" }}
          >
            Luxury. Delivered.
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Experience premium shopping with curated products and TKMART
            Delivery
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              asChild
              size="lg"
              className="px-8 font-semibold tracking-wide"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.14 85), oklch(0.88 0.18 90))",
                color: "oklch(0.12 0.01 45)",
              }}
              data-ocid="hero.shop.button"
            >
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary/70"
              data-ocid="hero.track.button"
            >
              <Link to="/track">Track Order</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad Videos */}
      {adVideos && adVideos.length > 0 && (
        <section className="py-8 px-4 bg-muted" data-ocid="home.ads.section">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {adVideos.map((v) => (
                <div
                  key={v.id.toString()}
                  className="flex-shrink-0 w-80 rounded-lg overflow-hidden border border-border"
                >
                  <video
                    src={v.video.getDirectURL()}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-48 object-cover"
                    aria-label={v.title}
                  />
                  <p className="p-2 text-sm font-medium text-center">
                    {v.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 px-4" data-ocid="home.products.section">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.78 0.14 85)" }}
              >
                Curated Selection
              </p>
              <h2 className="font-display text-3xl font-bold">
                Featured Products
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="text-primary hover:text-primary/80"
              data-ocid="home.viewall.button"
            >
              <Link to="/products">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="home.products.loading_state"
            >
              {SKELETON_KEYS.map((k) => (
                <Skeleton key={k} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="home.products.list"
            >
              {(products?.slice(0, 8) ?? []).map((product, idx) => (
                <Card
                  key={String(product.id)}
                  className="group hover:border-primary/50 transition-all duration-300 bg-card border-border overflow-hidden"
                  data-ocid={`home.product.item.${idx + 1}`}
                >
                  <CardContent className="p-0">
                    <Link to={`/products/${product.id}`}>
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.imageUrl || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={handleImageError}
                        />
                      </div>
                    </Link>
                    <div className="p-3">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-semibold text-sm line-clamp-1 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p
                        className="font-bold mt-1"
                        style={{ color: "oklch(0.78 0.14 85)" }}
                      >
                        {formatPrice(product.price)}
                      </p>
                      <Button
                        size="sm"
                        className="w-full mt-2 text-xs"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.78 0.14 85), oklch(0.88 0.18 90))",
                          color: "oklch(0.12 0.01 45)",
                        }}
                        onClick={() => handleAddToCart(product)}
                        data-ocid={`home.product.addcart.${idx + 1}`}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" /> Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!isLoading && (!products || products.length === 0) && (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="home.products.empty_state"
            >
              <p>No products available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Owner Section */}
      <section
        className="py-16 px-4"
        data-ocid="home.owner.section"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.015 55), oklch(0.18 0.02 65))",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest text-center mb-2"
            style={{ color: "oklch(0.78 0.14 85)" }}
          >
            About the Founder
          </p>
          <h2 className="font-display text-3xl font-bold text-center mb-10">
            The Vision Behind TKMART
          </h2>
          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
            style={{
              background: "oklch(0.16 0.012 45)",
              border: "1px solid oklch(0.78 0.14 85 / 0.3)",
              boxShadow: "0 0 40px oklch(0.78 0.14 85 / 0.08)",
            }}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center font-display text-2xl font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.20 0.02 55), oklch(0.25 0.03 65))",
                  border: "2px solid oklch(0.78 0.14 85 / 0.6)",
                  color: "oklch(0.78 0.14 85)",
                  boxShadow: "0 0 20px oklch(0.78 0.14 85 / 0.2)",
                }}
              >
                ATK
              </div>
            </div>
            {/* Details */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-2xl font-bold mb-1">
                Ashwin T K
              </h3>
              <p
                className="text-sm font-medium tracking-wide mb-4"
                style={{ color: "oklch(0.78 0.14 85)" }}
              >
                Founder & CEO, TKMART
              </p>
              <div className="relative mb-4">
                <Quote
                  className="absolute -top-1 -left-1 w-5 h-5 opacity-40"
                  style={{ color: "oklch(0.78 0.14 85)" }}
                />
                <p
                  className="font-display text-lg italic pl-6"
                  style={{ color: "oklch(0.88 0.10 85)" }}
                >
                  Bringing premium products to your doorstep since 2024
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                TKMART was founded with a vision to make luxury accessible. We
                curate the finest products and ensure they reach you with care
                and speed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
