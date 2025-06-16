import { useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import {useUser} from "../../Provider/UserProvider"
import BangladeshBarCouncil from "../../assets/Bangladesh-Bar.png";

const Navbar = () => {
    const { user, signOut } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const navLinks = [
        { to: "/dashboard", label: "Dashboard", auth: true },
        { to: "/", label: "Home" },
        { to: "/committee", label: "Committee List" },
        { to: "/member-list", label: "Member List" },
        { to: "/media", label: "Media" },
        { to: "/contact", label: "Contact" },
        { to: "/helpline", label: "Help Line" },
    ];

const renderLinks = (isMobile = false) =>
  navLinks
    .filter(link => !link.auth || user)
    .map(({ to, label }) => (
      <li key={label}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `text-black hover:text-cyan-400 ${isActive ? 'text-cyan-400 font-semibold' : ''}`
          }
          onClick={isMobile ? handleDropdownToggle : undefined}
        >
          {label}
        </NavLink>
      </li>
    ));


    return (
        <div className="navbar sticky top-0 z-[1000] bg-slate-50 flex items-center justify-between px-4 h-[60px]">
            {/* Left section */}
            <div className="flex items-center w-full justify-between lg:justify-start gap-4">
                {/* Mobile Hamburger */}
                <div className="lg:hidden">
                    <button
                        onClick={handleDropdownToggle}
                        className="btn btn-ghost p-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h12M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Logo & Title */}
                <NavLink to="/" className="flex items-center gap-2">
                    <img className="w-10" src={BangladeshBarCouncil} alt="Logo" />
                    <span className="text-xl font-bold whitespace-nowrap hidden md:inline text-with-gradient">
                        Jessore Bar Association
                    </span>
                </NavLink>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-6 font-serif text-[16px]">
                    {renderLinks()}
                </ul>
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-4 font-serif text-sm whitespace-nowrap">
                {user ? (
                    <button onClick={signOut} className="text-black hover:text-cyan-400">
                        Sign Out
                    </button>
                ) : (
                    <NavLink to="/signin" className="text-black hover:text-cyan-400">
                        Sign In
                    </NavLink>
                )}
            </div>


            {/* Mobile Dropdown */}
            {isDropdownOpen && (
                <ul className="lg:hidden absolute top-[60px] left-0 w-full bg-slate-100 shadow-md z-[999] px-4 py-2 flex flex-col gap-2 font-serif font-semibold">
                    {renderLinks(true)}
                    {user ? (
                        <li>
                            <button onClick={signOut} className="hover:text-cyan-400 w-full text-left">
                                Sign Out
                            </button>
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login" onClick={handleDropdownToggle} className="hover:text-cyan-400">
                                Sign In
                            </NavLink>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Navbar;
