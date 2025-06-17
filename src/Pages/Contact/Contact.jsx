import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-white py-6 px-4 md:px-8 lg:px-16">
      {/* Map Section */}
      <div className="mb-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.1874515707204!2d89.20769047497876!3d23.163357607816465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff11f38516a8c7%3A0x348aecb7c6bd6899!2z4Kav4Ka24KeL4KawIOCmnOCnh-CmsuCmviDgpobgpofgpqjgppzgp4Dgpqzgp4Ag4Ka44Kau4Ka_4Kak4Ka_IOCmreCmrOCmqC0x!5e0!3m2!1sen!2sbd!4v1749899360454!5m2!1sen!2sbd"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg shadow-lg"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Form & Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your name *"
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Your email address *"
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Get in touch</h2>
          <p className="mb-4 text-gray-700">
            What you'd like to share is with us. If you'd like to contact us here with questions or suggestions, we’d love to hear from you. If you’ve got a comment about this website you can send us your feedback too!
          </p>

          <div className="space-y-4 text-sm">
       <div>
  <h3 className="text-lg font-semibold text-green-700 mb-1">The Office</h3>
  <p className="flex items-start gap-2">
    <FaMapMarkerAlt className="text-blue-600 mt-1" />
    <span>
      Shahid Sarak Rd, Jashore<br />
      <span className="text-sm text-gray-600">Nearest Landmark: Judge Court Mor, Jashore</span>
    </span>
  </p>
  <p className="flex items-center gap-2 mt-2">
    <FaPhoneAlt className="text-blue-600" />
    02223389807, 02223389809
  </p>
  <p className="flex items-center gap-2 mt-2">
    <FaEnvelope className="text-blue-600" />
    info@barcouncil.gov.bd
  </p>
</div>


            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-700 mb-1">Business Hours</h3>
              <p className="flex items-start gap-2">
                <FaClock className="text-blue-600 mt-1" />
                <span>
                  <strong>Sunday - Thursday:</strong> (As per Govt. Office hour)
                  <br />
                  <strong>Friday, Saturday & Holidays:</strong> Closed
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
