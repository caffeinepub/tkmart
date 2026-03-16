import { useCallback, useEffect, useState } from "react";

export interface CartItem {
  productId: bigint;
  name: string;
  price: bigint;
  quantity: number;
  image?: string;
}

const CART_KEY = "tkmart_cart";

function serializeCart(items: CartItem[]): string {
  return JSON.stringify(
    items.map((i) => ({
      ...i,
      productId: i.productId.toString(),
      price: i.price.toString(),
    })),
  );
}

function deserializeCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw) as Array<{
      productId: string;
      name: string;
      price: string;
      quantity: number;
      image?: string;
    }>;
    return parsed.map((i) => ({
      ...i,
      productId: BigInt(i.productId),
      price: BigInt(i.price),
    }));
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? deserializeCart(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, serializeCart(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: bigint) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce(
    (sum, i) => sum + i.price * BigInt(i.quantity),
    0n,
  );
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    count,
  };
}
