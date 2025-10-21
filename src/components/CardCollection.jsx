import React from "react";
import Card from "./Cards";

function CardCollection({ books }) {
  const limitedBooks = books.slice(0, 30);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {limitedBooks.map((book) => (
        <Card key={book.id} book={book} />
      ))}
    </div>
  );
}

export default CardCollection;
