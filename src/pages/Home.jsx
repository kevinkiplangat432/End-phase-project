import React, { useState, useEffect, useCallback } from "react";
import Spinner from "../components/Spinner";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../components/AuthContext";

function Home() {
  const { currentUser } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  const [books, setBooks] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // liked and library state
  const [likedBooks, setLikedBooks] = useLocalStorage("likedBooks", []);
  const [libraryBooks, setLibraryBooks] = useLocalStorage("libraryBooks", []);

  const fetchBooks = useCallback(async (pageNum = 1) => {
    try {
      if (pageNum === 1) {
        setInitialLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await fetch(`https://gutendex.com/books/?page=${pageNum}`);
      const data = await res.json();

      if (!data || !data.results || data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setBooks((prev) => (pageNum === 1 ? data.results : [...prev, ...data.results]));
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(1);
  }, [fetchBooks]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchBooks(page + 1);
    }
  };

  const toggleLike = (book) => {
    setLikedBooks((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) return prev.filter((b) => b.id !== book.id);
      return [book, ...prev];
    });
  };

  const toggleLibrary = (book) => {
    setLibraryBooks((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) return prev.filter((b) => b.id !== book.id);
      return [book, ...prev];
    });
  };

  return (
    <div>
      {initialLoading ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BookList
            books={books}
            likedBooks={likedBooks}
            toggleLike={toggleLike}
            libraryBooks={libraryBooks}
            toggleLibrary={toggleLibrary}
          />

          <Pagination onLoadMore={handleLoadMore} hasMore={hasMore} loading={loadingMore} />
        </>
      )}
    </div>
  );
}

export default Home;