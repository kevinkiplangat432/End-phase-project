import React, { useState, useMemo } from "react";
import BookCard from "./BookCard";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import BookModal from "./BookModal";
import Reader from "./Reader";

function fuzzyMatch(text = "", query = "") {
  if (!query) return true;
  const t = text.toLowerCase();
  const q = query.trim().toLowerCase();
  // split query into tokens and check any token appears in text
  return q.split(/\s+/).every((token) => t.includes(token));
}

function BookList({ books, likedBooks, toggleLike, libraryBooks, toggleLibrary }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [readingBook, setReadingBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  const filteredBooks = useMemo(() => {
    let filtered = books || [];

    if (searchQuery) {
      filtered = filtered.filter((book) => {
        const title = book.title || "";
        const authors = (book.authors || []).map(a => a.name).join(" ");
        return fuzzyMatch(title, searchQuery) || fuzzyMatch(authors, searchQuery);
      });
    }

    if (language !== "all") {
      filtered = filtered.filter((book) => (book.languages || []).includes(language));
    }

    if (sortOption === "downloads") {
      filtered = [...filtered].sort((a, b) => (b.download_count || 0) - (a.download_count || 0));
    } else if (sortOption === "title") {
      filtered = [...filtered].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return filtered;
  }, [books, searchQuery, language, sortOption]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filter language={language} onLanguageChange={setLanguage} sortOption={sortOption} onSortChange={setSortOption} />
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} onClick={() => setSelectedBook(book)} className="cursor-pointer">
              <BookCard
                book={book}
                onView={(b) => setSelectedBook(b)}
                liked={!!likedBooks.find((x) => x.id === book.id)}
                onToggleLike={toggleLike}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal view */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onRead={(b) => { setReadingBook(b); setSelectedBook(null); }}
          inLibrary={!!libraryBooks.find((x) => x.id === selectedBook.id)}
          onToggleLibrary={(b) => toggleLibrary(b)}
        />
      )}

      {/* Reader overlay */}
      {readingBook && <Reader book={readingBook} onClose={() => setReadingBook(null)} />}
    </div>
  );
}

export default BookList;
