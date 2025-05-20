import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import { useNavigate } from 'react-router-dom';




const AssociateList = () => {
  const [renewalData, setRenewalData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [advocateId, setAdvocateId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();



  const handleIdChange = (e) => {
    const selectedId = e.target.value;
    setAdvocateId(selectedId);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("associate-renewal/");
        setRenewalData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);



  const handleDelete = async (id) => {
    setFilteredData(prevData => prevData.filter(item => item.id !== id));
    try {
        await AxiosInstance.delete(`associate-renewal/${id}`);
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

        
        

        <div className="mt-8 mr-6">
        <p className="text-gray-800 mb-4 font-bold text-xl text-center mt-8">
            Associate Renewal List
        </p>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                <th className="px-4 py-2 border">Renewal Date</th>
                <th className="px-4 py-2 border">Receipt No.</th>
                <th className="px-4 py-2 border">Licence No.</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Year</th>
                <th className="px-4 py-2 border">Advocate Name</th>
                <th className="px-4 py-2 border">Advocate ID</th>
                <th className="px-4 py-2 border">Entry Fee</th>
                <th className="px-4 py-2 border">Book Rate</th>
                <th className="px-4 py-2 border">Renewal Fee</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Remarks</th>
                <th className="px-4 py-2 border">Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.length > 0 ? (
                filteredData.map((renewal, index) => (
                    <tr key={index} className="text-center text-sm border-t">
                    <td className="px-4 py-2 border">{renewal.renewal_date}</td>
                    <td className="px-4 py-2 border">{renewal.receipt_no}</td>
                    <td className="px-4 py-2 border">{renewal.license_no}</td>
                    <td className="px-4 py-2 border">{renewal.name}</td>
                    <td className="px-4 py-2 border">{renewal.year}</td>
                    <td className="px-4 py-2 border">{renewal.advocate_name}</td>
                    <td className="px-4 py-2 border">{renewal.advocate_id}</td>
                    <td className="px-4 py-2 border">{renewal.entry_fee}</td>
                    <td className="px-4 py-2 border">{renewal.book_rate}</td>
                    <td className="px-4 py-2 border">{renewal.renewal_fee}</td>
                    <td className="px-4 py-2 border">{renewal.total}</td>
                    <td className="px-4 py-2 border">{renewal.remarks}</td>
                    <td className="px-4 py-2 border flex gap-2">
                        <button 
                        className="bg-blue-600 px-4 py-1 text-white rounded-md hover:bg-blue-700"
                        onClick={() => handleEdit(renewal)}
                        >
                            edit
                        </button>
                        <button 
                        className="bg-red-600 px-2 py-1 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleDelete(renewal.id)}
                        >
                        delete
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="13" className="text-center px-4 py-4 text-gray-400">
                    No associate renewal data found.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>

      </div>
    </div>
  );
};

export default AssociateList;
