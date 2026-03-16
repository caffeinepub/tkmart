import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const EBOOKS_KEY = "tkmart_ebooks";
export const MY_EBOOKS_KEY = "tkmart_my_ebooks";

export interface EBook {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  content: string;
  category: string;
  pages: number;
  createdAt: number;
}

const SAMPLE_EBOOKS: EBook[] = [
  {
    id: "sample-1",
    title: "The Art of Smart Shopping",
    author: "Ashwin T K",
    price: 99,
    description:
      "Learn how to find the best deals, compare prices, and make smart purchase decisions in today's digital marketplace.",
    coverImage: "",
    content:
      "Chapter 1: Understanding Value\n\nSmart shopping is about more than just finding the lowest price. It's about understanding value — getting the most out of every rupee you spend.\n\nChapter 2: Research Before You Buy\n\nAlways research products before purchasing. Read reviews, compare alternatives, and understand what you truly need.",
    category: "Shopping",
    pages: 120,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "sample-2",
    title: "Digital Life Simplified",
    author: "Kumar Raj",
    price: 149,
    description:
      "A practical guide to organizing your digital life, managing online accounts, and staying safe in the digital world.",
    coverImage: "",
    content:
      "Introduction\n\nIn today's connected world, managing your digital life is just as important as managing your physical one.\n\nChapter 1: Password Security\n\nUse strong, unique passwords for every account. Consider a password manager to keep track.",
    category: "Technology",
    pages: 180,
    createdAt: Date.now() - 172800000,
  },
  {
    id: "sample-3",
    title: "Everyday Cooking Made Easy",
    author: "Priya Sharma",
    price: 79,
    description:
      "Simple, nutritious recipes for busy families. Quick meals that taste great and are easy on the wallet.",
    coverImage: "",
    content:
      "Welcome to Everyday Cooking!\n\nThis book is designed for real people with real schedules. Every recipe takes 30 minutes or less.\n\nRecipe 1: Dal Tadka\nIngredients: 1 cup toor dal, tomatoes, onions, spices...\nMethod: Pressure cook dal for 3 whistles...",
    category: "Cooking",
    pages: 95,
    createdAt: Date.now() - 259200000,
  },
];

export function loadEBooks(): EBook[] {
  try {
    const stored = JSON.parse(
      localStorage.getItem(EBOOKS_KEY) ?? "[]",
    ) as EBook[];
    if (stored.length === 0) return SAMPLE_EBOOKS;
    return stored;
  } catch {
    return SAMPLE_EBOOKS;
  }
}

export function loadMyEBooks(): string[] {
  try {
    return JSON.parse(localStorage.getItem(MY_EBOOKS_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function saveMyEBooks(ids: string[]) {
  localStorage.setItem(MY_EBOOKS_KEY, JSON.stringify(ids));
}

function EBookCard({ book }: { book: EBook }) {
  const navigate = useNavigate();
  const [buying, setBuying] = useState(false);

  const handleBuy = () => {
    const session = localStorage.getItem("tkmart_customer_session");
    if (!session) {
      toast.error("Please sign in to purchase e-books.");
      navigate("/login");
      return;
    }
    setBuying(true);
    setTimeout(() => {
      const owned = loadMyEBooks();
      if (!owned.includes(book.id)) {
        owned.push(book.id);
        saveMyEBooks(owned);
      }
      toast.success(`"${book.title}" added to My E-Books!`);
      setBuying(false);
      navigate(`/ebooks/read/${book.id}`);
    }, 600);
  };

  const owned = loadMyEBooks().includes(book.id);

  return (
    <Card
      className="flex flex-col overflow-hidden border border-border hover:border-primary/40 transition-all"
      data-ocid="ebooks.book.card"
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 p-4 text-center">
            <BookOpen className="h-12 w-12 text-primary/60" />
            <p className="text-xs font-medium text-primary/80 leading-tight">
              {book.title}
            </p>
          </div>
        )}
        <Badge className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs">
          {book.pages}p
        </Badge>
      </div>
      <CardContent className="p-4 flex-1">
        <p className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
          {book.title}
        </p>
        <p className="text-xs text-muted-foreground mb-2">by {book.author}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {book.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="font-bold text-primary">₹{book.price}</span>
        {owned ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/ebooks/read/${book.id}`)}
            data-ocid="ebooks.read.button"
          >
            <BookOpen className="h-3.5 w-3.5 mr-1" /> Read
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleBuy}
            disabled={buying}
            data-ocid="ebooks.buy.button"
          >
            <ShoppingBag className="h-3.5 w-3.5 mr-1" />
            {buying ? "Adding..." : "Buy Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function EBooksPage() {
  const books = loadEBooks();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-ocid="ebooks.page">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">E-Book Store</h1>
        <p className="text-muted-foreground">
          Buy and read digital books online. Your purchases are saved to My
          E-Books.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16" data-ocid="ebooks.empty_state">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No E-Books Available</h2>
          <p className="text-muted-foreground">
            Check back soon for new titles.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          data-ocid="ebooks.list"
        >
          {books.map((book) => (
            <EBookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
