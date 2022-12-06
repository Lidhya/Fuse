import React, { useState } from "react";
import Axios from "axios";
import BookCard from "./BookCard";
import Navbar from "./Navbar";
import { errorHandler } from "./javascripts/errorHandler";
import books_illustration from "../assets/Books/books_bg.jpg";

const bgStyle = {
  backgroundImage: `url(${books_illustration})`,
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const API_KEY = process.env.REACT_APP_BOOKS_API_KEY;

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setErrorMessage(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (search.length > 0) {
        setIsSubmit(true);
        Axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${API_KEY}`
        )
          .then(({ data }) => setBooks(data.items))
          .catch((error) => errorHandler());
      } else {
        setErrorMessage("Enter search key");
      }
    } catch (error) {
      errorHandler();
    }
  };

  return (
    <>
      <Navbar />
      <div style={bgStyle} className="overflow-y-scroll">
        <div className=" flex justify-center flex-col items-center ">
          <form className="my-20 mt-40 w-2/3 lg:w-1/3 top-40">
            <div className="bg-gray-900 rounded-xl p-3">
              <h1 className="m-3 text-white text-2xl font-bold font-mono text-center">
                Books are a uniquely portable magic. Find it!
              </h1>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative flex felx-wrap">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  value={search}
                  onChange={handleChange}
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-none "
                  placeholder="Search books..."
                  required
                />
                <button
                  onClick={handleSubmit}
                  className="text-white absolute right-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
                <p className="absolute left-10 bottom-1 text-red-400 text-xs">
                  {errorMessage && errorMessage}
                </p>
              </div>
            </div>
          </form>
          {isSubmit && (
            <div className="flex gap-2 flex-wrap justify-center mb-5">
              {books.length > 0 ? (
                books.map((book) => <BookCard key={book.id} book={book} />)
              ) : (
                <span className="bg-black text-white text-lg">
                  There are no results
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Books;
