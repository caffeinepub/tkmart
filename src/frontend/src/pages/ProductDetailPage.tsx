import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../hooks/useCart";
import type { LocalProduct } from "../hooks/useLocalProducts";
import { getLocalProduct } from "../hooks/useLocalProducts";

function formatPrice(price: number) {
  return `₹${(price / 100).toFixed(2)}`;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem, items, updateQuantity } = useCart();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<LocalProduct | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const cartItem = items.find((i) => i.productId === BigInt(product?.id ?? 0));

  if (isLoading)
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-8"
        data-ocid="product.loading_state"
      >
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );

  if (!product)
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-16 text-center"
        data-ocid="product.error_state"
      >
        <p className="text-muted-foreground">Product not found.</p>
        <Button asChild className="mt-4">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-ocid="product.page">
      <Link
        to="/products"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        data-ocid="product.back.link"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="w-fit mb-3">
            {product.categoryName || `Category #${product.category}`}
          </Badge>
          <h1 className="font-display text-3xl font-bold mb-3">
            {product.name}
          </h1>
          <p className="text-muted-foreground mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-primary mb-2">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {product.stock > 0 ? (
              <span className="text-success font-medium">
                In Stock ({product.stock} left)
              </span>
            ) : (
              <span className="text-destructive">Out of Stock</span>
            )}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                data-ocid="product.qty.minus.button"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty((q) => q + 1)}
                data-ocid="product.qty.plus.button"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {cartItem ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  updateQuantity(BigInt(product.id), cartItem.quantity - 1)
                }
                data-ocid="product.dec.button"
              >
                -
              </Button>
              <Button variant="outline" disabled className="flex-1">
                {cartItem.quantity} in cart
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  updateQuantity(BigInt(product.id), cartItem.quantity + 1)
                }
                data-ocid="product.inc.button"
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              disabled={product.stock <= 0}
              onClick={() => {
                for (let i = 0; i < qty; i++)
                  addItem({
                    productId: BigInt(product.id),
                    name: product.name,
                    price: BigInt(product.price),
                    image: product.imageUrl,
                  });
                toast.success(`${product.name} added to cart`);
              }}
              data-ocid="product.addcart.button"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
