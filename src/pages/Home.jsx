// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import BookCard from "../components/BookCard";
import BookList from "../components/Booklist";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from Gutendex API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://gutendex.com/books/");
        const data = await response.json();
        setBooks(data.results); // results contains the array of books
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <Spinner />;

  return (
    <BookList books={books} />
  );
}

export default Home;
