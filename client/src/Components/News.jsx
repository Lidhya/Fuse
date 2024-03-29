import React, { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
import { countries } from "./javascripts/Countries";
import errImg from "../assets/error/404 Error Page not Found with people connecting a plug-amico.png";
const NEWS_API = process.env.REACT_APP_NEWSDATA_API_KEY;

function News() {
  Modal.setAppElement("#root");
  const [country, setCountry] = useState("in");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get(
      `https://newsdata.io/api/1/news?apikey=${NEWS_API}&country=${country}`,
      { crossdomain: true }
    )
      .then(({ data }) => {
        setArticles(data.results);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [country]);

  function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  return (
    <div className="m-3 flex flex-col justify-around">
      <div className="w-40 top-16 sticky">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Choose a country
        </label>
        <select
          id="countries"
          onChange={(e) => setCountry(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {countries.map((country, index) => (
            <option key={index} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-5">
        {articles.length ? (
          articles.map((article, index) => (
            <div
              key={index}
              className="max-w-sm max-h-sm bg-white rounded-lg border border-gray-200 shadow-md "
            >
              {isImage(article.image_url) && (
                <img
                  className="rounded-t-lg"
                  src={article.image_url}
                  alt="news img"
                />
              )}
              <div className="p-5">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {article.title}
                  </h5>
                </div>
                {article.creator && (
                  <span className="font-light text-xs">
                    Author: {article.creator}
                  </span>
                )}
                <p className="mb-3 font-normal text-gray-700 ">
                  {article.description && truncate(article.description, 300)}
                </p>
                {article.link && (
                  <a
                    href={article.link}
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="max-w-sm max-h-sm bg-white rounded-lg border border-gray-200 shadow-md ">
            <img className="rounded-t-lg" src={errImg} alt="" />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Oops! {error}
              </h5>
              <p className="mb-3 font-normal text-gray-700 ">
                Something went wrong, check your internet connection
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
