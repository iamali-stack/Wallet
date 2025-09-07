import React from 'react'
import './App.css'
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx"
import Home from "./Home.jsx"
import RecentTransactions from "./RecentTransactions.jsx"
import Analytics from "./Analytics.jsx"
import NotFound from "./NotFound.jsx"
import UserContextProvider from './Context/BalanceContext.jsx';

function App() {
  const router = createHashRouter([
    {path: "/", element: <Layout/>, children: [
      { index: true, element: <Home/> },
      {path: "home", element: <Home/>},
      {path: "transactions", element: <RecentTransactions/>},
      {path: "analytics", element: <Analytics/>},
      { path: "*", element: <NotFound /> },
    ]},
  ]);

  return (
    <>  
    <UserContextProvider>
  <RouterProvider router={router} />
    </UserContextProvider>
   
    </>
  
  )
}

export default App