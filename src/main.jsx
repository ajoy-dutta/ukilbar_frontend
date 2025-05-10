import { StrictMode } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SignIn from './Pages/Authentication/SignIn';
import DashboardHome from './Pages/DashboardHome/DashboardHome';
import Dashboard from './Dashboard/Dashboard';
import { UserProvider } from './Provider/UserProvider';
import ProtectedRoute from './Provider/ProtectedRoute';
import AddRenter from './Pages/Configuration/AddRenter';
import AddAdvocate from './Pages/Configuration/Add_Advocate';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute> 
        <Dashboard/>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboardHome",
        element:<DashboardHome></DashboardHome>,
      },
      {
        path: "renter",
        element:<AddRenter></AddRenter>,
      },
      {
        path: "Advocate",
        element: <AddAdvocate></AddAdvocate>,
      },
      
    ],
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
  </React.StrictMode>

);