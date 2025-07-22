import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Components/AxiosInstance';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

const ChangeList = () => {
  const advocates = useSelector((state) => state.advocate.advocates);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [advocateId, setAdvocateId] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await AxiosInstance.get('advocate-change/');
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };


  const handleDelete = async (id) => {
        setFilteredData(prevData => prevData.filter(item => item.id !== id));
        try {
            await AxiosInstance.delete(`advocate-change/${id}/`);
            fetchData();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };


    const handleEdit = (advocateChange) => {
      navigate("/dashboard/advocate-change/", { state: { advocateChange: advocateChange } });
    };





  useEffect(() => {
      let filtered = [...data];
  
      if (fromDate) {
        filtered = filtered.filter((item) => item.date >= fromDate);
      }
  
      if (toDate) {
        filtered = filtered.filter((item) => item.date <= toDate);
      }
  
      if (advocateId) {
        filtered = filtered.filter((item) => item.advocate_id === advocateId);
      }
  
      setFilteredData(filtered);
    }, [fromDate, toDate, advocateId, data]);



  return (
    <div className="p-8">

      <button onClick={(e)=> handleEdit()} className="flex items-center gap-2 mb-4 bg-gray-200 rounded-lg px-4 py-2 hover:bg-gray-300">
        <IoArrowBackSharp className="text-xl" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <h2 className="text-lg font-semibold text-sky-900 mb-6">Advocate Change Records</h2>

      {/* Filters */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
        <label className="text-sm font-medium">From Date</label>
        <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-2  bg-sky-50 py-1 rounded-md w-full"
        />
        </div>

        <div>
        <label className="text-sm font-medium">To Date</label>
        <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="borde bg-sky-50 px-2 py-1 rounded-md w-full"
        />
        </div>

        <div>
        <label className="text-sm font-medium">Advocate ID</label>
        <input
            type="text"
            value={advocateId}
            onChange={(e) => setAdvocateId(e.target.value)}
            className="border bg-sky-50 rounded w-full px-3 py-1 text-gray-700 "
            placeholder="Type Advocate ID"
        />
       </div>
    </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100 text-sm text-gray-700 font-semibold">
            <tr>
              <th className="border px-2 py-2">Date</th>
              <th className="border px-2 py-2">Receipt No</th>
              <th className="border px-2 py-2">Client Name</th>
              <th className="border px-2 py-2">Advocate ID</th>
              <th className="border px-2 py-2">Advocate Name</th>
              <th className="border px-2 py-2">Fee</th>
              <th className="border px-2 py-2">Case No</th>
              <th className="border px-2 py-2">Remarks</th>
              <th className="border px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="text-sm text-gray-700">
                  <td className="border px-2 py-1">{item.date}</td>
                  <td className="border px-2 py-1">{item.receipt_no}</td>
                  <td className="border px-2 py-1">{item.client_name}</td>
                  <td className="border px-2 py-1">{item.advocate_id}</td>
                  <td className="border px-2 py-1">{item.advocate_name}</td>
                  <td className="border px-2 py-1">{item.fee}</td>
                  <td className="border px-2 py-1">{item.case_no}</td>
                  <td className="border px-2 py-1">{item.remarks}</td>
                  <td className="px-1 py-2 border">
                       <div className="flex gap-2">
                        <button 
                        className="bg-blue-600 px-2 py-1 text-white rounded-md hover:bg-blue-700"
                        onClick={() => handleEdit(item)}
                        >
                            edit
                        </button>
                        <button 
                        className="bg-red-600 px-2 py-1 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleDelete(item.id)}
                        >
                        delete
                        </button>
                        </div>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-3">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChangeList;
