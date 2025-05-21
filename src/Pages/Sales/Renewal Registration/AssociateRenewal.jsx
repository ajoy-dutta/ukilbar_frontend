import React from "react"
import AxiosInstance from "../../../Components/AxiosInstance"
import { useState, useEffect } from "react";
import './index.css'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const AssociateRenewal = () =>{
 const  { state } = useLocation();
 const renewalData = state?.renewalData;
 const isEditMode = Boolean(renewalData);


 const [formData, setFormData] = useState({
    receipt_no: "",
    registration_date: new Date().toISOString().slice(0, 10),
    license_no: "",
    name: "",
    // year: "",
    advocate_name: "",
    advocate_id: "",
    // type: "",
    entry_fee: "",
    book_rate: "",
    // renewal_fee: "",
    total: "",
    remarks: "",
  });


   useEffect(() => {
    if (isEditMode) {
      setFormData(renewalData);
    }
  }, [renewalData]);



   const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        updatedData.total =
        parseFloat(updatedData.entry_fee || 0) +
        parseFloat(updatedData.book_rate || 0) +
        parseFloat(updatedData.renewal_fee || 0);
        setFormData(updatedData);
   };


    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.entry_fee = formData.entry_fee || 0;
        formData.book_rate = formData.book_rate || 0;
        formData.renewal_fee = formData.renewal_fee || 0;
        formData.total = formData.total || 0;

        try {
            if (isEditMode) {
               await AxiosInstance.put(`associate-registration/${renewalData.id}/`, formData);
            } else {
               await AxiosInstance.post(`associate-registration/`, formData);
            }
            alert("Submitted successfully!");
            handleClear();
        } catch (error) {
            console.error("Error submitting renewal:", error);
            alert("Network error. Please try again.");
        }
    };

    const handleClear = () => {
        setFormData({
            receipt_no: "",
            registration_date: new Date().toISOString().slice(0, 10),
            license_no: "",
            name: "",
            // year: "",
            advocate_name: "",
            advocate_id: "",
            // type: "",
            entry_fee: "",
            book_rate: "",
            // renewal_fee: "",
            total: "",
            remarks: "",
        });
  };






  return (
    <div className="p-6 mt-4 bg-white shadow rounded-md max-w-6xl mx-auto">
      <div className="mb-4 flex flex-row">
        <h2 className="text-xl font-semibold flex-1">Associate Registration</h2>
        <div className="">
            <Link to="/dashboard/associate-renewal-list">
            <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">Go to List</h2>
            </Link> 
        </div>
     </div>
 
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
            <div>
        <label className="text-sm font-semibold">Receipt No.</label>
        <input
            name="receipt_no"
            onChange={handleChange}
            value={formData.receipt_no}
            className="input"
            placeholder="Enter receipt number"
        />
        </div>

        <div>
        <label className="text-sm font-semibold">
            Regestration Date <span className="text-red-500">*</span>
        </label>
        <input
            type="date"
            name="registration_date"
            value={formData.registration_date}
            onChange={handleChange}
            className="input required"
            placeholder="Select renewal date"
        />
        </div>

        <div>
        <label className="text-sm font-semibold">
            Licence No. <span className="text-red-500">*</span>
        </label>
        <input
            name="license_no"
            onChange={handleChange}
            value={formData.license_no}
            className="input required"
            required
            placeholder="Enter licence number"
        />
        </div>

        <div>
        <label className="text-sm font-semibold">
            Name <span className="text-red-500">*</span>
        </label>
        <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="input required"
            required
            placeholder="Enter name"
        />
        </div>

        {/* <div>
        <label className="text-sm font-semibold">
            Year <span className="text-red-500">*</span>
        </label>
        <select
            name="year"
            onChange={handleChange}
            value={formData.year}
            className="input required"
        >
            <option value="">--- Select Year ---</option>
            {[...Array(50)].map((_, i) => {
            const year = 2000 - i;
            return <option key={year}>{year}</option>;
            })}
        </select>
        </div> */}

        <div>
        <label className="text-sm font-semibold">
            Advocate Name <span className="text-red-500">*</span>
        </label>
        <input
            name="advocate_name"
            onChange={handleChange}
            value={formData.advocate_name}
            className="input required"
            placeholder="Enter advocate name"
        />
        </div>

        <div>
        <label className="text-sm font-semibold">
            Advocate ID <span className="text-red-500">*</span>
        </label>
        <input
            name="advocate_id"
            onChange={handleChange}
            value={formData.advocate_id}
            className="input required"
            placeholder="Enter advocate ID"
        />
        </div>

        {/* <div>
        <label className="text-sm font-semibold">
            Type <span className="text-red-500">*</span>
        </label>
        <select
            name="type"
            onChange={handleChange}
            value={formData.type}
            className="input required"
            required
        >
            <option value="">--- Select Type ---</option>
            <option value="New">New</option>
            <option value="Old">Old</option>
        </select>
        </div> */}

        <div>
        <label className="text-sm font-semibold">Entry Fee</label>
        <input
            type="number"
            name="entry_fee"
            onChange={handleChange}
            value={formData.entry_fee}
            className="input"
            placeholder="Enter entry fee"
        />
        </div>

        <div>
        <label className="text-sm font-semibold">Book Rate</label>
        <input
            type="number"
            name="book_rate"
            onChange={handleChange}
            value={formData.book_rate}
            className="input"
            placeholder="Enter book rate"
        />
        </div>

        {/* <div>
        <label className="text-sm font-semibold">Renewal Fee</label>
        <input
            type="number"
            name="renewal_fee"
            onChange={handleChange}
            value={formData.renewal_fee}
            className="input"
            placeholder="Enter renewal fee"
        />
        </div> */}

        <div>
        <label className="text-sm font-semibold">Total</label>
        <input
            type="number"
            readOnly
            value={formData.total}
            className="input bg-gray-100"
            placeholder="Calculated total"
        />
        </div>

        <div>
        <label className="text-sm font-semibold">Remarks</label>
        <textarea
            name="remarks"
            onChange={handleChange}
            value={formData.remarks}
            className="input h-20"
            placeholder="Write any remarks..."
        />
        </div>

            
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end pt-2 gap-2">
        <button
            type="submit"
            className="bg-green-700 hover:bg-green-900 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
        >
           {isEditMode ? "Update" : "Submit"}
        </button>
        <button
            type="button"
            onClick={() => handleClear()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Cancel
        </button>
        </div>
    
    </form>

    </div>
 )
}

export default AssociateRenewal;