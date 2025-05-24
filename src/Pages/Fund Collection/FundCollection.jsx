import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../Components/AxiosInstance';
import { useLocation, Link} from 'react-router-dom';

const FundCollection = () => {
  const { state } = useLocation();
  const donationData = state?.donationData;
  let isEditMode = Boolean(donationData);


  const [formData, setFormData] = useState({
    donation_type: 'govt_donation',
    receipt_no: '',
    date: new Date().toISOString().split('T')[0],
    fund_provider: '',
    fund_amount: '',
    payment_type: 'cash',
    remarks: '',
    purpose: '',
  });


    useEffect(() =>{
        if(isEditMode){
            setFormData(donationData)
        }
    }, [donationData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let response;
        if (isEditMode ) {
            response = await AxiosInstance.put(`fund-collection/${donationData.id}/`, formData);
            console.log("Form updated successfully:", response.data);
            isEditMode = false;
            alert('Fund entry updated successfully');
        } else {
            response = await AxiosInstance.post('fund-collection/', formData);
            console.log("Form submitted successfully:", response.data);
            alert('Fund entry submitted successfully');
        }
      
      handleClear();
    } catch (err) {
      console.error(err);
      alert('Error submitting fund entry');
    }
  };


  const handleClear = () => {
    setFormData({
        donation_type: 'govt_donation',
        receipt_no: '',
        date: new Date().toISOString().split('T')[0],
        fund_provider: '',
        fund_amount: '',
        payment_type: 'cash',
        remarks: '',
        purpose: '',
        });
    };


  return (

    <div>
        <form
        onSubmit={handleSubmit}
        className="p-4 mt-6 bg-white rounded shadow max-w-4xl mx-auto"
        >
        <div className="mb-4 flex flex-row">
            <div className="flex-1">
                <h2 className="text-lg text-sky-900 font-semibold mb-6">Fund Collection Form</h2>
            </div>
            <div className="">
            <Link to="/dashboard/donation-list">
            <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">Go to List</h2>
            </Link> 
            </div>
        </div>
          

        <div className="grid grid-cols-2 gap-4">
            {/* Donation Type Select */}
            <div className="mb-1">
            <label className="block text-sm font-medium text-gray-700">
                Donation Type <span className="text-red-500">*</span>
            </label>
            <select
                name="donation_type"
                value={formData.donation_type }
                onChange={handleChange}
                className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
                required
            >
                <option value="">Select a donation type</option>
                <option value="govt_donation">Govt Donation</option>
                <option value="others">Others</option>
            </select>
            </div>

            {/* Receipt No - disabled */}
            <div className="mb-1">
            <label className="block text-sm font-medium text-gray-700">Receipt No</label>
            <input
                type="text"
                name="receipt_no"
                value={formData.receipt_no}
                onChange={handleChange}
                className="w-full border border-gray-300 px-2 py-1 rounded bg-gray-100 cursor-not-allowed"
                placeholder="Auto-generated"
                disabled
            />
            </div>

            {/* Remaining Fields with placeholders */}
            {[
            { label: 'Date', name: 'date', type: 'date', placeholder: '' },
            { label: 'Fund Provider', name: 'fund_provider', type: 'text', placeholder: 'Enter fund provider name' },
            { label: 'Fund Amount', name: 'fund_amount', type: 'number', placeholder: 'Enter amount' },
            { label: 'Purpose', name: 'purpose', type: 'text', placeholder: 'Enter purpose of fund' },
            ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="mb-1">
                <label className="block text-sm font-medium text-gray-700">
                {label} <span className="text-red-500">*</span>
                </label>
                <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
                required
                placeholder={placeholder}
                />
            </div>
            ))}

            {/* Payment Type */}
            <div className="mb-1">
            <label className="block text-sm font-medium">Payment Type</label>
            <select
                name="payment_type"
                value={formData.payment_type}
                onChange={handleChange}
                className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
            >
                <option value="">Select payment type</option>
                <option value="cash">Cash</option>
                <option value="check">Check</option>
            </select>
            </div>

            {/* Remarks */}
            <div className="mb-1">
            <label className="block text-sm font-medium">Remarks</label>
            <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full border border-gray-300 px-2 py-1 h-12 rounded bg-sky-50"
                placeholder="Optional remarks..."
            />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-left">
                <button
                type="submit"
                className="bg-blue-600 text-white h-8 w-16 rounded-md"
                >
                submit
                </button>
                <button
                type="button" // Ensure it's type="button" and not type="reset"
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

export default FundCollection;
