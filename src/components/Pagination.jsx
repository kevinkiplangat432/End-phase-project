// src/components/Pagination.jsx
import React, { useEffect, useRef } from "react";

function Pagination({ onLoadMore, hasMore, loading }) {
  const loaderRef = useRef();

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [onLoadMore, hasMore, loading]);

  return (
    <div ref={loaderRef} className="flex justify-center py-8">
      {loading ? (
        <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
      ) : (
        hasMore && (
          <p className="text-gray-500 dark:text-gray-400">Scroll to load more...</p>
        )
      )}
    </div>
  );
}

export default Pagination;
