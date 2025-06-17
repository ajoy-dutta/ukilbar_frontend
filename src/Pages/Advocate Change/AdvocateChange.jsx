import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link ,useLocation} from 'react-router-dom';
import AxiosInstance from '../../Components/AxiosInstance';

const AdvocateChange = () => {
 
  const { state } = useLocation();
  const advocateChange = state?.advocateChange;
  const isEditMode = Boolean(advocateChange);

  const [formData, setFormData] = useState({
    receipt_no: "",
    date: "",
    client_name: "",
    advocate_id: "",
    advocate_name: "",
    fee: "",
    case_no: "",
    remarks: ""
  });

  const advocates = useSelector((state) => state.advocate.advocates);

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // For advocate_id, filter matching suggestions
    if (name === "advocate_id") {
      if (value.trim() === "") {
        setSuggestions([]);
      } else {
        const matches = advocates.filter((adv) =>
          adv.bar_registration_number.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(matches);
      }
    }

    // Auto-fill advocate name when exact match is selected
    const matchedAdv = advocates.find(
      (adv) => adv.bar_registration_number === value
    );
    if (matchedAdv) {
      setFormData((prev) => ({
        ...prev,
        advocate_id: matchedAdv.bar_registration_number,
        advocate_name: matchedAdv.name_english,
      }));
      setSuggestions([]); // hide suggestions
    }
  };

  const handleSuggestionClick = (bar_registration_number, name) => {
    setFormData((prev) => ({
      ...prev,
      advocate_id: bar_registration_number,
      advocate_name: name,
    }));
    setSuggestions([]);
  };


  useEffect(() =>{
        if(isEditMode){
            setFormData(advocateChange)
        }
    }, [advocateChange]);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let response;
        if (isEditMode ) {
            response = await AxiosInstance.put(`advocate-change/${advocateChange.id}/`, formData);
            console.log("Form updated successfully:", response.data);
            alert("Form updated successfully!");
        } else {
            response = await AxiosInstance.post("advocate-change/", formData);
            console.log("Form submitted successfully:", response.data);
            alert("Form submitted successfully!");
        }
        
        handleClear(); 
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit the form.");
    }
 };

 const handleClear = () => {
  setFormData({
    receipt_no: "",
    date: "",
    client_name: "",
    advocate_id: "",
    advocate_name: "",
    fee: "",
    case_no: "",
    remarks: ""
    });
  };



  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-10 pb-8 mb-4">
        <div className="border-t-2 border-gray-200 pt-6 mb-2">

        <div className="mb-4 flex flex-row">
            <div className="flex-1">
                <h2 className="text-lg text-sky-900 font-semibold mb-6 text-center">Advocate Change Fee</h2>
            </div>
            <div className="">
            <Link to="/dashboard/advocate-change-list">
            <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">Go to List</h2>
            </Link> 
            </div>
        </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {/* Receipt No */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Receipt No.</label>
              <select
                name="receipt_no"
                value={formData.receipt_no}
                onChange={handleChange}
                className="shadow appearance-none border bg-sky-50 disabled rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {/* Add options here */}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="shadow appearance-none  bg-sky-50 border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Client Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                className="shadow appearance-none border bg-sky-50 bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Advocate ID (typeable & selectable) */}
            <div className="relative">
            <label className="block text-gray-700 text-sm font-semibold">
                Advocate ID <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="advocate_id"
                value={formData.advocate_id}
                onChange={handleChange}
                className="shadow appearance-none border  bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Type or select advocate ID"
                autoComplete="off"
                required
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-y-auto shadow-md rounded">
                {suggestions.map((adv) => (
                    <li
                    key={adv.id}
                    onClick={() => handleSuggestionClick(adv.bar_registration_number, adv.name_english)}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                    {adv.bar_registration_number} 
                    </li>
                ))}
                </ul>
            )}
            </div>


            {/* Advocate Name (auto-filled but editable) */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Advocate Name <span className="text-red-500">*</span> </label>
              <input
                type="text"
                name="advocate_name"
                value={formData.advocate_name}
                onChange={handleChange}
                className="shadow appearance-none border bg-sky-50 bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Fee */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Fee <span className="text-red-500">*</span> </label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className="shadow appearance-none border bg-sky-50 bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Case No */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Case No. <span className="text-red-500">*</span> </label>
              <input
                type='text'
                name="case_no"
                value={formData.case_no}
                onChange={handleChange}
                className="shadow appearance-none border bg-sky-50 rounded bg-gray-100 w-full px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                required
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="shadow appearance-none border bg-sky-50 h-12 rounded bg-gray-100 w-full px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              />
            </div>
          </div>
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
      </form>
    </div>
  );
};

export default AdvocateChange;
