import React, { Suspense } from "react";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Favorites from "./pages/Favourites";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <div className="min-h-screen 
        flex 
        flex-col
         bg-gray-100 
         text-gray-900 
         dark:bg-gray-900 
         dark:text-gray-100 
         transition-colors
         duration-300">
          <Header />

          <main className="flex-grow 
          container 
          mx-auto 
          px-4 
          py-6">
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<Library />} />
                <Route path="/favourites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route
                  path="*"
                  element={
                    <div className="text-center mt-20">
                      <h2 className="text-3xl 
                      font-semibold mb-4">
                        404 - Page Not Found
                        </h2>
                      <p className="text-gray-500 
                      dark:text-gray-400"
                      >
                        Sorry, the page you’re looking for doesn’t exist.
                      </p>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </main>

          <footer className="text-center
           py-4 
           border-t 
            border-gray-300 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Readify -build by Team Readify courtesy of the Gutendex Project        </p>
          </footer>
        </div>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;