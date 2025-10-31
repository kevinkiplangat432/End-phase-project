import React from "react";
import BookList from "../components/BookList";
import useLocalStorage from "../hooks/useLocalStorage";

function Favorites() {
  const [likedBooks, setLikedBooks] = useLocalStorage("likedBooks", []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Favorite Books</h1>

      {likedBooks.length > 0 ? (
        <BookList
          books={likedBooks}
          likedBooks={likedBooks}
          toggleLike={(book) =>
            setLikedBooks((prev) =>
              prev.filter((b) => b.id !== book.id)
            )
          }
          libraryBooks={[]} 
          toggleLibrary={() => {}}
        />
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          You haven’t liked any books yet. Browse and tap the heart icon to add some!
        </p>
      )}
    </div>
  );
}

export default Favorites;
