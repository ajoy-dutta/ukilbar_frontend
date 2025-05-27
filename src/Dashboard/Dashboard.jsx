
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  MdOutlineShoppingCart,
  MdDashboard,
  MdOutlineAccountTree,
  MdAccountBalanceWallet,
  MdAccountBox,
} from "react-icons/md";
import { FaBalanceScale, FaAngleUp, FaAngleDown, FaAccessibleIcon } from "react-icons/fa";
import {
  IoPersonRemoveSharp,
  IoPersonSharp,
  IoReorderThreeOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { AiFillAccountBook, AiFillProduct } from "react-icons/ai";
import { HiCurrencyBangladeshi, HiUserGroup } from "react-icons/hi";
import { IoIosStats } from "react-icons/io";
import { BiSolidReport } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiReceiveMoney, GiPayMoney  } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdvocates } from "../redux/advocateSlice";
import { logout } from "../redux/authSlice"
import { use } from "react";

const Dashboard = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth.user)
  const { advocates, status, error } = useSelector((state) => state.advocate);



  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdvocates());
    }
  }, [dispatch, status]);


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
                      dispatch(logout())
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

              
              {/* Configuration Menu */}
              <li
                ref={(el) => (menuRefs.current["party"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("configuration")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="Configuration"
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
                          to="/dashboard/Advocate"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                              : "flex items-center gap-2 p-2 hover:bg-blue-100"
                          }
                        >
                          Add Advocate
                        </NavLink>
                      </li>
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
                    <li>
                      <NavLink
                        to="/dashboard/addBank"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Add Bank
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
                          to="/dashboard/Advocate"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          Add Advocate
                        </NavLink>
                      </li>
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

                      <li>
                      <NavLink
                        to="/dashboard/addBank"
                        className={({ isActive }) =>
                          isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        }
                      >
                        Add Bank
                      </NavLink>
                    </li>

                    </ul>
                  </div>
                )}
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
                    {!isMinimized && <span>Sales</span>}
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
                        to="/dashboard/vokalatnama"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        VokalatnamaSale
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/bailbondSale"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                       BailBond Sales
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/form-sale"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                      Form Sales
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/advocate-all-fees"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Advocate All Fees
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/associate-renewal"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Associate Registration Renewal
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/advocate-change"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Advocate Change Fee
                      </NavLink>
                    </li>

                     <li>
                      <NavLink
                        to="/dashboard/shop-rent"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Shop Rent Collection
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/donation"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Donation
                      </NavLink>
                    </li>
                    
                  </ul>
                )}


            
              {/* Configuration Menu */}
              <li
                ref={(el) => (menuRefs.current["party"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("collection")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="collection"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <HiUserGroup className="text-lg" />
                    {!isMinimized && <span>Collection</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "collection" ? <FaAngleUp /> : <FaAngleDown />)}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "collection" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                        <NavLink
                          to="/dashboard/electricity-bill-collect"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                              : "flex items-center gap-2 p-2 hover:bg-blue-100"
                          }
                        >
                          Electricity Bill Collect
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/dashboard/bank-interest-collect"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                              : "flex items-center gap-2 p-2 hover:bg-blue-100"
                          }
                        >
                          Bank Interest Collect
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
                          to="/dashboard/electricity-bill-collect"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                           Electricity Bill Collect
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/dashboard/bank-interest-collect"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          Bank Interest Collect
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "product" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/vokalatnamasale"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          VokalatnamaSale
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/dashboard/bailbondSale"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                        BailBond Sales
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/dashboard/form-sale"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                        Form Sales
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/dashboard/advocate-all-fees"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                        Advocate All Fees
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/dashboard/associate-renewal"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                        Associate Registration Renewal
                        </NavLink>
                      </li>

                      <li>
                      <NavLink
                        to="/dashboard/advocate-change"
                        className={({ isActive }) =>
                          isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        }
                      >
                        Advocate Change Fee
                      </NavLink>
                     </li>

                     <li>
                      <NavLink
                        to="/dashboard/shop-rent"
                        className={({ isActive }) =>
                           isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        }
                      >
                        Shop Rent Collection
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/donation"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                            : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        }
                      >
                        Donation
                      </NavLink>
                    </li>
                      
                    </ul>
                  </div>
                )}
              </li>

              {/* Accounts Menu */}
              <li
                ref={(el) => (menuRefs.current["account"] = el)}
                className="relative"
              >
                <div
                  onClick={() => toggleMinimizedMenu("account")}
                  className={`flex items-center ${
                    isMinimized ? "justify-center" : "justify-between"
                  } gap-2 p-3 cursor-pointer hover:bg-blue-100`}
                  title="account"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <AiFillAccountBook className="text-lg" />
                    {!isMinimized && <span>Account</span>}
                  </div>
                  {!isMinimized &&
                    (activeMenu === "account" ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    ))}
                </div>

                {/* Subcategories - only show if not minimized and this menu is active */}
                {!isMinimized && activeMenu === "account" && (
                  <ul className="pl-8 space-y-2">
                    <li>
                      <NavLink
                        to="/dashboard/probabable-income-list"
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-2 p-2 bg-blue-950 text-white"
                            : "flex items-center gap-2 p-2 hover:bg-blue-100"
                        }
                      >
                        Probabable Income
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
                        Change password
                      </NavLink>
                    </li>
                  </ul>
                )}

                {/* Popup submenu for minimized mode */}
                {isMinimized && activePopup === "settings" && (
                  <div className="absolute left-16 top-0 bg-white shadow-lg rounded-lg w-48 z-20 border border-gray-300">
                    <ul className="space-y-2 p-2">
                      <li>
                        <NavLink
                          to="/dashboard/probabable-income-list"
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg transition-all duration-200"
                              : "flex items-center gap-2 p-2 text-gray-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          }
                        >
                          Probabable Income
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
                          Change password
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
                  title="settings"
                >
                  <div
                    className={`flex items-center ${
                      isMinimized ? "justify-center" : ""
                    } gap-2`}
                  >
                    <IoSettingsSharp className="text-lg" />
                    {!isMinimized && <span>settings</span>}
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
                        Profile
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
                        Change password
                      </NavLink>
                    </li>
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
                          Profile
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
                          Change password
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