import React, { useState , useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";
import AxiosInstance from '../../Components/AxiosInstance';

const ElectricityBill = () => {

  const  { state } = useLocation();
  const billData = state?.billData;
  let isEditMode = Boolean(billData);
  const [buildingOptions, setBuildingsOptions] = useState([]);

  const [formData, setFormData] = useState({
    receipt_no: '',
    collection_date: new Date().toISOString().split('T')[0],
    month: '',
    year: '',
    building_name: '',
    bill_payer_name: '',
    bill_amount: '',
    payment_type: 'cash',
    remarks: '',
  });

  useEffect(() =>{
        if(isEditMode){
            setFormData(billData)
        }
    }, [billData]);


  useEffect(() => {
    const getBuildings = async (e) => {
        const response = await AxiosInstance.get("buildings/")
        setBuildingsOptions(response.data);
        }

    getBuildings();      
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let response;
        if (isEditMode ) {
            response = await AxiosInstance.put(`electricity-bill/${billData.id}/`, formData);
            isEditMode = false;
            console.log("Form updated successfully:", response.data);
            alert('Bill entry updated successfully');
        } else {
            response = await AxiosInstance.post('electricity-bill/', formData);
            console.log("Bill submitted successfully:", response.data);
            alert('Bill entry submitted successfully');
        }

        handleClear();
    }catch (err) {
           console.error('Error submitting electricity bill collection:', err);
           alert('Failed to submit electricity bill collection: ' + (err.response?.data?.message || err.message));
        }
      
  };

  const handleClear = () => {
    setFormData({
      receipt_no: '',
      collection_date: new Date().toISOString().split('T')[0],
      month: '',
      year: '',
      building_name: '',
      bill_payer_name: '',
      bill_amount: '',
      payment_type: 'cash',
      remarks: '',
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 mt-6 bg-white rounded shadow max-w-6xl mx-auto"
      >
        <div className="mb-4 flex flex-row">
          <div className="flex-1">
            <h2 className="text-lg text-sky-900 font-semibold mb-6">
              Bill Collection Form
            </h2>
          </div>
          <div>
            <Link to="/dashboard/electricity-bill-list">
              <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">
                Go to List
              </h2>
            </Link>
          </div>
        </div>

       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {/* Receipt No */}
        <div className="">
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
        <div className="">
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

        {/* Month */}
        <div className="">
            <label className="block text-sm font-medium text-gray-700">
            Month<span className="text-red-500"> *</span>
            </label>
            <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
            required
            >
            <option value="">Select Month</option>
            {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ].map(month => (
                <option key={month} value={month}>{month}</option>
            ))}
            </select>
        </div>

        {/* Year */}
        <div className="">
            <label className="block text-sm font-medium text-gray-700">
            Year<span className="text-red-500"> *</span>
            </label>
            <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
            required
            >
            <option value="">Select Year</option>
            {Array.from({ length: 41 }, (_, i) => 2010 + i).map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
            </select>
        </div>

        {/* Building Name */}
        <div className="">
            <label className="block text-sm font-medium text-gray-700">
            Building Name<span className="text-red-500"> *</span>
            </label>
            <select
            name="building_name"
            value={formData.building_name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
            required
            >
            <option value="">Select Building</option>
            {buildingOptions.map(building => (
                <option key={building.id} value={building.building_name}>{building.building_name}</option>
            ))}
            </select>
        </div>

        {/* Bill Payer Name */}
        <div className="">
            <label className="block text-sm font-medium text-gray-700">
            Bill Payer Name<span className="text-red-500"> *</span>
            </label>
            <input
            type="text"
            name="bill_payer_name"
            value={formData.bill_payer_name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
            required
            placeholder="Enter payer name"
            />
        </div>

        {/* Bill Amount */}
        <div className="">
            <label className="block text-sm font-medium text-gray-700">
            Bill Amount<span className="text-red-500"> *</span>
            </label>
            <input
            type="number"
            name="bill_amount"
            value={formData.bill_amount}
            onChange={handleChange}
            className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
            required
            placeholder="Enter amount"
            />
        </div>

        {/* Payment Type */}
        <div className="">
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
        <div className="">
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

export default ElectricityBill;
