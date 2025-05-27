import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Components/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

const BankInterestList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { value } = e.target;
    setAccountNo(value)

    const matches = data.filter((item) =>
        item.account_no.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches);
     

    // Auto-fill advocate name when exact match is selected
    const matchedData = data.find(
    (item) => item.account_no === value
    );

    if (matchedData) {
        let filtered = [...data];
        filtered = filtered.filter(item => item.account_no === value);
        setFilteredData(filtered);
        setSuggestions([]); // hide suggestions
    }
    }


    const handleSuggestionClick = (account_no) => {
        let filtered = [...data];
        if (account_no) filtered = filtered.filter(item => item.account_no === account_no);
        setAccountNo(account_no);
        setFilteredData(filtered);
        setSuggestions([]);
    };



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await AxiosInstance.get('bank-interest/');
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleDelete = async (id) => {
    setFilteredData(prev => prev.filter(item => item.id !== id));
    try {
      await AxiosInstance.delete(`bank-interest/${id}/`);
      fetchData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (item) => {
    navigate("/dashboard/bank-interest-collect/", { state: { interestData: item } });
  };

  useEffect(() => {
    let filtered = [...data];
    if (fromDate) filtered = filtered.filter(item => item.collection_date >= fromDate);
    if (toDate) filtered = filtered.filter(item => item.collection_date <= toDate);
    setFilteredData(filtered);
  }, [fromDate, toDate ,data]);

  return (
    <div className="p-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 bg-gray-200 rounded-lg px-4 py-2 hover:bg-gray-300">
        <IoArrowBackSharp className="text-xl" />
        <span className="text-sm font-medium">Back</span>
      </button>
      <h2 className="text-lg font-semibold text-sky-900 mb-6">Bank Interest Records</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <label className="text-sm font-medium">From Date</label>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border bg-sky-50 px-2 py-1 rounded-md w-full" />
        </div>
        <div>
          <label className="text-sm font-medium">To Date</label>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border bg-sky-50 px-2 py-1 rounded-md w-full" />
        </div>

        {/* Account No (typeable & selectable) */}
        <div className="relative">
        <label className="block text-gray-700 text-sm font-semibold">
            Account No<span className="text-red-500">*</span>
        </label>
        <input
            type="text"
            name="account_no"
            value={accountNo}
            onChange={handleChange}
            className="shadow appearance-none border  bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Type or select advocate ID"
            autoComplete="off"
            required
        />
        {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-y-auto shadow-md rounded">
            {suggestions.map((item) => (
                <li
                key={item.id}
                onClick={() => handleSuggestionClick(item.account_no)}
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                >
                {item.account_no} 
                </li>
            ))}
            </ul>
        )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100 text-sm text-gray-700 font-semibold">
            <tr>
              <th className="border px-2 py-2">SL</th>
              <th className="border px-2 py-2">Receipt No.</th>
              <th className="border px-2 py-2">Collection Date</th>
              <th className="border px-2 py-2">Bank Name</th>
              <th className="border px-2 py-2">Account No</th>
              <th className="border px-2 py-2">Interest Amount</th>
              <th className="border px-2 py-2">Remarks</th>
              <th className="border px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item,index) => (
                <tr key={item.id} className="text-sm text-gray-700 text-center">
                  <td className="border px-2 py-1">{index +1}</td>
                  <td className="border px-2 py-1">{item.receipt_no}</td>
                  <td className="border px-2 py-1">{item.collection_date}</td>
                  <td className="border px-2 py-1">{item.bank_name},{item.branch_name}</td>
                  <td className="border px-2 py-1">{item.account_no}</td>
                  <td className="border px-2 py-1 text-right">{item.interest_amount}</td>
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
                <td colSpan="6" className="text-center text-gray-500 py-3">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankInterestList;
