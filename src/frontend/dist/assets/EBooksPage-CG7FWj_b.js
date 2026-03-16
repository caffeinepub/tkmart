import { j as jsxRuntimeExports, f as useNavigate, r as reactExports, e as Badge, B as Button, a as ue } from "./index-CUvGTilV.js";
import { C as Card, a as CardContent, d as CardFooter } from "./card-DugUs_SA.js";
import { B as BookOpen } from "./book-open-Dpldmm9M.js";
import { S as ShoppingBag } from "./shopping-bag-Bl7a3BZF.js";
const EBOOKS_KEY = "tkmart_ebooks";
const MY_EBOOKS_KEY = "tkmart_my_ebooks";
const SAMPLE_EBOOKS = [
  {
    id: "sample-1",
    title: "The Art of Smart Shopping",
    author: "Ashwin T K",
    price: 99,
    description: "Learn how to find the best deals, compare prices, and make smart purchase decisions in today's digital marketplace.",
    coverImage: "",
    content: "Chapter 1: Understanding Value\n\nSmart shopping is about more than just finding the lowest price. It's about understanding value — getting the most out of every rupee you spend.\n\nChapter 2: Research Before You Buy\n\nAlways research products before purchasing. Read reviews, compare alternatives, and understand what you truly need.",
    category: "Shopping",
    pages: 120,
    createdAt: Date.now() - 864e5
  },
  {
    id: "sample-2",
    title: "Digital Life Simplified",
    author: "Kumar Raj",
    price: 149,
    description: "A practical guide to organizing your digital life, managing online accounts, and staying safe in the digital world.",
    coverImage: "",
    content: "Introduction\n\nIn today's connected world, managing your digital life is just as important as managing your physical one.\n\nChapter 1: Password Security\n\nUse strong, unique passwords for every account. Consider a password manager to keep track.",
    category: "Technology",
    pages: 180,
    createdAt: Date.now() - 1728e5
  },
  {
    id: "sample-3",
    title: "Everyday Cooking Made Easy",
    author: "Priya Sharma",
    price: 79,
    description: "Simple, nutritious recipes for busy families. Quick meals that taste great and are easy on the wallet.",
    coverImage: "",
    content: "Welcome to Everyday Cooking!\n\nThis book is designed for real people with real schedules. Every recipe takes 30 minutes or less.\n\nRecipe 1: Dal Tadka\nIngredients: 1 cup toor dal, tomatoes, onions, spices...\nMethod: Pressure cook dal for 3 whistles...",
    category: "Cooking",
    pages: 95,
    createdAt: Date.now() - 2592e5
  }
];
function loadEBooks() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(EBOOKS_KEY) ?? "[]"
    );
    if (stored.length === 0) return SAMPLE_EBOOKS;
    return stored;
  } catch {
    return SAMPLE_EBOOKS;
  }
}
function loadMyEBooks() {
  try {
    return JSON.parse(localStorage.getItem(MY_EBOOKS_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function saveMyEBooks(ids) {
  localStorage.setItem(MY_EBOOKS_KEY, JSON.stringify(ids));
}
function EBookCard({ book }) {
  const navigate = useNavigate();
  const [buying, setBuying] = reactExports.useState(false);
  const handleBuy = () => {
    const session = localStorage.getItem("tkmart_customer_session");
    if (!session) {
      ue.error("Please sign in to purchase e-books.");
      navigate("/login");
      return;
    }
    setBuying(true);
    setTimeout(() => {
      const owned2 = loadMyEBooks();
      if (!owned2.includes(book.id)) {
        owned2.push(book.id);
        saveMyEBooks(owned2);
      }
      ue.success(`"${book.title}" added to My E-Books!`);
      setBuying(false);
      navigate(`/ebooks/read/${book.id}`);
    }, 600);
  };
  const owned = loadMyEBooks().includes(book.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "flex flex-col overflow-hidden border border-border hover:border-primary/40 transition-all",
      "data-ocid": "ebooks.book.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden", children: [
          book.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: book.coverImage,
              alt: book.title,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-primary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-primary/80 leading-tight", children: book.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs", children: [
            book.pages,
            "p"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm leading-tight mb-1 line-clamp-2", children: book.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
            "by ",
            book.author
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: book.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "p-4 pt-0 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
            "₹",
            book.price
          ] }),
          owned ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => navigate(`/ebooks/read/${book.id}`),
              "data-ocid": "ebooks.read.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 mr-1" }),
                " Read"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: handleBuy,
              disabled: buying,
              "data-ocid": "ebooks.buy.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3.5 w-3.5 mr-1" }),
                buying ? "Adding..." : "Buy Now"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function EBooksPage() {
  const books = loadEBooks();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", "data-ocid": "ebooks.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-2", children: "E-Book Store" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Buy and read digital books online. Your purchases are saved to My E-Books." })
    ] }),
    books.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "ebooks.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-16 w-16 mx-auto text-muted-foreground/40 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "No E-Books Available" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Check back soon for new titles." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
        "data-ocid": "ebooks.list",
        children: books.map((book) => /* @__PURE__ */ jsxRuntimeExports.jsx(EBookCard, { book }, book.id))
      }
    )
  ] });
}
export {
  EBOOKS_KEY,
  MY_EBOOKS_KEY,
  EBooksPage as default,
  loadEBooks,
  loadMyEBooks,
  saveMyEBooks
};
