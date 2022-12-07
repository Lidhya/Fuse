import React, { useContext, useEffect, useState } from "react";
import Axios from "../axios";
import { UserContext } from "../context/UserContext";
import { errorHandler } from "./javascripts/errorHandler";
import Suggestion from "./Suggestion";

function Suggestions() {
  const { currentUser } = useContext(UserContext);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    try {
      Axios.get(`/user/suggestions/${currentUser._id}`)
        .then(({ data }) => {
          setSuggestions(data);
        })
        .catch(({ response }) => {
          errorHandler();
        });
    } catch (error) {
      errorHandler();
    }
  }, []);

  return (
    <div className="overflow-y-auto pt-20 h-screen  px-3 bg-gray-50 rounded dark:bg-gray-900">
      <ul className="">
        <li className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
            <span className="ml-3 font-semibold">Suggestions for you</span>
          </div>
        </li>
        {suggestions ? (
          suggestions.map((user) => <Suggestion key={user._id} user={user} />)
        ) : (
          <span className="text-center text-white p-2">
            There are no suggestions yet
          </span>
        )}
      </ul>
    </div>
  );
}

export default Suggestions;
