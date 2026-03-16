import { Toaster } from "@/components/ui/sonner";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatWidget from "./components/ChatWidget";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./contexts/LanguageContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const TrackOrderPage = lazy(() => import("./pages/TrackOrderPage"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetailPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const CustomerLoginPage = lazy(() => import("./pages/CustomerLoginPage"));
const CustomerAccountPage = lazy(() => import("./pages/CustomerAccountPage"));
const EBooksPage = lazy(() => import("./pages/EBooksPage"));
const EBookReaderPage = lazy(() => import("./pages/EBookReaderPage"));

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer
        className="py-12 mt-16"
        style={{
          background: "oklch(0.10 0.01 45)",
          borderTop: "1px solid oklch(0.78 0.14 85 / 0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col items-start gap-2">
              <img
                src="/assets/uploads/595b73414ec29e3d9cbbc509a0119581-1.jpg"
                alt="Lord Murugan"
                className="h-48 w-auto object-contain"
              />
              <img
                src="/assets/generated/tkmart-logo-style3-transparent.dim_200x200.png"
                alt="TKMART Logo"
                className="w-20 h-20 object-contain"
              />
              <p className="text-sm text-muted-foreground">
                Founded by Ashwin T K
              </p>
              <p className="text-xs text-muted-foreground">
                Best Quality at Affordable Prices
              </p>
            </div>
            {/* Links */}
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.78 0.14 85)" }}
              >
                Quick Links
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.products.link"
                >
                  Products
                </a>
                <a
                  href="/track"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.track.link"
                >
                  Track Order
                </a>
                <a
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.login.link"
                >
                  My Account
                </a>
              </div>
            </div>
            {/* Contact */}
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.78 0.14 85)" }}
              >
                Contact Us
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/919176580731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  data-ocid="footer.whatsapp.link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  WhatsApp: 9176580731
                </a>
                <a
                  href="tel:+919176580731"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  data-ocid="footer.phone1.link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  +91 9176580731
                </a>
                <a
                  href="tel:+919566235195"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  data-ocid="footer.phone2.link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  +91 9566235195
                </a>
                <a
                  href="mailto:tkmart81501@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  data-ocid="footer.email.link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  tkmart81501@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground"
            style={{ borderTop: "1px solid oklch(0.28 0.02 45)" }}
          >
            <p>© {new Date().getFullYear()} TKMART. All rights reserved.</p>
            <p>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
      <FloatingWhatsApp />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          }
        >
          <Routes>
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/*"
              element={
                <AppShell>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route
                      path="/products/:id"
                      element={<ProductDetailPage />}
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/track" element={<TrackOrderPage />} />
                    <Route path="/orders/:id" element={<OrderDetailPage />} />
                    <Route path="/login" element={<CustomerLoginPage />} />
                    <Route path="/account" element={<CustomerAccountPage />} />
                    <Route path="/ebooks" element={<EBooksPage />} />
                    <Route
                      path="/ebooks/read/:id"
                      element={<EBookReaderPage />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AppShell>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}
