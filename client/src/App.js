import React from 'react';
import { RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Notifications from './Components/Notifications';
import Error from './Pages/Error';
import HomePage from './Pages/HomePage';
import Layout from './Pages/Layout';
import MessengerPage from './Pages/MessengerPage';
import NewsPage from './Pages/NewsPage';
import ProfilePage from './Pages/ProfilePage';
import SigninPage from './Pages/SigninPage';
import SignupPage from './Pages/SignupPage';

function App() {
  let currentUser = true

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
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
      path: "/signin",
      element: <SigninPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/messenger",
      element:
        <ProtectedRoute>
          <MessengerPage />
        </ProtectedRoute>,
    },
    {
      path: "/news",
      element:
        <ProtectedRoute>
          <NewsPage />
        </ProtectedRoute>,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
