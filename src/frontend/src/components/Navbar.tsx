import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Package, Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../hooks/useCart";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const langLabels: Record<string, string> = {
  en: "EN",
  ta: "TA",
  hi: "HI",
};

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          data-ocid="nav.home.link"
          className="flex items-center gap-2"
        >
          <img
            src="/assets/uploads/595b73414ec29e3d9cbbc509a0119581-1.jpg"
            alt="Lord Murugan"
            className="h-10 w-auto rounded-full object-cover"
          />
          <img
            src="/assets/generated/tkmart-logo-transparent.dim_400x120.png"
            alt="TKMART"
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/products"
            data-ocid="nav.products.link"
            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            {t("products")}
          </Link>
          <Link
            to="/ebooks"
            data-ocid="nav.ebooks.link"
            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            E-Books
          </Link>
          <Link
            to="/track"
            data-ocid="nav.track.link"
            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            {t("trackOrder")}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                data-ocid="nav.language.select"
                className="text-foreground/70 hover:text-primary flex items-center gap-1 px-2"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs font-semibold">
                  {langLabels[language]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[130px]">
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                data-ocid="nav.language.en.button"
                className={
                  language === "en" ? "text-primary font-semibold" : ""
                }
              >
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("ta")}
                data-ocid="nav.language.ta.button"
                className={
                  language === "ta" ? "text-primary font-semibold" : ""
                }
              >
                🇮🇳 தமிழ்
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("hi")}
                data-ocid="nav.language.hi.button"
                className={
                  language === "hi" ? "text-primary font-semibold" : ""
                }
              >
                🇮🇳 हिंदी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/products")}
            data-ocid="nav.search.button"
            className="text-foreground/70 hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/track")}
            data-ocid="nav.track.button"
            className="md:hidden text-foreground/70 hover:text-primary"
          >
            <Package className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(identity ? "/account" : "/login")}
            data-ocid="nav.account.button"
            title={identity ? t("myAccount") : t("login")}
            className="text-foreground/70 hover:text-primary"
          >
            <User className={`h-5 w-5 ${identity ? "text-primary" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/cart")}
            data-ocid="nav.cart.button"
            className="relative text-foreground/70 hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
                data-ocid="nav.cart.badge"
              >
                {count}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
