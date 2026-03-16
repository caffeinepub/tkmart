// ─── Local Product Store (localStorage-based, no backend blob upload) ─────────
// Products are stored locally with base64 images to avoid ExternalBlob failures.

export interface LocalProduct {
  id: number;
  name: string;
  description: string;
  price: number; // paise as plain number (JSON-safe)
  category: number;
  categoryName: string;
  stock: number;
  imageUrl: string; // base64 data URL or empty string
  createdAt: number;
}

const LOCAL_PRODUCTS_KEY = "tkmart_local_products";
let _nextId: number | null = null;

export function loadLocalProducts(): LocalProduct[] {
  try {
    return JSON.parse(
      localStorage.getItem(LOCAL_PRODUCTS_KEY) ?? "[]",
    ) as LocalProduct[];
  } catch {
    return [];
  }
}

export function saveLocalProducts(products: LocalProduct[]): void {
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("tkmart_products_updated"));
}

function nextId(): number {
  if (_nextId === null) {
    const existing = loadLocalProducts();
    _nextId =
      existing.length > 0 ? Math.max(...existing.map((p) => p.id)) + 1 : 1;
  }
  return _nextId++;
}

export function createLocalProduct(
  data: Omit<LocalProduct, "id" | "createdAt">,
): LocalProduct {
  const product: LocalProduct = {
    ...data,
    id: nextId(),
    createdAt: Date.now(),
  };
  const all = loadLocalProducts();
  all.push(product);
  saveLocalProducts(all);
  return product;
}

export function updateLocalProduct(
  id: number,
  data: Partial<Omit<LocalProduct, "id" | "createdAt">>,
): void {
  const all = loadLocalProducts().map((p) =>
    p.id === id ? { ...p, ...data } : p,
  );
  saveLocalProducts(all);
}

export function deleteLocalProduct(id: number): void {
  saveLocalProducts(loadLocalProducts().filter((p) => p.id !== id));
}

export function getLocalProduct(id: number): LocalProduct | undefined {
  return loadLocalProducts().find((p) => p.id === id);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
