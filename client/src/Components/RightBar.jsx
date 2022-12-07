import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Axios from "../axios";
import Conversations from "./Conversations";
import { errorHandler } from "./javascripts/errorHandler";
import CircularProgress from "@mui/material/CircularProgress";
import Suggestion from "./Suggestion";

function RightBar() {
  const { currentUser } = useContext(UserContext);
  const [suggestions, setSuggestion] = useState([]);
  const [conversations, setConversations] = useState([]);

  const { isLoading } = useQuery(["suggestions"], () => {
    return Axios.get(`/user/suggestions/${currentUser._id}`)
      .then(({ data }) => {
        const slicedData = data.slice(0, 4);
        setSuggestion(slicedData);
        return slicedData;
      })
      .catch(({ response }) => {
        errorHandler();
      });
  });

  useEffect(() => {
    try {
      Axios.get(`/conversations/${currentUser?._id}`)
        .then(({ data }) => {
          setConversations(data);
        })
        .catch((error) => errorHandler());
    } catch (err) {
      errorHandler();
    }
  }, [currentUser._id]);


  return (
    <aside className="fixed w-1/5 " aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3  rounded-lg shadow-md bg-gray-900">
        {isLoading && <CircularProgress color="secondary" />}
        {suggestions.length > 0 && (
          <ul className="space-y-2 ">
            <li>
              <p className=" items-center  p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                <span className="font-semibold">Suggestions for you</span>
              </p>
            </li>
            {suggestions &&
              suggestions.map((user) => (
               <Suggestion key={user._id} user={user}/>
              ))}
          </ul>
        )}
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <p className="flex items-center  p-2 text-base font-normal text-white">
              <span className=" font-semibold">Messages</span>
            </p>
          </li>
          <li className="overflow-y-scroll over max-h-60">
            {conversations.length > 0 ? (
              conversations.map((convo) => (
                <Link
                  to={"/messenger"}
                  key={convo._id}
                  className="dark:hover:bg-gray-700 dark:text-white group"
                >
                  <Conversations conversation={convo} />
                </Link>
              ))
            ) : (
              <span className="text-center text-white p-2">
                There are no conversations yet
              </span>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default RightBar;
