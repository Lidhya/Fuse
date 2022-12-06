import { createContext, useState } from "react";
import Axios from "../axios";
import { errorHandler } from "../Components/javascripts/errorHandler";

export const UserContext = createContext();

function User({ children }) {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const token = JSON.parse(localStorage.getItem("token")) || null;
  const [currentUser, setCurrentUser] = useState(user);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser("");
    window.location.reload();
  };

  const updateCurrentUser = () => {
    Axios.get(`/user/get/${currentUser._id}`)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        setCurrentUser(data);
      })
      .catch((error) => errorHandler());
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, logout, updateCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default User;
