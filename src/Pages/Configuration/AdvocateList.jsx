import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";
import { FaEdit, FaTrash, FaFilePdf, FaInfoCircle, FaPrint } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdvocateList = () => {
  // const [advocates, setAdvocates] = useState([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const advocates = useSelector((state) => state.advocate.advocates);

 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this advocate?")) {
      try {
        await AxiosInstance.delete(`/advocates/${id}/`);
        setAdvocates(advocates.filter((adv) => adv.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById("printable-area").innerHTML;
    const newWindow = window.open("", "_blank", "width=900,height=700");
    newWindow.document.write(`
        <html>
        <head>
            <style>
            body {
                font-family: 'Kalpurush', 'SolaimanLipi', 'sans-serif';
                margin: 40px;
                color: #000;
            }
            h1 {
                text-align: center;
                font-size: 24px;
                margin-bottom: 30px;
                font-weight: bold;
                border-bottom: 2px solid #000;
                padding-bottom: 10px;
            }
            .section-title {
                margin-top: 20px;
                font-weight: bold;
                font-size: 16px;
                border-bottom: 1px solid #999;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px 16px;
                font-size: 14px;
                margin-top: 10px;
            }
            .info-grid div {
                margin-bottom: 6px;
            }
            ul {
                padding-left: 20px;
                margin-top: 5px;
            }
            </style>
        </head>
        <body onload="window.print(); window.close();">
            <h1>আইনজীবীর বিস্তারিত তথ্য</h1>
            ${printContents}
        </body>
        </html>
    `);
    newWindow.document.close();
    };

  const openModal = (advocate) => {
    setSelectedAdvocate(advocate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdvocate(null);
  };

  const handleEdit = (item) => {
    navigate("/dashboard/Advocate/", { state: { advocateData: item } });
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 bg-gray-200 rounded-lg px-4 py-2 hover:bg-gray-300"
      >
        <IoArrowBackSharp className="text-xl" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <h2 className="text-xl font-bold mb-4">Advocate List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Phone</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Bar Reg. No.</th>
              <th className="border px-3 py-2">Gender</th>
              <th className="border px-3 py-2">DOB</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {advocates.map((adv, index) => (
              <tr key={adv.id} className="text-center">
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{adv.name_english}</td>
                <td className="border px-2 py-1">{adv.phone}</td>
                <td className="border px-2 py-1">{adv.email}</td>
                <td className="border px-2 py-1">{adv.bar_registration_number}</td>
                <td className="border px-2 py-1">{adv.gender}</td>
                <td className="border px-2 py-1">{adv.date_of_birth}</td>
                <td className="border px-2 py-1 flex justify-center gap-2">
                  <button
                    onClick={() => openModal(adv)}
                    className="text-indigo-600 hover:text-indigo-800 text-lg"
                  >
                    <FaInfoCircle />
                  </button>
                  <button
                    onClick={() => handleEdit(adv)}
                    className="text-blue-600 hover:text-blue-800 text-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(adv.id)}
                    className="text-red-600 hover:text-red-800 text-lg"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedAdvocate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full rounded-md p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handlePrint}
                  className="text-green-600 border px-2 py-1 rounded hover:bg-green-100"
                >
                  <FaPrint className="inline mr-1" /> Print
                </button>
                <button onClick={closeModal} className="text-red-500 text-4xl">
                  ×
                </button>
            </div>

           <div id="printable-area">
            <div className="info-grid">
                <div><strong>স্ট্যাটাস:</strong> {selectedAdvocate.status || "N/A"}</div>
                <div><strong>নাম (ইংরেজি):</strong> {selectedAdvocate.name_english}</div>
                <div><strong>নাম (বাংলা):</strong> {selectedAdvocate.name_bengali}</div>
                <div><strong>পিতার নাম:</strong> {selectedAdvocate.father_name}</div>
                <div><strong>মাতার নাম:</strong> {selectedAdvocate.mother_name}</div>
                <div><strong>স্বামী/স্ত্রীর নাম:</strong> {selectedAdvocate.husband_or_wife_name}</div>
                <div><strong>ফোন:</strong> {selectedAdvocate.phone}</div>
                <div><strong>ইমেইল:</strong> {selectedAdvocate.email}</div>
                <div><strong>লিঙ্গ:</strong> {selectedAdvocate.gender}</div>
                <div><strong>বৈবাহিক অবস্থা:</strong> {selectedAdvocate.marital_status}</div>
                <div><strong>জন্ম তারিখ:</strong> {selectedAdvocate.date_of_birth}</div>
                <div><strong>এনআইডি:</strong> {selectedAdvocate.nid_number}</div>
                <div><strong>রক্তের গ্রুপ:</strong> {selectedAdvocate.blood_group}</div>
                <div><strong>ধর্ম:</strong> {selectedAdvocate.religion}</div>
                <div><strong>বর্তমান ঠিকানা:</strong> {selectedAdvocate.current_address}</div>
                <div><strong>স্থায়ী ঠিকানা:</strong> {selectedAdvocate.permanent_address}</div>
                <div><strong>শিক্ষাগত যোগ্যতা:</strong> {selectedAdvocate.education}</div>
                <div><strong>বার রেজি. নম্বর:</strong> {selectedAdvocate.bar_registration_number}</div>
                <div><strong>আইনজীবী হিসেবে ভর্তি:</strong> {selectedAdvocate.enrollment_date_As_lawyer}</div>
                <div><strong>সদস্য হিসেবে ভর্তি:</strong> {selectedAdvocate.enrollment_date_As_member}</div>
                <div><strong>চর্চাকারী আদালত:</strong> {selectedAdvocate.practicing_court_name}</div>
                <div><strong>অবসর গ্রহণের তারিখ:</strong> {selectedAdvocate.retirement_date}</div>
                <div><strong>মৃত্যুর তারিখ:</strong> {selectedAdvocate.death_date}</div>
               <div style={{ gridColumn: "span 2" }}>
                <strong>মন্তব্য:</strong> {selectedAdvocate.remarks}
               </div>

            </div>

            {/* Children */}
            <div className="section-title">সন্তানদের তথ্য</div>
            {selectedAdvocate.children_name?.length > 0 ? (
                <ul>
                {selectedAdvocate.children_name.map((child, index) => (
                    <li key={index}>
                    <strong>{child.name}</strong> – জন্ম তারিখ: {child.dob}
                    </li>
                ))}
                </ul>
            ) : (
                <p>কোনো তথ্য পাওয়া যায়নি।</p>
            )}

            {/* Nominees */}
            <div className="section-title">নমিনিদের তথ্য</div>
            {selectedAdvocate.nominee?.length > 0 ? (
                <ul>
                {selectedAdvocate.nominee.map((nom, index) => (
                    <li key={index}>
                    <strong>{nom.name}</strong> – সম্পর্ক: {nom.relation}, যোগাযোগ: {nom.contact}
                    </li>
                ))}
                </ul>
            ) : (
                <p>কোনো তথ্য পাওয়া যায়নি।</p>
            )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdvocateList;
