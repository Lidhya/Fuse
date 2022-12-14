import React, { useContext } from "react";
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Notifications from "./Components/Notifications";
import Error from "./Pages/Error";
import HomePage from "./Pages/HomePage";
import Layout from "./Pages/Layout";
import MessengerPage from "./Pages/MessengerPage";
import NewsPage from "./Pages/NewsPage";
import ProfilePage from "./Pages/ProfilePage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import BooksPage from "./Pages/BooksPage";
import SuggestionsPage from "./Pages/SuggestionsPage";

function App() {
  const { currentUser } = useContext(UserContext);

  // Create a client
  const queryClient = new QueryClient();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser?.fname) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  const AuthRoute = ({ children }) => {
    if (!currentUser) {
      return children;
    }
    return <Navigate to="/" />;
  };

  const router = createBrowserRouter([
    {
      path: "/signin",
      element: (
        <AuthRoute>
          {" "}
          <SigninPage />
        </AuthRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthRoute>
          <SignupPage />
        </AuthRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <QueryClientProvider client={queryClient}>
            <Layout />
          </QueryClientProvider>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/profile/:id",
          element: <ProfilePage />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
      ],
    },
    {
      path: "/messenger",
      element: (
        <ProtectedRoute>
          <QueryClientProvider client={queryClient}>
            <MessengerPage />
          </QueryClientProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/news",
      element: (
        <ProtectedRoute>
          <QueryClientProvider client={queryClient}>
            <NewsPage />
          </QueryClientProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/books",
      element: (
        <ProtectedRoute>
          <QueryClientProvider client={queryClient}>
            <BooksPage />
          </QueryClientProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/suggestions",
      element: (
        <ProtectedRoute>
          <QueryClientProvider client={queryClient}>
          <SuggestionsPage />
          </QueryClientProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: (
        <QueryClientProvider client={queryClient}>
          <Error />
        </QueryClientProvider>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
