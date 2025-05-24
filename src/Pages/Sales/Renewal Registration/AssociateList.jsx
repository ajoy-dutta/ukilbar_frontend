import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import { useNavigate } from 'react-router-dom';
import RenewalModal from './RenewalModal';
import { IoArrowBackSharp } from "react-icons/io5";


const AssociateList = () => {
  const [renewalData, setRenewalData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [advocateId, setAdvocateId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editData, setEditData] = useState(null);



  const openModal = (associateId, data = null) => {
    setSelectedId(associateId);
    setEditData(data);
    setModalOpen(true);
  };



  const handleIdChange = (e) => {
    const selectedId = e.target.value;
    setAdvocateId(selectedId);
  };


  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get("associate-registration/");
      setRenewalData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

   
  useEffect(() => {
      fetchData();
    }, []);


  const handleDelete = async (id) => {
    setFilteredData(prevData => prevData.filter(item => item.id !== id));
    try {
        await AxiosInstance.delete(`associate-registration/${id}`);
        fetchData();
    } catch (error) {
        console.error("Delete failed:", error);
    }
    };

    const handleEdit = (renewal) => {
      navigate("/dashboard/associate-renewal/", { state: { renewalData: renewal } });
    };



  useEffect(() => {
    let filtered = [...renewalData];

    if (fromDate) {
      filtered = filtered.filter((item) => item.renewal_date >= fromDate);
    }

    if (toDate) {
      filtered = filtered.filter((item) => item.renewal_date <= toDate);
    }

    if (advocateId) {
      filtered = filtered.filter((item) => item.advocate_id === advocateId);
    }

    setFilteredData(filtered);
  }, [fromDate, toDate, advocateId, renewalData]);



  return (
    <div>
      <div className="bg-white p-6 mx-8 rounded-md w-full mx-auto">
        
       <button onClick={(e)=> handleEdit()} className="flex items-center gap-2 mt-4 mb-4 bg-gray-200 rounded-lg px-4 py-2 hover:bg-gray-300">
          <IoArrowBackSharp className="text-xl" />
          <span className="text-sm font-medium">Back</span>
        </button>
        
        {/* Date Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border px-2 py-1 rounded-md w-full bg-sky-50"
            />
          </div>
          <div>
            <label className="text-sm font-medium">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border px-2 py-1 rounded-md w-full bg-sky-50"
            />
          </div>

          <div >
          <label
            htmlFor="handleIdChange"
            className="block text-gray-700 font-semibold"
          >
            Advocate Id
          </label>
          <input
            type="text"
            id="advocateId"
            value={advocateId}
            onChange={handleIdChange}
            className="w-full p-2 border border-gray-300 rounded bg-sky-50"
            placeholder="Enter advocate ID"
          />
        </div>
        </div>

        <p className="text-gray-800 mb-2 font-bold text-xl text-left mt-8">
            Associate List
        </p>

        <div className="mt-4 mr-6">
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                <th className="px-2 py-2 border">Registration Date</th>
                <th className="px-2 py-2 border">Receipt No.</th>
                <th className="px-2 py-2 border">Licence No.</th>
                <th className="px-2 py-2 border">Name</th>
                <th className="px-2 py-2 border">Advocate Name</th>
                <th className="px-2 py-2 border">Advocate ID</th>
                <th className="px-2 py-2 border">Entry Fee</th>
                <th className="px-2 py-2 border">Book Rate</th>
                <th className="px-2 py-2 border">Total</th>
                <th className="px-2 py-2 border">Renewal</th>
                <th className="px-2 py-2 border">Action</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredData.length > 0 ? (
                filteredData.map((associate, index) => (
                    <tr key={index} className="text-center text-sm border-t">
                    <td className="px-2 py-2 border">{associate.registration_date}</td>
                    <td className="px-2 py-2 border">{associate.receipt_no}</td>
                    <td className="px-2 py-2 border">{associate.license_no}</td>
                    <td className="px-2 py-2 border">{associate.name}</td>
                    <td className="px-2 py-2 border">{associate.advocate_name}</td>
                    <td className="px-2 py-2 border">{associate.advocate_id}</td>
                    <td className="px-2 py-2 border">{associate.entry_fee}</td>
                    <td className="px-2 py-2 border">{associate.book_rate}</td>
                    <td className="px-2 py-2 border">{associate.total}</td>
                    <td>
                      <button
                        className="bg-green-600 px-2 py-1 text-white rounded-md hover:bg-green-700"
                        onClick={() => openModal(associate.id)}
                      >
                        renewal
                      </button>
                    </td>
                    
                    <td className="px-1 py-2 border">
                       <div className="flex gap-2">
                        <button 
                        className="bg-blue-600 px-2 py-1 text-white rounded-md hover:bg-blue-700"
                        onClick={() => handleEdit(associate)}
                        >
                            edit
                        </button>
                        <button 
                        className="bg-red-600 px-2 py-1 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleDelete(associate.id)}
                        >
                        delete
                        </button>
                        </div>
                    </td>
                  </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="13" className="text-center px-4 py-4 text-gray-400">
                    No associate associate data found.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>

      </div>

      <RenewalModal
        show={modalOpen}
        onClose={() => {
          setModalOpen(false);
          fetchData(); // refresh after modal closes
        }}
        associateId={selectedId}
        isEdit={!!editData}
        editData={editData}
      />

    </div>
  );
};

export default AssociateList;
