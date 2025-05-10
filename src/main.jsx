import { StrictMode } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SignIn from './Pages/Authentication/SignIn';
import Dashboard from './Dashboard/Dashboard';
import { UserProvider } from './Provider/UserProvider';
import ProtectedRoute from './Provider/ProtectedRoute';
import AddRenter from './Pages/Configuration/AddRenter';
import AddAdvocate from './Pages/Configuration/Add_Advocate';
import FormSetup from './Pages/FormSetup/FormSetup';
import AddBuilding from './Pages/AddBuilding/AddBuilding';

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
        path: "formSetup",
        element:<FormSetup></FormSetup>,
      },
      {
        path: "renter",
        element:<AddRenter></AddRenter>,
      },
      {
        path: "Advocate",
        element: <AddAdvocate></AddAdvocate>,
      },
      {
        path: "addBuilding",
        element:<AddBuilding></AddBuilding>,
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