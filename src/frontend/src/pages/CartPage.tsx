import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function formatPrice(price: bigint) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0)
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-24 text-center"
        data-ocid="cart.empty_state"
      >
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="font-display text-2xl font-bold mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Add some products to get started.
        </p>
        <Button asChild data-ocid="cart.shop.button">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-ocid="cart.page">
      <h1 className="font-display text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3" data-ocid="cart.list">
          {items.map((item, idx) => (
            <Card
              key={item.productId.toString()}
              data-ocid={`cart.item.${idx + 1}`}
            >
              <CardContent className="p-4 flex gap-4 items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-primary font-bold">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    data-ocid={`cart.dec.${idx + 1}`}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    data-ocid={`cart.inc.${idx + 1}`}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm font-bold w-20 text-right">
                  {formatPrice(item.price * BigInt(item.quantity))}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => removeItem(item.productId)}
                  data-ocid={`cart.delete_button.${idx + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Card data-ocid="cart.summary.card">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-success">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => navigate("/checkout")}
                data-ocid="cart.checkout.button"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-destructive"
                onClick={clearCart}
                data-ocid="cart.clear.button"
              >
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
