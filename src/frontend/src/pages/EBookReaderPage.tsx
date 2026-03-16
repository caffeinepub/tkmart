import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EBOOKS_KEY, type EBook, loadEBooks, loadMyEBooks } from "./EBooksPage";

const SAMPLE_EBOOKS_KEY = "ebook_reader_bookmarks";

function loadBookmarks(): Record<string, number[]> {
  try {
    return JSON.parse(localStorage.getItem(SAMPLE_EBOOKS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveBookmarks(b: Record<string, number[]>) {
  localStorage.setItem(SAMPLE_EBOOKS_KEY, JSON.stringify(b));
}

export default function EBookReaderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<EBook | null>(null);
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [darkMode, setDarkMode] = useState(true);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    if (!id) {
      navigate("/ebooks");
      return;
    }
    // Check ownership
    const owned = loadMyEBooks();
    if (!owned.includes(id)) {
      // Try sample books from EBooksPage
      const allBooks = loadEBooks();
      const found = allBooks.find((b) => b.id === id);
      if (!found || !owned.includes(id)) {
        navigate("/ebooks");
        return;
      }
    }
    const allBooks = loadEBooks();
    const found = allBooks.find((b) => b.id === id);
    if (!found) {
      navigate("/ebooks");
      return;
    }
    setBook(found);
    // Split content into pages (~500 chars each)
    const rawPages = found.content.split(/\n\n/).filter(Boolean);
    const chunked: string[] = [];
    let current = "";
    for (const para of rawPages) {
      if ((current + para).length > 800 && current) {
        chunked.push(current.trim());
        current = para;
      } else {
        current = current ? `${current}\n\n${para}` : para;
      }
    }
    if (current) chunked.push(current.trim());
    setPages(chunked.length > 0 ? chunked : [found.content]);
    // Load bookmarks
    const bm = loadBookmarks();
    setBookmarks(bm[id] ?? []);
  }, [id, navigate]);

  if (!book) return null;

  const toggleBookmark = () => {
    const updated = bookmarks.includes(page)
      ? bookmarks.filter((b) => b !== page)
      : [...bookmarks, page];
    setBookmarks(updated);
    const allBm = loadBookmarks();
    allBm[id!] = updated;
    saveBookmarks(allBm);
  };

  const isBookmarked = bookmarks.includes(page);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-amber-50 text-gray-900"
      }`}
      data-ocid="ebook-reader.page"
    >
      {/* Header */}
      <div
        className={`sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b ${
          darkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-amber-100 border-amber-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/ebooks")}
            data-ocid="ebook-reader.back.button"
            className={darkMode ? "text-gray-300 hover:text-white" : ""}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{book.title}</p>
            <p className="text-xs text-muted-foreground">by {book.author}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            data-ocid="ebook-reader.bookmark.toggle"
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            className={
              isBookmarked
                ? "text-primary"
                : darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
            }
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((z) => Math.max(80, z - 10))}
            data-ocid="ebook-reader.zoom-out.button"
            className={darkMode ? "text-gray-400" : "text-gray-600"}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs w-8 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((z) => Math.min(150, z + 10))}
            data-ocid="ebook-reader.zoom-in.button"
            className={darkMode ? "text-gray-400" : "text-gray-600"}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode((d) => !d)}
            data-ocid="ebook-reader.darkmode.toggle"
            className={darkMode ? "text-gray-400" : "text-gray-600"}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div
          className={`w-full max-w-2xl rounded-xl shadow-lg p-8 min-h-[400px] ${
            darkMode
              ? "bg-gray-900 border border-gray-800"
              : "bg-white border border-amber-200"
          }`}
          style={{ fontSize: `${zoom}%` }}
        >
          <div
            className="flex items-center gap-2 mb-6 pb-4 border-b"
            style={{ borderColor: darkMode ? "#374151" : "#fde68a" }}
          >
            <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-muted-foreground">
              Page {page + 1} of {pages.length}
            </span>
            {isBookmarked && (
              <span className="ml-auto text-xs text-primary flex items-center gap-1">
                <Bookmark className="h-3 w-3 fill-current" /> Bookmarked
              </span>
            )}
          </div>
          <div
            className="leading-relaxed whitespace-pre-line"
            style={{ color: darkMode ? "#e5e7eb" : "#1f2937" }}
          >
            {pages[page] ?? ""}
          </div>
        </div>

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-xs text-muted-foreground">Bookmarks:</span>
            {bookmarks.map((bPage) => (
              <button
                key={bPage}
                type="button"
                onClick={() => setPage(bPage)}
                className={`text-xs px-2 py-0.5 rounded ${
                  bPage === page
                    ? "bg-primary text-primary-foreground"
                    : darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-amber-100 text-gray-700"
                }`}
                data-ocid="ebook-reader.bookmark.button"
              >
                p.{bPage + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div
        className={`sticky bottom-0 flex items-center justify-between px-4 py-3 border-t ${
          darkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-amber-100 border-amber-200"
        }`}
      >
        <Button
          variant="outline"
          size="sm"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          data-ocid="ebook-reader.prev.button"
          className={darkMode ? "border-gray-700 text-gray-300" : ""}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <div className="flex-1 mx-4">
          <Slider
            min={0}
            max={Math.max(0, pages.length - 1)}
            value={[page]}
            onValueChange={([v]) => setPage(v)}
            data-ocid="ebook-reader.progress.toggle"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= pages.length - 1}
          onClick={() => setPage((p) => p + 1)}
          data-ocid="ebook-reader.next.button"
          className={darkMode ? "border-gray-700 text-gray-300" : ""}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
