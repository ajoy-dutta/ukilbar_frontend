import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";



const Vokalotnama = () => {
  
  const [formData, setFormData] = useState({
    sale_type: "Vokalotnama",
    receipt_no: "",
    sales_date: "",
    advocate_name: "",
    building_name: "",
    advocateId: "",
    customer_phone: "",
    customer_name: "",
    customer_address: "",
    serials : Array(4).fill().map(() => ({
      from_serial: "",
      to_serial: "",
      total: ""
    })),
    total_count: 0,
    price: 0,
    total_amount: 0,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [suggestions3, setSuggestions3] = useState([]);
  const [phone, setPhone] = useState("");
  const advocates = useSelector((state) => state.advocate.advocates);
  const [isBanglaInput, setIsBanglaInput] = useState(false);


  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData({ ...formData, sale_type: selectedType });
  };



  useEffect(() => {
    const price = parseFloat(formData.price) || 0;
    const total_amount = (price * formData.total_count).toFixed(2);
    setFormData(prev => ({ ...prev, total_amount }));
  }, [formData.price, formData.total_count]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));


    // For advocate_id, filter matching suggestions
    if (name === "advocateId") {
      if (value.trim() === "") {
        setSuggestions([]);
      }else {
      const matches = advocates.filter((adv) =>
        adv.bar_registration_number.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
     }
    }

    else if (name === "phone") {
      if (value.trim() === "") {
        setSuggestions([]);
       }else{
      setPhone(value)
      const matches = advocates.filter((adv) =>
        adv.phone.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions2(matches);
     }
    }

    else if (name === "advocate_name") {
      if (value.trim() === "") {
        setSuggestions([]);
       }
      else{
      const banglaCheck = /[\u0980-\u09FF]/.test(value);
      setIsBanglaInput(banglaCheck);

      const matches = advocates.filter((adv) => {
        if (isBanglaInput) {
          return adv.name_bengali && adv.name_bengali.includes(value);
        } else {
          return adv.name_english && adv.name_english.toLowerCase().includes(value.toLowerCase());
        }
      });
      setSuggestions3(matches);
     }
    }



    // Auto-fill advocate Info when exact id match is selected
    const matchedAdvocate = advocates.find(
      (adv) => adv.bar_registration_number === value
    );
    if (matchedAdvocate) {
      setFormData((prev) => ({
        ...prev,
        advocateId: matchedAdvocate.bar_registration_number,
        advocate_name: matchedAdvocate.name_english,
      }));
      setPhone(matchedAdvocate.phone)
      setSuggestions([]); // hide suggestions
    }


    // Auto-fill advocateInfo when exact phone match is selected
    const matchedAdvocate1 = advocates.find(
      (adv) => adv.phone === value
    );
    if (matchedAdvocate1) {
      setFormData((prev) => ({
        ...prev,
        advocateId: matchedAdvocate1.bar_registration_number,
        advocate_name: matchedAdvocate1.name_english,
      }));
      setPhone(matchedAdvocate1.phone)
      setSuggestions2([]); // hide suggestions
    }


    // Auto-fill advocate name when exact id match is selected
    const matchedAdvocate2 = advocates.find(
      (adv) => adv.bar_registration_number === value
    );
    if (matchedAdvocate2) {
      setFormData((prev) => ({
        ...prev,
        advocateId: matchedAdvocate2.bar_registration_number,
        advocate_name: matchedAdvocate2.name_english,
      }));
      setPhone(matchedAdvocate2.phone)
      setSuggestions([]); // hide suggestions
    }
    
  };


  const handleSuggestionClick = (bar_registration_number, name, phone) => {
    setFormData((prev) => ({
      ...prev,
      advocateId: bar_registration_number,
      advocate_name: name,
    }));
    setPhone(phone)
    setSuggestions([]);
    setSuggestions2([]);
    setSuggestions3([]);
  };



  const handleSerialChange = (index, field, value) => {
    const updatedSerials = [...formData.serials];
    updatedSerials[index][field] = parseInt(value);

    // Calculate total if both from and to have values
    if (field === 'from_serial' || field === 'to_serial') {
      const fromValue = parseInt(updatedSerials[index].from_serial) || 0;
      const toValue = parseInt(updatedSerials[index].to_serial) || 0;
      
      if (fromValue && toValue) {
        const total = Math.abs(toValue - fromValue) + 1;
        updatedSerials[index].total = total
        formData.total_count += total
        
      } else {
        updatedSerials[index].total = '';
      }
    }


    const newtotal_count = updatedSerials.reduce((sum, row) => {
      return sum + (parseInt(row.total) || 0);
    }, 0);



    setFormData({
      ...formData,
      serials: updatedSerials,
      total_count:newtotal_count,
    });
  };


  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();

    const filteredSerials = formData.serials.filter(
    (serial) =>
      serial.from_serial &&
      serial.to_serial  &&
      serial.total  
    );

    const payload = {
      ...formData,
      serials: filteredSerials,
    };


    try {
      const response = await AxiosInstance.post("vokalotnama/", payload);
      console.log("Success:", response.data);
      alert("Submitted successfully!");
      handleClear();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Submission failed.");
    }
  };

  const handleClear = () => {
    setFormData({
      receipt_no: "",
      sales_date: "",
      advocate_name: "",
      building_name: "",
      advocateId: "",
      customer_phone: "",
      customer_name: "",
      customer_address: "",
      serials : Array(4).fill().map(() => ({
        from_serial: "",
        to_serial: "",
        total: ""
      })),
      total_count: 0,
      price: 0,
      total_amount: 0,
    });
  };

 

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6  max-w-6xl mx-auto bg-white shadow-md rounded-md"
    >
      <div className="mb-4 flex flex-row">
        <div className="flex-1">
          <label
            htmlFor="sale_type"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Sale Type
          </label>
          <select
            id="sale_type"
            value={formData.sale_type}
            onChange={handleTypeChange}
            className="w-1/4 px-2 py-1 border border-gray-300 rounded"
          >
            <option value="Vokalotnama">Vokalotnama</option>
            <option value="Cartis Paper">Cartis Paper</option>
            <option value="Sticker">Sticker</option>
          </select>
        </div>

        <div className="">
          <Link to="/dashboard/sale-list">
          <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">Go to List</h2>
          </Link> 
        </div>

      
      </div>

      <h2 className="text-xl font-bold text-blue-950 mb-2 text-center">
        {formData.sale_type} Sales
      </h2>

      {/* Basic Info */}
      <div className="border rounded-md p-4 mb-2">
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-4 gap-4">
         <div className="relative">
        <label className="block text-sm font-medium">Receipt No.</label>
        <input
          name="receipt_no"
          type="text"
          value={formData.receipt_no}
          onChange={handleChange}
          placeholder="Receipt No."
          className="border px-2 pr-10 rounded-md w-full bg-gray-100"
        />
      </div>

          <div>
            <label className="block text-sm font-medium">Sales Date</label>
            <input
              name="sales_date"
              type="date"
              value={formData.sales_date}
              onChange={handleChange}
              className="border px-2 rounded-md w-full bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Advocate ID</label>
             <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </span>
                
                <input
                  name="advocateId"
                  type="text"
                  value={formData.advocateId}
                  onChange={handleChange}
                  placeholder="Advocate ID"
                  className="border pl-8 pr-2 rounded-md w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-1/6 border mt-1 max-h-40 overflow-y-auto shadow-md rounded">
                {suggestions.map((adv) => (
                    <li
                    key={adv.id}
                    onClick={() => handleSuggestionClick(adv.bar_registration_number, adv.name_english, adv.phone)}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                    {adv.bar_registration_number} 
                    </li>
                ))}
                </ul>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="border pl-8 pr-2 rounded-md w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>
            {suggestions2.length > 0 && (
                <ul className="absolute z-10 w-1/6 border mt-1 max-h-40 overflow-y-auto shadow-md rounded">
                {suggestions2.map((adv) => (
                    <li
                    key={adv.id}
                    onClick={() => handleSuggestionClick(adv.bar_registration_number, adv.name_english, adv.phone)}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                    {adv.phone} 
                    </li>
                ))}
                </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Advocate Name</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  name="advocate_name"
                  type="text"
                  value={formData.advocate_name}
                  onChange={handleChange}
                  placeholder="Advocate Name"
                  className="border pl-8 pr-2 rounded-md w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>
           {suggestions3.length > 0 && (
              <ul className="absolute z-10 w-1/6 border bg-gray-200 mt-1 max-h-40 overflow-y-auto shadow-md rounded">
                {suggestions3.map((adv) => (
                  <li
                    key={adv.id}
                    onClick={() =>
                      handleSuggestionClick(
                        adv.bar_registration_number,
                        isBanglaInput ? adv.name_bengali : adv.name_english,
                        adv.phone
                      )
                    }
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    {isBanglaInput ? adv.name_bengali : adv.name_english}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Building Name</label>
            <input
              name="building_name"
              type="text"
              value={formData.building_name}
              onChange={handleChange}
              placeholder="Building Name"
              className="border px-2 rounded-md w-full bg-gray-100"
            />
          </div>

        </div>
      </div>

      {/* Customer Info */}
      <div className="border rounded-md p-4 mb-2">
        <h3 className="text-lg font-medium mb-4">Customer Information</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Phone No.</label>
            <input
              name="customer_phone"
              type="text"
              value={formData.customer_phone}
              onChange={handleChange}
              placeholder="Phone No."
              className="border px-2  rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="customer_name"
              type="text"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="Name"
              className="border px-2  rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              name="customer_address"
              type="text"
              value={formData.customer_address}
              onChange={handleChange}
              placeholder="Address"
              className="border px-2  rounded-md w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Serial and Summary */}
    <div className="grid grid-cols-2 gap-6 mb-4">
  {/* Vokalotnama Serial Section */}
  <div className="border rounded-md p-4">
    <h3 className="text-lg font-medium mb-2">Vokalotnama Serial No.</h3>
    <div className="grid grid-cols-3 gap-3">
      {formData.serials.map((item, index) => (
        <React.Fragment key={index}>
          <input
            type="number"
            placeholder={index === 0 ? "From *" : "From"}
            value={item.from_serial}
            required={index === 0}
            onChange={(e) =>
              handleSerialChange(index, "from_serial", e.target.value)
            }
            className="border px-2  rounded-md w-full bg-gray-100"
          />
          <input
            type="number"
            placeholder={index === 0 ? "To *" : "To"}
            value={item.to_serial}
            required={index === 0}
            onChange={(e) =>
              handleSerialChange(index, "to_serial", e.target.value)
            }
            className="border px-2  rounded-md w-full bg-gray-100"
          />
          <input
            type="number"
            placeholder="Total"
            value={item.total}
            className="border px-2  rounded-md w-full bg-gray-100"
            disabled
          />
        </React.Fragment>
        ))}
      </div>
    </div>

    {/* Summary Section */}
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-medium mb-2">Summary</h3>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium">Total Count</label>
          <input
            name="total_count"
            type="text"
            value={formData.total_count}
            onChange={handleChange}
            placeholder="Total Count"
            className="border px-2  rounded-md w-full bg-gray-100"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            price <span className="text-red-500">*</span>
          </label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="price"
            className="border px-2  rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Total Amount <span className="text-red-500">*</span>
          </label>
          <input
            name="total_amount"
            type="text"
            value={formData.total_amount}
            onChange={handleChange}
            placeholder="Total Amount"
            className="border px-2  rounded-md w-full bg-gray-100"
            required
            disabled
          />
        </div>
      </div>
    </div>
  </div>


      {/* Buttons */}
      <div className="flex gap-2 justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white h-8 w-16 rounded-md"
        >
          Save
        </button>
        <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-black h-8 w-16 rounded-md"
          >
            Clear
        </button>
      </div>
    </form>
  );
};

export default Vokalotnama;

