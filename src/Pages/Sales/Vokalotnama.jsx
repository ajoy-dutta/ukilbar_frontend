import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

const Vokalotnama = () => {
  const [formData, setFormData] = useState({
    receiptNo: "",
    salesDate: "",
    advocateName: "",
    buildingName: "",
    advocateId: "",
    phoneNo: "",
    customerName: "",
    customerAddress: "",
    vokalotSerials: [{ from: "", to: "", total: "" }],
    totalCount: "",
    rate: "",
    totalAmount: "",
  });

  // Automatically ensure 4 rows for serials on mount
  useEffect(() => {
    const updated = [...formData.vokalotSerials];
    while (updated.length < 4) {
      updated.push({ from: "", to: "", total: "" });
    }
    setFormData((prev) => ({ ...prev, vokalotSerials: updated }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSerialChange = (index, field, value) => {
    const updatedSerials = [...formData.vokalotSerials];
    updatedSerials[index][field] = value;
    setFormData({ ...formData, vokalotSerials: updatedSerials });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post("/vokalotnama", formData);
      console.log("Success:", response.data);
      alert("Submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Submission failed.");
    }
  };

  const handleClear = () => {
    setFormData({
      receiptNo: "",
      salesDate: "",
      advocateName: "",
      buildingName: "",
      advocateId: "",
      phoneNo: "",
      customerName: "",
      customerAddress: "",
      vokalotSerials: [{ from: "", to: "", total: "" }],
      totalCount: "",
      rate: "",
      totalAmount: "",
    });
  };
const handleBack = () => {
  // history.back() or router.push('/vokalotnama-list')
  window.history.back();
};

const handlePrint = () => {
  window.print();
};

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold text-blue-950 mb-4 text-center">
        Vokalotnama Sales
      </h2>

      {/* Basic Info */}
      <div className="border rounded-md p-4 mb-6">
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium">Receipt No.</label>
            <input
              name="receiptNo"
              type="text"
              value={formData.receiptNo}
              onChange={handleChange}
              placeholder="Receipt No."
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Sales Date</label>
            <input
              name="salesDate"
              type="date"
              value={formData.salesDate}
              onChange={handleChange}
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Advocate Name</label>
            <input
              name="advocateName"
              type="text"
              value={formData.advocateName}
              onChange={handleChange}
              placeholder="Advocate Name"
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Building Name</label>
            <input
              name="buildingName"
              type="text"
              value={formData.buildingName}
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
              name="phoneNo"
              type="text"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Phone No."
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="customerName"
              type="text"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Name"
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              name="customerAddress"
              type="text"
              value={formData.customerAddress}
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
      {formData.vokalotSerials.map((item, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            placeholder={index === 0 ? "From *" : "From"}
            value={item.from}
            required={index === 0}
            onChange={(e) =>
              handleSerialChange(index, "from", e.target.value)
            }
            className="border px-2 py-1 rounded-md w-full bg-gray-100"
          />
          <input
            type="text"
            placeholder={index === 0 ? "To *" : "To"}
            value={item.to}
            required={index === 0}
            onChange={(e) =>
              handleSerialChange(index, "to", e.target.value)
            }
            className="border px-2 py-1 rounded-md w-full bg-gray-100"
          />
          <input
            type="text"
            placeholder="Total"
            value={item.total}
            onChange={(e) =>
              handleSerialChange(index, "total", e.target.value)
            }
            className="border px-2 py-1 rounded-md w-full bg-gray-100"
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
          name="totalCount"
          type="text"
          value={formData.totalCount}
          onChange={handleChange}
          placeholder="Total Count"
          className="border px-2 py-1 rounded-md w-full bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">
          Rate <span className="text-red-500">*</span>
        </label>
        <input
          name="rate"
          type="text"
          value={formData.rate}
          onChange={handleChange}
          placeholder="Rate"
          className="border px-2 py-1 rounded-md w-full bg-gray-100"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">
          Total Amount <span className="text-red-500">*</span>
        </label>
        <input
          name="totalAmount"
          type="text"
          value={formData.totalAmount}
          onChange={handleChange}
          placeholder="Total Amount"
          className="border px-2 py-1 rounded-md w-full bg-gray-100"
          required
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
  type="button" // Ensure it's type="button" and not type="reset"
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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const VokalatnamaFormAndList = () => {
//   const [formData, setFormData] = useState({
//     receipt_no: '',
//     advocate: '',
//     building_name: '',
//     address: '',
//     sales_date: '',
//     customer_phone: '',
//     customer_name: '',
//     customer_address: '',
//     price: '',
//     total_count: '',
//     total_amount: '',
//   });

//   const [serials, setSerials] = useState([
//     { from_serial: '', to_serial: '', total: '' }
//   ]);

//   const handleSerialChange = (index, e) => {
//     const { name, value } = e.target;
//     const updated = [...serials];
//     updated[index][name] = value;
//     setSerials(updated);
//   };

//   const addSerialRow = () => {
//     setSerials([...serials, { from_serial: '', to_serial: '', total: '' }]);
//   };

//   const removeSerialRow = (index) => {
//     const updated = [...serials];
//     updated.splice(index, 1);
//     setSerials(updated);
//   };

//   const [salesList, setSalesList] = useState([]);

//   const fetchSales = async () => {
//     try {
//       const res = await axios.get('/api/sales/');
//       setSalesList(res.data);
//     } catch (err) {
//       console.error('Error fetching sales:', err);
//     }
//   };

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/sales/', formData);
//       fetchSales();
//       setFormData({
//         receipt_no: '',
//         advocate: '',
//         building_name: '',
//         address: '',
//         sales_date: '',
//         customer_phone: '',
//         customer_name: '',
//         customer_address: '',
//         price: '',
//         total_count: '',
//         total_amount: '',
//       });
//     } catch (err) {
//       console.error('Error submitting form:', err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Vokalatnama Sales Entry</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
//         <input type="text" name="receipt_no" value={formData.receipt_no} onChange={handleChange} placeholder="Receipt No" className="border p-2 rounded" />
//         <input type="number" name="advocate" value={formData.advocate} onChange={handleChange} placeholder="Advocate ID" className="border p-2 rounded" />
//         <input type="text" name="building_name" value={formData.building_name} onChange={handleChange} placeholder="Building Name" className="border p-2 rounded" />
//         <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" />
//         <input type="date" name="sales_date" value={formData.sales_date} onChange={handleChange} className="border p-2 rounded" />
//         <input type="text" name="customer_phone" value={formData.customer_phone} onChange={handleChange} placeholder="Customer Phone" className="border p-2 rounded" />
//         <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} placeholder="Customer Name" className="border p-2 rounded" />
//         <input type="text" name="customer_address" value={formData.customer_address} onChange={handleChange} placeholder="Customer Address" className="border p-2 rounded" />
//         <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
//         <input type="number" name="total_count" value={formData.total_count} onChange={handleChange} placeholder="Total Count" className="border p-2 rounded" />
//         <input type="number" step="0.01" name="total_amount" value={formData.total_amount} onChange={handleChange} placeholder="Total Amount" className="border p-2 rounded" />
//         <h3 className="text-lg font-bold">Vokalatnama Serials</h3>
//         {serials.map((serial, index) => (
//         <div key={index} className="flex space-x-2 mb-2">
//             <input
//             type="text"
//             name="from_serial"
//             placeholder="From"
//             value={serial.from_serial}
//             onChange={(e) => handleSerialChange(index, e)}
//             className="border p-1 w-1/3"
//             />
//             <input
//             type="text"
//             name="to_serial"
//             placeholder="To"
//             value={serial.to_serial}
//             onChange={(e) => handleSerialChange(index, e)}
//             className="border p-1 w-1/3"
//             />
//             <input
//             type="number"
//             name="total"
//             placeholder="Total"
//             value={serial.total}
//             onChange={(e) => handleSerialChange(index, e)}
//             className="border p-1 w-1/4"
//             />
//             <button type="button" onClick={() => removeSerialRow(index)} className="text-red-600">X</button>
//         </div>
//         ))}
//         <button type="button" onClick={addSerialRow} className="bg-blue-500 text-white px-2 py-1 rounded">
//         Add Row
//         </button>
//         <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
//       </form>

//       <h3 className="text-xl font-semibold mb-2">Sales List</h3>
//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Receipt No</th>
//             <th className="border p-2">Customer</th>
//             <th className="border p-2">Date</th>
//             <th className="border p-2">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {salesList?.map(sale => (
//             <tr key={sale.id}>
//               <td className="border p-2">{sale.receipt_no}</td>
//               <td className="border p-2">{sale.customer_name}</td>
//               <td className="border p-2">{sale.sales_date}</td>
//               <td className="border p-2">{sale.total_amount}</td>
//             </tr>
//           ))} */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VokalatnamaFormAndList;
