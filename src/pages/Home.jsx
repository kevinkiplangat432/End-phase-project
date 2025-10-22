// src/pages/Home.jsx
import React, { useState, useEffect, useCallback } from "react";
import Spinner from "../components/Spinner";
import BookList from "../components/Booklist";
import Pagination from "../components/Pagination";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`https://gutendex.com/books/?page=${pageNum}`);
      const data = await res.json();

      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setBooks((prev) => [...prev, ...data.results]); // append
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(1);
  }, [fetchBooks]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchBooks(page + 1);
    }
  };

  return (
    <div>
      <BookList books={books} />
      <Pagination onLoadMore={handleLoadMore} hasMore={hasMore} loading={loading} />
    </div>
  );
}

export default Home;
