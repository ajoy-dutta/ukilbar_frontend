import { NavLink } from "react-router-dom";
import logo from "../../assets/Bangladesh-Bar.png";
const Footer = () => {
  return (
    <footer className="bg-[#213555] text-white py-0">
      <div className="container mx-auto px-4 md:px-5">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-stretch items-start">
          {/* Logo and Heading Section */}
          <div className="grid grid-rows-1 gap-3">
            <div className="flex items-start">
              <div className="flex items-center justify-center gap-2">
                <img src={logo} alt="Logo" className="mt-2 w-12 h-12" />
                <div className="text-xl font-bold text-with-gradient lg:text-xl mt-2">
                  <NavLink to="/">Jashore Bar Association </NavLink>
                </div>
              </div>
            </div>


            <div className="text-left">
              <h3 className="text-xl font-bold">Contact Us</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-2">
                <strong>Location:</strong> Shahid Sarak Rd, Jashore
                <br /> <span className="text-sm text-gray-400">Nearest Landmark: Judge Court Mor, Jashore</span>
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                <strong>Mobile:</strong> 0123456789
              </p>
            </div>
          </div>
          {/* Google Map Section */}
          <div className="md:col-span-1 mt-1">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.1874515707204!2d89.20769047497876!3d23.163357607816465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff11f38516a8c7%3A0x348aecb7c6bd6899!2z4Kav4Ka24KeL4KawIOCmnOCnh-CmsuCmviDgpobgpofgpqjgppzgp4Dgpqzgp4Ag4Ka44Kau4Ka_4Kak4Ka_IOCmreCmrOCmqC0x!5e0!3m2!1sen!2sbd!4v1749899360454!5m2!1sen!2sbd"              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-lg"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Section */}
        </div>

        {/* Bottom Section */}
        <div className="mt-2 border-t border-gray-600 text-center">
          <p className="text-gray-400 text-base ">
            © 2025 All rights reserved.
          </p>
          <p className="text-gray-400 text-base">
            Developed by Utshab Technology Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;