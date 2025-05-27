import { StrictMode } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from './redux/store';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SignIn from './Pages/Authentication/SignIn';
import Dashboard from './Dashboard/Dashboard';
import ProtectedRoute from './Provider/ProtectedRoute';
import AddRenter from './Pages/Configuration/AddRenter';
import AddAdvocate from './Pages/Configuration/Add_Advocate';
import FormSetup from './Pages/Configuration/FormSetup';
import AddBuilding from './Pages/Configuration/AddBuilding';
import AddBank from './Pages/Configuration/AddBank';
import Vokalotnama from './Pages/Sales/vokalotnama/Vokalotnama.jsx';
import BailbondSale from './Pages/Sales/Bailbond/BailbondSale.jsx';
import SaleList from './Pages/Sales/vokalotnama/SaleList.jsx';
import Profile from './Pages/Authentication/Profile.jsx';
import AssociateRenewal from './Pages/Sales/Renewal Registration/AssociateRenewal.jsx';
import AssociateList from './Pages/Sales/Renewal Registration/AssociateList.jsx';
import AdvocateChange from './Pages/Advocate Change/AdvocateChange.jsx';
import ChangeList from './Pages/Advocate Change/ChangeList.jsx';
import ShopRent from './Pages/Sales/Rent/ShopRent.jsx';
import ShopRentList from './Pages/Sales/Rent/ShopRentList.jsx';
import FundCollection from './Pages/Fund Collection/FundCollection.jsx';
import FundList from './Pages/Fund Collection/FundList.jsx';
import AdvocateFees from './Pages/Advocate all Fees/AdvocateFees.jsx';
import ElectricityBill from './Pages/Collection/ElectricityBill.jsx';
import ElectricityBillList from './Pages/Collection/ElectricityBillList.jsx';
import BankInterest from './Pages/Collection/BankInterest.jsx';
import BankInterestList from './Pages/Collection/BankInterestList.jsx';
import FormSale from './Pages/Sales/FormSale/FormSale.jsx';
import FormSellList from './Pages/Sales/FormSale/FormSellList.jsx';
import ProbabableIncome from './Pages/Accounts/Probabable Income/ProbabableIncome.jsx';

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
        path: "profile",
        element:<Profile></Profile>,
      },
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
      {
        path: "addBank",
        element:<AddBank></AddBank>,
      },

      {
        path: "vokalatnama",
        element: <Vokalotnama></Vokalotnama>,
      },
      
      {
        path: "sale-list",
        element: <SaleList></SaleList>,
      },

      {
        path: "bailbondSale",
        element: <BailbondSale></BailbondSale>,
      },
      {
        path: "advocate-all-fees",
        element: <AdvocateFees></AdvocateFees>,
      },
      {
        path: "associate-renewal",
        element: <AssociateRenewal></AssociateRenewal>,
      },

      {
        path: "associate-renewal-list",
        element: <AssociateList></AssociateList>,
      },

      {
        path: "advocate-change",
        element: <AdvocateChange></AdvocateChange>,
      },

      {
        path: "advocate-change-list",
        element: <ChangeList></ChangeList>,
      },

      {
        path: "shop-rent",
        element: <ShopRent></ShopRent>,
      },

      {
        path: "shop-rent-list",
        element: <ShopRentList></ShopRentList>,
      },

      {
        path: "donation",
        element: <FundCollection></FundCollection>,
      },

      {
        path: "donation-list",
        element: <FundList></FundList>,
      },

      {
        path: "electricity-bill-collect",
        element: <ElectricityBill></ElectricityBill>,
      },

      {
        path: "electricity-bill-list",
        element: <ElectricityBillList></ElectricityBillList>,
      }, 

      {
        path: "bank-interest-collect",
        element: <BankInterest></BankInterest>,
      }, 

      {
        path: "bank-interest-list",
        element: <BankInterestList></BankInterestList>,
      }, 

      {
        path: "form-sale",
        element: <FormSale></FormSale>,
      },

      {
        path: "form-sale-list",
        element: <FormSellList></FormSellList>,
      },

      {
        path: "probabable-income-list",
        element: <ProbabableIncome></ProbabableIncome>,
      },

    ],
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>

);