import React from "react";
import BookCard from "./BookCard";

function BookList({ books }) {
  if (!books || books.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No books found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
