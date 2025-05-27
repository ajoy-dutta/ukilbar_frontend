import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import AxiosInstance from '../../Components/AxiosInstance';

const BankInterest = () => {
  const { state } = useLocation();
  const interestData = state?.interestData;
  let isEditMode = Boolean(interestData);

  const [formData, setFormData] = useState({
    receipt_no: '',
    collection_date: new Date().toISOString().split('T')[0],
    bank_name: '',
    branch_name: '',
    account_no: '',
    interest_amount: '',
    remarks: '',
  });


  useEffect(() => {
    if (isEditMode) {
      setFormData(interestData);
    }
  }, [interestData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await AxiosInstance.put(`bank-interest/${interestData.id}/`, formData);
        isEditMode = false;
        alert('Bank interest entry updated successfully');
      } else {
        response = await AxiosInstance.post('bank-interest/', formData);
        alert('Bank interest entry submitted successfully');
      }

      handleClear();
    } catch (err) {
      console.error('Error submitting bank interest:', err);
      alert('Failed to submit bank interest: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleClear = () => {
    isEditMode=false;
    setFormData({
      receipt_no: '',
      collection_date: new Date().toISOString().split('T')[0],
      bank_name: '',
      branch_name: '',
      account_no: '',
      interest_amount: '',
      remarks: '',
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 mt-6 bg-white rounded shadow max-w-6xl mx-auto"
      >
        <div className="mb-4 flex flex-row justify-between">
          <h2 className="text-lg text-sky-900 font-semibold mb-6">
            Bank Interest Form
          </h2>
          <Link to="/dashboard/bank-interest-list">
            <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">
              Go to List
            </h2>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

          {/* Receipt No */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Receipt No</label>
            <input
              type="text"
              name="receipt_no"
              value={formData.receipt_no}
              disabled
              className="w-full border border-gray-300 px-2 py-1 rounded bg-gray-100 cursor-not-allowed"
              placeholder="Auto-generated"
            />
          </div>

          {/* Collection Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Collection Date<span className="text-red-500"> *</span>
            </label>
            <input
              type="date"
              name="collection_date"
              value={formData.collection_date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
              required
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Name<span className="text-red-500"> *</span></label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
              required
              placeholder="Enter bank name"
            />
          </div>

          {/* Branch Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Name<span className="text-red-500"> *</span></label>
            <input
              type="text"
              name="branch_name"
              value={formData.branch_name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
              required
              placeholder="Enter branch code"
            />
          </div>

          {/* Account No */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Account No<span className="text-red-500"> *</span></label>
            <input
              type="text"
              name="account_no"
              value={formData.account_no}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
              required
              placeholder="Enter account number"
            />
          </div>

          {/* Interest Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Interest Amount<span className="text-red-500"> *</span></label>
            <input
              type="number"
              step="0.01"
              name="interest_amount"
              value={formData.interest_amount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
              required
              placeholder="Enter amount"
            />
          </div>

          {/* Remarks */}
          <div className="">
            <label className="block text-sm font-medium">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
              placeholder="Optional remarks..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-left col-span-full">
            <button
              type="submit"
              className="bg-blue-600 text-white h-8 w-16 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-300 text-black h-8 w-16 rounded-md"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankInterest;
