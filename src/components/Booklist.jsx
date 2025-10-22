// src/components/BookList.jsx
import React, { useState, useMemo } from "react";
import BookCard from "./BookCard";
import Filter from "./Filter";
import SearchBar from "./SearchBar";

function BookList({ books }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // Filter + sort logic
  const filteredBooks = useMemo(() => {
    let filtered = books;

    //  Search by title or author name
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lower) ||
          book.authors?.some((a) => a.name.toLowerCase().includes(lower))
      );
    }

    //  Filter by language
    if (language !== "all") {
      filtered = filtered.filter((book) => book.languages.includes(language));
    }

    //  Sort options
    if (sortOption === "downloads") {
      filtered = [...filtered].sort(
        (a, b) => b.download_count - a.download_count
      );
    } else if (sortOption === "title") {
      filtered = [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return filtered;
  }, [books, searchQuery, language, sortOption]);

  if (!books || books.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No books available.
      </p>
    );
  }

  return (
    <div>
      {/* 🔍 Filters and search bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filter
          language={language}
          onLanguageChange={setLanguage}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>

      {/* Book grid */}
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
