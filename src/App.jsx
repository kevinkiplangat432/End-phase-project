import React, { useEffect, useState } from "react";
import CardCollection from "./components/CardCollection";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Gutendex Books</h1>
      <CardCollection books={books} />
    </div>
  );
}

export default App;