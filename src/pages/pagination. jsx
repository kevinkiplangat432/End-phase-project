import React, { useEffect, useRef } from "react";
// Pagination component for infinite scrolling
function Pagination({ onLoadMore, hasMore, loading }) {
  // Ref for the loader element
  const loaderRef = useRef();
  // Setup Intersection Observer to trigger loading more items
  useEffect(() => {
    if (!hasMore || loading) return;
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.2 }
    );
    // Observe the loader element
    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [onLoadMore, hasMore, loading]);

  return (
    <div ref={loaderRef} className="flex justify-center py-6">
      {loading ? (
        <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin" />
      ) : (
        hasMore && <p className="text-gray-500 dark:text-gray-400">Scroll to load more...</p>
      )}
    </div>
  );
}

export default Pagination;