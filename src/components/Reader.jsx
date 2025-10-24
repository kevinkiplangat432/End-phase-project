import React, { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";
// Reader component to display book content
function Reader({ book, onClose }) {
  const [content, setContent] = useState(""); // Book content state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  const [fontSize, setFontSize] = useState(16); // Font size state
  const contentRef = useRef(); // Ref for content container

  // Fetch book content when book changes

  useEffect(() => {
    if (!book) return;

    setLoading(true);
    setError(false);
    setContent("");

    // Try a list of likely readable formats (wide fallback)
    const candidates = [
      "text/plain; charset=utf-8",
      "text/plain; charset=utf-16",
      "text/plain; charset=us-ascii",
      "text/html; charset=utf-8",
      "text/html",
      "application/octet-stream",
    ];
    // Find the first available format URL
    const textUrl = candidates.reduce((acc, key) => acc || book.formats[key] || null, null);

    if (!textUrl) {
      setError(true);
      setLoading(false);
      return;
    }
    // Fetch the book content
    const fetchBook = async () => {
      try {
        const res = await fetch(textUrl);
        if (!res.ok) throw new Error("Network response not ok");
        const text = await res.text();
        setContent(text);
      } catch (err) {
        console.error("Failed to load book content:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [book]);

  useEffect(() => {
    // reset scroll to top when new content loaded
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [content]);
  // Return null if no book is provided
  if (!book) return null;

  const authors = (book.authors || []).map((a) => a.name).join(", ") || "Unknown";
  // Handlers for font size adjustment and scrolling
  const increase = () => setFontSize((s) => Math.min(24, s + 2));
  const decrease = () => setFontSize((s) => Math.max(12, s - 2));
  const scrollTop = () => {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Render Reader component
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{authors}</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={decrease} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800">A-</button>
          <button onClick={increase} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800">A+</button>
          <button onClick={scrollTop} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800">Top</button>
          <button onClick={onClose} className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700">Close</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6" ref={contentRef}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-500">Unable to load this book — unsupported format or network error.</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Try another book or check the formats.</p>
          </div>
        ) : (
          <div
            className="prose dark:prose-invert"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
}

export default Reader;
        