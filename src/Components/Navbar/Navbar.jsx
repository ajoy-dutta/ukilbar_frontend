import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../redux/authSlice";
import LeftLogo from "../../assets/govt.png"; // Replace as needed
import RightLogo from "../../assets/Bangladesh-Bar.png"; // Or another logo
import { FaUsers, FaUserTie, FaUserCheck, FaComments } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },

  ...(!user ? [{ to: "/signin", label: "Admin" }] : []),
];


  const mainNav = [
    {
      icon: <FaUsers className="mx-auto text-xl" />,
      title: "Bar Council Members",
      subtitle: "Authority of the Council",
      link: "/members",
    },
        {
        icon: <FaUserTie className="mx-auto text-xl" />,
        title: "Bar Council Committees",
        subtitle: "Committees List of Bar Council",
        link: "/committee",
        },

{
  icon: <IoMdPhotos  className="mx-auto text-xl" />,
  title: "Photo Gallery",
  subtitle: "Event & Media Gallery",
  link: "/media",
},

    {
      icon: <FaComments className="mx-auto text-xl" />,
      title: "Contact Us & Location",
      subtitle: "Find Us",
      link: "/contact",
    },
  ];

  return (
    <div className="w-full">
      {/* Top Green Bar */}
<div className="bg-sky-700 text-white text-sm px-4 py-1 flex justify-end gap-4">
        {navLinks.map((link) => (
          <NavLink key={link.label} to={link.to} className="hover:underline">
            {link.label}
          </NavLink>
        ))}
      </div>

  <div className="bg-white py-4 px-2">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
    {/* Left Logo */}


    {/* Title */}
    <div className="flex-1 text-center">
<h1 className="text-3xl md:text-4xl font-bold text-sky-800 border-b-2 border-sky-600 inline-block pb-1">
        District Bar Council, Jashore
      </h1>
      <br />
      <h2 className="text-xl text-cyan-900  inline-block mt-1 pt-1">
        যশোর জেলা আইনজীবী সমিতি, যশোর
      </h2>
    </div>

    {/* Right Logo
    <div className="flex-1 flex justify-center md:justify-start">
      <img src={RightLogo} alt="Right Logo" className="h-20 w-auto" />
    </div> */}
  </div>
</div>


      {/* Auth Button */}
      {/* <div className="flex justify-end items-center bg-slate-100 px-4 py-2">
        {user ? (
          <button
            onClick={() => dispatch(logout())}
            className="text-black hover:text-cyan-400 font-medium"
          >
            Sign Out
          </button>
        ) : (
          <NavLink to="/signin" className="text-black hover:text-cyan-400 font-medium">
            Sign In
          </NavLink>
        )}
      </div> */}

      {/* Main Navigation Boxes */}
<div className="bg-cyan-600 grid grid-cols-1 md:grid-cols-4 gap-2 text-slate-800 text-center text-sm">
        {mainNav.map(({ icon, title, subtitle, link }) => (
          <NavLink
            key={title}
            to={link}
            className="py-3 border-white border md:border-r-2 hover:bg-cyan-700 transition-all"
          >
            {icon}
            <p className="font-bold">{title}</p>
            <p className="text-xs">{subtitle}</p>
          </NavLink>
        ))}
      </div>

      {/* Mobile Hamburger Dropdown (optional, toggle mainNav links) */}
      <div className="lg:hidden px-4 py-2">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-green-700 font-semibold"
        >
          {isDropdownOpen ? "Close Menu" : "Menu"}
        </button>
        {isDropdownOpen && (
          <ul className="mt-2 bg-slate-100 shadow px-4 py-2 rounded space-y-2">
            {mainNav.map((item) => (
              <li key={item.title}>
                <NavLink to={item.link} onClick={() => setIsDropdownOpen(false)}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
