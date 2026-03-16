const LOCAL_PRODUCTS_KEY = "tkmart_local_products";
let _nextId = null;
function loadLocalProducts() {
  try {
    return JSON.parse(
      localStorage.getItem(LOCAL_PRODUCTS_KEY) ?? "[]"
    );
  } catch {
    return [];
  }
}
function saveLocalProducts(products) {
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("tkmart_products_updated"));
}
function nextId() {
  if (_nextId === null) {
    const existing = loadLocalProducts();
    _nextId = existing.length > 0 ? Math.max(...existing.map((p) => p.id)) + 1 : 1;
  }
  return _nextId++;
}
function createLocalProduct(data) {
  const product = {
    ...data,
    id: nextId(),
    createdAt: Date.now()
  };
  const all = loadLocalProducts();
  all.push(product);
  saveLocalProducts(all);
  return product;
}
function updateLocalProduct(id, data) {
  const all = loadLocalProducts().map(
    (p) => p.id === id ? { ...p, ...data } : p
  );
  saveLocalProducts(all);
}
function deleteLocalProduct(id) {
  saveLocalProducts(loadLocalProducts().filter((p) => p.id !== id));
}
function getLocalProduct(id) {
  return loadLocalProducts().find((p) => p.id === id);
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
export {
  createLocalProduct as c,
  deleteLocalProduct as d,
  fileToBase64 as f,
  getLocalProduct as g,
  loadLocalProducts as l,
  updateLocalProduct as u
};
