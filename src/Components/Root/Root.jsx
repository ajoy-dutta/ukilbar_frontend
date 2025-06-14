import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../provider/UserProvider"; // Adjust path if needed
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';  
import Footer from "../Footer/Footer";

export default function Root() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar></Navbar>
       <Outlet></Outlet>
       <Footer></Footer>
    </div>
  );
}
