import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Components/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

const FundList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [donationType, setDonationType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await AxiosInstance.get('fund-collection/');
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleDelete = async (id) => {
    setFilteredData(prevData => prevData.filter(item => item.id !== id));
    try {
      await AxiosInstance.delete(`fund-collection/${id}/`);
      fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (item) => {
    navigate("/dashboard/donation/", { state: { donationData: item } });
  };



  useEffect(() => {
    let filtered = [...data];

    if (fromDate) {
      filtered = filtered.filter(item => item.date >= fromDate);
    }

    if (toDate) {
      filtered = filtered.filter(item => item.date <= toDate);
    }

    if (donationType) {
      filtered = filtered.filter(item => item.donation_type === donationType);
    }

    setFilteredData(filtered);
  }, [fromDate, toDate, donationType, data]);

  return (
    <div className="p-8">
      <button onClick={handleEdit} className="flex items-center gap-2 mb-4 bg-gray-200 rounded-lg px-4 py-2 hover:bg-gray-300">
        <IoArrowBackSharp className="text-xl" />
        <span className="text-sm font-medium">Back</span>
      </button>
      <h2 className="text-lg font-semibold text-sky-900 mb-6">Fund Collection Records</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <label className="text-sm font-medium">From Date</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border bg-sky-50 px-2 py-1 rounded-md w-full" />
        </div>
        <div>
          <label className="text-sm font-medium">To Date</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border bg-sky-50 px-2 py-1 rounded-md w-full" />
        </div>
        <div>
          <label className="text-sm font-medium">Donation Type</label>
          <select value={donationType} onChange={(e) => setDonationType(e.target.value)} className="border bg-sky-50 px-2 py-1 rounded-md w-full">
            <option value="">All</option>
            <option value="govt_donation">Govt Donation</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100 text-sm text-gray-700 font-semibold">
            <tr>
              <th className="border px-2 py-2">Date</th>
              <th className="border px-2 py-2">Receipt No</th>
              <th className="border px-2 py-2">Fund Provider</th>
              <th className="border px-2 py-2">Amount</th>
              <th className="border px-2 py-2">Purpose</th>
              <th className="border px-2 py-2">Donation Type</th>
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
                  <td className="border px-2 py-1">{item.fund_provider}</td>
                  <td className="border px-2 py-1">{item.fund_amount}</td>
                  <td className="border px-2 py-1">{item.purpose}</td>
                  <td className="border px-2 py-1">{item.donation_type}</td>
                  <td className="border px-2 py-1">{item.remarks}</td>
                  <td className="px-1 py-2 border">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(item)} className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-3">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundList;
