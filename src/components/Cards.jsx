import React from "react";

function BookCard({ book }) {
  const { title, authors, formats } = book;
  const image = formats["image/jpeg"];

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        width: "200px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <h3 style={{ fontSize: "1rem", margin: "10px 0" }}>{title}</h3>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        {authors.length > 0
          ? authors.map((author) => author.name).join(", ")
          : "Unknown Author"}
      </p>
    </div>
  );
}

export default BookCard;
