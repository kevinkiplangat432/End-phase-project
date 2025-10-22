// src/components/Reader.jsx
import React, { useState, useEffect } from "react";

function Reader({ book, onClose }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!book) return;

    // Try to find a readable text file (plain text or HTML)
    const textUrl =
      book.formats["text/plain; charset=utf-8"] ||
      book.formats["text/plain; charset=us-ascii"] ||
      book.formats["text/html; charset=utf-8"] ||
      book.formats["text/html"];

    if (!textUrl) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        const res = await fetch(textUrl);
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

  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-auto z-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Close
        </button>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        By {book.authors.map((a) => a.name).join(", ")}
      </p>

      {loading ? (
        <p>Loading book content...</p>
      ) : error ? (
        <p className="text-red-500">Unable to load this book. Try another format.</p>
      ) : (
        <div
          className="prose dark:prose-invert max-w-none"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Reader;
