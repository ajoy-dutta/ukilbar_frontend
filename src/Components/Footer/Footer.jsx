import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaGooglePlusG } from "react-icons/fa";
import logo from "../../assets/Bangladesh-Bar.png";

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-800 pt-6 pb-2 text-sm font-sans">
      {/* Header Label */}
      <div className="bg-blue-600 text-white w-fit px-4 py-1 font-bold text-lg ml-6 rounded-t">
        Get in Touch!
      </div>

      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6 bg-slate-300 text-sm">
        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Contact Us</h3>
          <p><strong>📍 Address:</strong> <br />
  <span>
      Shahid Sarak Rd, Jashore<br />
      <span className="text-sm text-gray-600">Nearest Landmark: Judge Court Mor, Jashore</span>
    </span>          </p>
          <p className="mt-2"><strong>📞 Phone:</strong> 02223389807, 02223389809</p>
          <p className="mt-2"><strong>✉️ Email:</strong> info@barcouncil.gov.bd</p>
          <p className="mt-2">
            <strong>🕒 Working Days/Hours:</strong><br />
            Sunday–Thursday (Govt. Office Hour)<br />
            Friday, Saturday & Govt. Holidays Closed
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Follow Us</h3>
          <div className="flex space-x-3 text-white text-base">
            <a href="#"><FaFacebookF className="bg-blue-800 p-1 rounded-full w-7 h-7" /></a>
            <a href="#"><FaTwitter className="bg-blue-500 p-1 rounded-full w-7 h-7" /></a>
            <a href="#"><FaYoutube className="bg-red-600 p-1 rounded-full w-7 h-7" /></a>
            <a href="#"><FaLinkedinIn className="bg-blue-700 p-1 rounded-full w-7 h-7" /></a>
            <a href="#"><FaGooglePlusG className="bg-gray-600 p-1 rounded-full w-7 h-7" /></a>
          </div>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Important Links</h3>
          <ul className="space-y-1 text-blue-900 font-medium list-disc list-inside">
            <li><a href="#">Office of the Hon’ble President</a></li>
            <li><a href="#">Office of the Hon’ble Prime Minister</a></li>
            <li><a href="#">Supreme Court of Bangladesh</a></li>
            <li><a href="#">Law and Justice Division</a></li>
            <li><a href="#">Bangladesh Parliament</a></li>
            <li><a href="#">Legislative & Parliamentary Affairs Division</a></li>
            <li><a href="#">Laws of Bangladesh</a></li>
            <li><a href="#">Bangladesh Forms</a></li>
            <li><a href="#">Bangladesh National Portal</a></li>
            <li><a href="#">Bangladesh Railway</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-slate-400 text-center text-slate-700 py-2 text-sm">
        <p>© 2025 All rights reserved.</p>
        <p>Developed by Utshab Technology Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
