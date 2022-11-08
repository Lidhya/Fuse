import React,{useState} from 'react';
import { Routes, Route, RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import Layout from './Pages/Layout';
import Profile from './Pages/Profile';
import SigninPage from './Pages/SigninPage';
import SignupPage from './Pages/SignupPage';

function App() {
let currentUser=true

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
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
          element: <Profile />,
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
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
  // return (
  //   <>
  //     <Routes>
  //       <Route path='/' element={<HomePage/>}/>
  //       <Route path='/signin' element={<SigninPage/>}/>
  //       <Route path='/signup' element={<SignupPage/>}/>
  //     </Routes>
  //   </>
  // );
}

export default App;
