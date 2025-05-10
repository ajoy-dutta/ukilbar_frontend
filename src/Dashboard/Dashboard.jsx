
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  MdOutlineShoppingCart,
  MdDashboard,
  MdOutlineAccountTree,
} from "react-icons/md";
import { FaBalanceScale, FaAngleUp, FaAngleDown } from "react-icons/fa";
import {
  IoPersonRemoveSharp,
  IoPersonSharp,
  IoReorderThreeOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { HiCurrencyBangladeshi, HiUserGroup } from "react-icons/hi";
import { IoIosStats } from "react-icons/io";
import { BiSolidReport } from "react-icons/bi";
import { useUser } from "../Provider/UserProvider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiReceiveMoney, GiPayMoney  } from "react-icons/gi";

const Dashboard = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const { signOut } = useUser();
  const { user } = useUser(); // Get user context


   console.log("us",user)
  const menuRefs = useRef({});
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setActiveMenu(null);
    setActivePopup(null);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Toggle sidebar size
  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
    setActivePopup(null);
  };

  // Function to handle opening/closing of a menu (allow only one open menu at a time)
  const toggleMenu = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null); // Close the menu if it's already open
    } else {
      setActiveMenu(menuName); // Open the new menu and close the previous one
    }
  };

  // Toggle menu in minimized mode
  const toggleMinimizedMenu = (menuName) => {
    if (isMinimized) {
      setActivePopup(activePopup === menuName ? null : menuName);
    } else {
      toggleMenu(menuName);
    }
  };

  // Handle clicking outside to close popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        activePopup &&
        menuRefs.current[activePopup] &&
        !menuRefs.current[activePopup].contains(event.target)
      ) {
        setActivePopup(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePopup]);

  // Close all popups when expanded
  useEffect(() => {
    if (!isMinimized) {
      setActivePopup(null);
    }
  }, [isMinimized]);

  const profilePictureUrl = user.profile_picture
  ? `https://ajoydutta.com/${user.profile_picture}`
  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-gray-50 flex flex-col min-h-screen ">
          <div className="navbar sticky top-0 z-50 bg-blue-950 py-1 flex items-center justify-between min-h-10">
            <div>
              <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                <IoReorderThreeOutline />
              </label>

            </div>
            <div className="relative" ref={dropdownRef}>
              {/* Avatar Button */}
              <button
                className="btn bg-transparent hover:bg-transparent border-none m-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                    <img
                      src={profilePictureUrl}
                      alt="User"
                    />
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="absolute top-10 right-0 menu dropdown-content mt-2 w-52 bg-base-100 rounded-box p-2 shadow z-50">
                  {/* bg-base-100 rounded-box z-[1] w-52 p-2 shadow */}
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <li className="p-2 hover:bg-gray-200 rounded">
                      <div className="flex items-center gap-2">
                        <IoPersonSharp className="text-blue-950" />
                        <p>প্রোফাইল</p>
                      </div>
                    </li>
                  </Link>
                  <li
                    className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <IoPersonRemoveSharp className="text-blue-950" />
                      Log Out
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>

        <Outlet></Outlet>
        </div>
        <div
          className={`transition-all duration-300  relative bg-white shadow-lg ${
            isMinimized ? "w-16" : "w-64"
          }`}
        >
          {/* Sidebar Overlay */}
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Sidebar Content */}
          <ul
            className={`bg-white text-base-content max-h-full ${
              isMinimized ? "w-16" : "w-52"
            }`}
          >
            {/* Sidebar Header with Icon on the Right */}
            <div
              className={`flex items-center ${
                isMinimized ? "justify-center" : "justify-between"
              } p-3`}
            >
              <Link
                className={`flex flex-col gap-0 items-center ${
                  isMinimized ? "w-full" : ""
                }`}
              >
                {/* <img className="h-12 w-20" src={img} alt="Logo" /> */}
                {!isMinimized && (
                  <h3 className="font-semibold text-sm"></h3>
                )}
              </Link>
            </div>

            {/* Minimize Toggle Button */}
            <div className="flex justify-end px-3 mb-2">
              <button
                onClick={toggleSidebar}
                className="absolute -right-3  top-20 bg-blue-950 text-white p-1 rounded-full shadow-md z-10"
              >
                {isMinimized ? (
                  <FaChevronRight size={16} />
                ) : (
                  <FaChevronLeft size={16} />
                )}
              </button>
            </div>

            {/* Navigation Links */}
            <div className="mt-2 text-sm">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center ${
                          isMinimized ? "justify-center" : ""
                        } gap-2 p-3 bg-blue-950 text-white`
                      : `flex items-center ${
                          isMinimized ? "justify-center" : ""
                        } gap-2 p-3 hover:bg-blue-100`
                  }
                  title="Dashboard"
                >
                  <MdDashboard className="text-lg" />
                  {!isMinimized && "Dashboard"}
                </NavLink>
              </li>

              {/* Master Menu */}
              <li
                ref={(el) => (menuRefs.current["master"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("master")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="মাস্টার"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <MdOutlineAccountTree className="text-lg" />
                    {!isMinimized && <span>মাস্টার</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "master" ? <FaAngleUp /> : <FaAngleDown />)}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "master" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/division"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-1 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-1 hover:bg-blue-100"
                        }
                      >
                        বিভাগ
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/district"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        জেলা
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/thana"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        থানা
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/route"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        রুট
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/area"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        এলাকা
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/godownList"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        গুদামের নাম
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/PatymentModeList"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        পেমেন্ট পদ্ধতি
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/bankList"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        ব্যাংক
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/deposit"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-500 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        জমা
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/cost"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-500 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        খরচ
                      </NavLink>
                    </li>
                   
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "master" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/division"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          বিভাগ
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/district"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          জেলা
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/thana"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          থানা
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/route"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          রুট
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/area"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          এলাকা
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/godownList"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          গুদামের নাম
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/PatymentModeList"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          পেমেন্ট পদ্ধতি
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/bankList"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          ব্যাংক
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/cost"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          খরচ
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              {/* Party Menu */}
              <li
                ref={(el) => (menuRefs.current["party"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("configuration")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="পার্টি সমূহ"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <HiUserGroup className="text-lg" />
                    {!isMinimized && <span>Configuration</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "configuration" ? <FaAngleUp /> : <FaAngleDown />)}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "configuration" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/formSetup"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Form Setup
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/addBuilding"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Add Building
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/renter"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Add Renter
                      </NavLink>
                    </li>
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "party" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/form"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          Form Setup
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/building"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                         Add Building
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/renter"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                           Add Renter
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Employee Menu */}
              <li>
                <NavLink
                  to="/dashboard/employeeList"
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center ${
                          isMinimized ? "justify-center" : ""
                        } gap-2 p-3 bg-blue-950 text-white`
                      : `flex items-center ${
                          isMinimized ? "justify-center" : ""
                        } gap-2 p-3 hover:bg-blue-100`
                  }
                  title="কর্মরত ব্যাক্তি"
                >
                  <FaUserTie className="text-lg" />
                  {!isMinimized && "কর্মরত ব্যাক্তি"}
                </NavLink>
              </li>

              {/* Product Menu */}
              <li
                ref={(el) => (menuRefs.current["product"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("product")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="পণ্য"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <AiFillProduct className="text-lg" />
                    {!isMinimized && <span>পণ্য</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "product" ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    ))}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "product" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/product"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        পণ্যের তালিকা
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/productStock"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        পণ্য স্টক
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/productTransfer"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        পণ্য গোডাউন থেকে গোডাউন স্থানান্তর
                      </NavLink>
                    </li>
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "product" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/product"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          পণ্যের তালিকা
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/productStock"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          পণ্য স্টক
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/productTransfer"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          পণ্য গোডাউন থেকে গোডাউন স্থানান্তর
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Purchase Menu */}
              <li
                ref={(el) => (menuRefs.current["purchase"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("purchase")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="ক্রয়"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <IoIosStats className="text-lg" />
                    {!isMinimized && <span>ক্রয়</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "purchase" ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    ))}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "purchase" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/addpurchase"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        পণ্য ক্রয়
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/addEditPayment"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        অর্থাদি প্রদান
                      </NavLink>
                    </li>
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "purchase" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/addpurchase"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          পণ্য ক্রয়
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/addEditPayment"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          অর্থাদি প্রদান
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Sell Menu */}
              <li
                ref={(el) => (menuRefs.current["sell"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("sell")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="বিক্রয়"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <IoIosStats className="text-lg" />
                    {!isMinimized && <span>বিক্রয়</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "sell" ? <FaAngleUp /> : <FaAngleDown />)}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "sell" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/addEditSale"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        বিক্রয়
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/addEditReceive"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        অর্থাদি গ্রহণ
                      </NavLink>
                    </li>
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "sell" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/addEditSale"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          বিক্রয়
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/addEditReceive"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          অর্থাদি গ্রহণ
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Transaction Menu */}
              <li
                ref={(el) => (menuRefs.current["transaction"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("transaction")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="লেনদেন"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <HiCurrencyBangladeshi className="text-lg" />
                    {!isMinimized && <span>লেনদেন</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "transaction" ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    ))}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "transaction" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/addShuvoChalan"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        শুভ চালান
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/shuvoChalanList"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        শুভ চালান তালিকা
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/bankLenden"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        ব্যাংক লেনদেন
                      </NavLink>
                    </li>
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "transaction" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/addShuvoChalan"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          শুভ চালান
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/shuvoChalanList"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          শুভ চালান তালিকা
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/bankLenden"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          ব্যাংক লেনদেন
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Report Menu */}
              <li
                ref={(el) => (menuRefs.current["report"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("report")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="রির্পোট"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <BiSolidReport className="text-lg" />
                    {!isMinimized && <span>রির্পোট</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "report" ? <FaAngleUp /> : <FaAngleDown />)}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "report" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/incomeExpensesStatement"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        আয়/ ব্যায় /খরচ রির্পোট
                      </NavLink>
                    </li>
                    <li>
                        <NavLink
                          to="/dashboard/comissionStatement"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          কমিশনের রিপোর্ট
                        </NavLink>
                      </li>
                    <li>
                      <NavLink
                        to="/dashboard/depositDetails"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        জমার হিসাব বিবরণী
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/costDetails"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        খরচের হিসাব বিবরণী
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/Product_Buy"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        আমদানি বা ক্রয় পণ্য
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/Product_Sell"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        রপ্তানি বা বিক্রয় পণ্য
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/customer-account-statement"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Customer Account Statement
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/supplier-account-statement"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Supplier Account Statement
                      </NavLink>
                    </li>
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "report" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/incomeExpensesStatement"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          আয়/ ব্যায় /খরচ রির্পোট
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/costDetails"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          খরচের হিসাব বিবরণী
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/Product_Buy"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          আমদানি বা ক্রয় পণ্য
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/customer-account-statement"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          Customer Account Statement
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/supplier-account-statement"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          Supplier Account Statement
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Settings Menu */}
              <li
                ref={(el) => (menuRefs.current["settings"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("settings")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="সেটিংস"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <IoSettingsSharp className="text-lg" />
                    {!isMinimized && <span>সেটিংস</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "settings" ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    ))}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "settings" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        প্রোফাইল
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/passwordChange"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        পাসওয়ার্ড পরিবর্তন
                      </NavLink>
                    </li>
                    {user?.role === "admin" && ( // Show only if user is admin
                      <li>
                        <NavLink
                          to="/dashboard/staffApproval"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                              : "flex items-center gap-2 p-2 hover:bg-blue-100"
                          }
                        >
                          ব্যবহারকারী অনুমোদন
                        </NavLink>
                      </li>
                    )}
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "settings" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/profile"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          প্রোফাইল
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/passwordChange"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          পাসওয়ার্ড পরিবর্তন
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;