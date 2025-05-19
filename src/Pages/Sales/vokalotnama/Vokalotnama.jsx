import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import { Link } from "react-router-dom";

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
    serials: Array(4).fill({ from_serial: "", to_serial: "", total: "" }),
    total_count: 0,
    price: 0,
    total_amount: 0,
  });


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
      serials: Array(4).fill({ from_serial: "", to_serial: "", total: "" }),
      total_count: 0,
      price: 0,
      total_amount: 0,
    });
  };

  const handleBack = () => {
    // history.back() or router.push('/vokalotnama-list')
    window.history.back();
  };

  const handleSearchClick = () => {
      setIsModalOpen(true); // open the modal
    };


    const handlePrint = () => {
      window.print();
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
            className="w-1/4 p-2 border border-gray-300 rounded"
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

      <h2 className="text-2xl font-bold text-blue-950 mb-4 text-center">
        {formData.sale_type} Sales
      </h2>

      {/* Basic Info */}
      <div className="border rounded-md p-4 mb-6">
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-4 gap-4">
         <div className="relative">
        <label className="block text-sm font-medium mb-1">Receipt No.</label>
        <input
          name="receipt_no"
          type="text"
          value={formData.receipt_no}
          onChange={handleChange}
          placeholder="Receipt No."
          className="border px-2 py-1 pr-10 rounded-md w-full bg-gray-100"
        />
      </div>

          <div>
            <label className="block text-sm font-medium">Sales Date</label>
            <input
              name="sales_date"
              type="date"
              value={formData.sales_date}
              onChange={handleChange}
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Advocate Name</label>
            <input
              name="advocate_name"
              type="text"
              value={formData.advocate_name}
              onChange={handleChange}
              placeholder="Advocate Name"
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Building Name</label>
            <input
              name="building_name"
              type="text"
              value={formData.building_name}
              onChange={handleChange}
              placeholder="Building Name"
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Advocate ID</label>
            <input
              name="advocateId"
              type="text"
              value={formData.advocateId}
              onChange={handleChange}
              placeholder="Advocate ID"
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="border rounded-md p-4 mb-6">
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
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
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
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
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
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Serial and Summary */}
    <div className="grid grid-cols-2 gap-6 mb-6">
  {/* Vokalotnama Serial Section */}
  <div className="border rounded-md p-4">
    <h3 className="text-lg font-medium mb-4">Vokalotnama Serial No.</h3>
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
            className="border px-2 py-1 rounded-md w-full bg-gray-100"
          />
          <input
            type="number"
            placeholder={index === 0 ? "To *" : "To"}
            value={item.to_serial}
            required={index === 0}
            onChange={(e) =>
              handleSerialChange(index, "to_serial", e.target.value)
            }
            className="border px-2 py-1 rounded-md w-full bg-gray-100"
          />
          <input
            type="number"
            placeholder="Total"
            value={item.total}
            className="border px-2 py-1 rounded-md w-full bg-gray-100"
            disabled
          />
        </React.Fragment>
      ))}
    </div>
  </div>

  {/* Summary Section */}
  <div className="border rounded-md p-4">
    <h3 className="text-lg font-medium mb-4">Summary</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Total Count</label>
        <input
          name="total_count"
          type="text"
          value={formData.total_count}
          onChange={handleChange}
          placeholder="Total Count"
          className="border px-2 py-1 rounded-md w-full bg-gray-100"
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
          className="border px-2 py-1 rounded-md w-full bg-gray-100"
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
          className="border px-2 py-1 rounded-md w-full bg-gray-100"
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
          type="button"
           onClick={handleBack}
          className="bg-gray-700 text-white h-8 w-24 rounded-md"
        >
          Back To List
        </button>
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

        <button
          type="button"
            onClick={handlePrint}

          className="bg-blue-500 text-white h-8 w-16 rounded-md"
        >
          Print
        </button>
      </div>
    </form>
  );
};

export default Vokalotnama;

