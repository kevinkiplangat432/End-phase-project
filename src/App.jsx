import React, { useEffect, useState } from "react";
import CardCollection from "./components/CardCollection";
import Header from "./components/Header";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gutendex.com/books/")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading books...</h2>;
  }

  return (
    <>
    <Header/>
    <div style={{ padding: "20px" }}>
      <CardCollection books={books} />
    </div>
    </>
  );
}

export default App;
