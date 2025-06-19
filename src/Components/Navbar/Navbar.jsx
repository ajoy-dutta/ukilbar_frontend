import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import { logout } from "../../redux/authSlice";
import { fetchAdvocates } from "../../redux/advocateSlice";
import LeftLogo from "../../assets/ukil_bar.jpg";
import { FaUsers, FaUserTie, FaUserCheck, FaComments } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchAdvocates());
  }, [dispatch]);

  const navLinks = [
    { to: "/", label: "Home" },
    // { to: "blog", label: "Blog" },
    ...(user
      ? [
          { to: "/dashboard", label: "Dashboard" },
          {
            to: "/",
            label: "Sign Out",
            onClick: () => {
              dispatch(logout());
              navigate("/signin");
            },
          },
        ]
      : [{ to: "/signin", label: "Admin" }]),
  ];

  const mainNav = [
    {
      icon: <FaUsers className="mx-auto text-xl" />,
      title: "Bar Council Members",
      subtitle: "Authority of the Council",
      link: "/member-list",
    },
    {
      icon: <FaUserTie className="mx-auto text-xl" />,
      title: "Bar Council Committees",
      subtitle: "Committees List of Bar Council",
      link: "/committee",
    },
    {
      icon: <IoMdPhotos className="mx-auto text-xl" />,
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
      {/* Top Nav */}
      <div className="bg-sky-700 text-white text-sm px-4 py-1 flex justify-end gap-4">
        {navLinks.map((link) =>
          link.onClick ? (
            <button
              key={link.label}
              onClick={link.onClick}
              className="hover:underline"
            >
              {link.label}
            </button>
          ) : (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? "font-bold underline text-yellow-300" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          )
        )}
      </div>

      <div className="bg-white py-2 px-2">
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-x-6 text-center">
    {/* Left Logo */}
    <div className="flex justify-center">
      <img src={LeftLogo} alt="Left Logo" className="h-20 w-auto" />
    </div>

    {/* Title */}
    <div className="text-center">
      <h1 className="text-2xl md:text-4xl font-bold text-sky-800 border-b-2 border-sky-600 inline-block pb-1">
        District Bar Council, Jashore
      </h1>
      <br />
      <h2 className="text-lg md:text-xl text-cyan-900 mt-1 pt-1">
        যশোর জেলা আইনজীবী সমিতি, যশোর
      </h2>
    </div>
  </div>
</div>


{/* Main Navigation */}
<div className="bg-cyan-600 grid grid-cols-1 md:grid-cols-4 gap-1 text-white text-sm">
  {mainNav.map(({ icon, title, subtitle, link }) => (
    <NavLink
      key={title}
      to={link}
      className={({ isActive }) =>
        `flex items-center justify-center gap-3 px-3 py-4 text-center border border-white transition-all ${
          isActive ? "bg-cyan-800" : "hover:bg-cyan-700"
         }`
      }
    >
      <div className="text-2xl">{icon}</div>
      <div className="text-left">
        <p className="font-bold leading-tight">{title}</p>
        <p className="text-xs leading-none font-semibold">{subtitle}</p>
      </div>
    </NavLink>
  ))}
</div>



      {/* Mobile Menu */}
      <div className="lg:hidden px-4 py-2">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-sky-700 font-semibold"
        >
          {isDropdownOpen ? "Close Menu" : "Menu"}
        </button>
        {isDropdownOpen && (
          <ul className="mt-2 bg-slate-100 shadow px-4 py-2 rounded space-y-2">
            {mainNav.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.link}
                  onClick={() => setIsDropdownOpen(false)}
                  className="block py-1 hover:text-sky-700"
                >
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
