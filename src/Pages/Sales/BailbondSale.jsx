import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

const BailbondSale = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [salesData, setSalesData] = useState([]);

  const [formData, setFormData] = useState({
    receipt_no: "",
    sales_date: "",
    building_name: "",
    remarks: "",
    bailbond_serials: [{ from_serial: null, to_serial: null, total: null }],
    total_count: "",
    price: "",
    total_amount: "",
  });


  const ensureFourRows = (serials) => {
    const updated = [...serials];
    while (updated.length < 4) {
      updated.push({ from_serial: null, to_serial: null, total: null });
    }
    return updated.slice(0, 4); 
  };


  useEffect(() => {
      setFormData(prev => ({
        ...prev,
        serials: ensureFourRows(prev.serials)
      }));
    }, []);



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
    const updatedSerials = [...formData.bailbond_serials];
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
      bailbond_serials: updatedSerials,
      total_count:newtotal_count,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredSerials = formData.bailbond_serials.filter(
    (serial) =>
      serial.from_serial &&
      serial.to_serial  &&
      serial.total  
    );

    const payload = {
      ...formData,
      bailbond_serials: filteredSerials,
    };

    try {
      const response = await AxiosInstance.post("/bailbondSale", payload);
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
      building_name: "",
      remarks: "",
      bailbond_serials: ensureFourRows([]),
      total_count: "",
      price: "",
      total_amount: "",
    });
  };


  const handleBack = () => {
    window.history.back();
  };

  const handleSearchClick = () => {
    setIsModalOpen(true); // open the modal
  };

  const handleModalSearch = () => {
    console.log("Searching from", fromDate, "to", toDate);
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
        BailBond Sales
      </h2>

      {/* Basic Info */}
      <div className="border rounded-md p-4 mb-6">
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Receipt No.
            </label>
            <input
              name="receiptNo"
              type="text"
              value={formData.receiptNo}
              onChange={handleChange}
              placeholder="Receipt No."
              className="border px-2 py-1 pr-10 rounded-md w-full bg-gray-100"
            />
            <button
              type="button"
              onClick={handleSearchClick} // Define this function to perform search
              className="bg-gray-400 hover:bg-blue-600 absolute top-1/2 right-2 transform -translate-y-0 flex items-center "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 font-bold" // আগের h-4 w-4 থেকে h-6 w-6 এ বাড়ানো হয়েছে এবং bold look এর জন্য color change
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5} // একটু মোটা দেখানোর জন্য strokeWidth বাড়ানো হয়েছে
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </button>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Search Bailboard Sales
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </div>

                {/* Date Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium">From Date</label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="border px-2 py-1 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">To Date</label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="border px-2 py-1 rounded-md w-full"
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      onClick={handleModalSearch}
                      className="bg-blue-950 text-white px-2 py-1 rounded-md hover:bg-blue-700 mt-1"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Placeholder for Table */}
                <div className="mt-4">
                  <p className="text-gray-500 italic mb-2">
                    Sales list table will be shown here...
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700">
                          <th className="px-4 py-2 border">Sales Date</th>
                          <th className="px-4 py-2 border">Receipt NO</th>
                          <th className="px-4 py-2 border">Building Name</th>
                          <th className="px-4 py-2 border">BailBond Count</th>
                          <th className="px-4 py-2 border">price</th>
                          <th className="px-4 py-2 border">Total Amount</th>
                          <th className="px-4 py-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesData.length > 0 ? (
                          salesData?.map((sale, index) => (
                            <tr key={index} className="text-center border-t">
                              <td className="px-4 py-2 border">
                                {sale.sales_date}
                              </td>
                              <td className="px-4 py-2 border">
                                {sale.receipt_no}
                              </td>
                              <td className="px-4 py-2 border">
                                {sale.building_name}
                              </td>
                              <td className="px-4 py-2 border">
                                {sale.bailbond_count}
                              </td>
                              <td className="px-4 py-2 border">{sale.price}</td>
                              <td className="px-4 py-2 border">
                                {sale.total_amount}
                              </td>
                              <td className="px-4 py-2 border">
                                {/* You can add buttons/links here */}
                                <button className="text-blue-500 hover:underline">
                                  View
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="text-center px-4 py-4 text-gray-400"
                            >
                              No sales data found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                 {/* Close Button at Bottom Right */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-blue-950 text-white px-2 py-1 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
              </div>
            </div>
          )}

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
            <label className="block text-sm font-medium">Remarks</label>
            <input
              name="remarks"
              type="text"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
              className="border px-2 py-1 rounded-md w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Serial and Summary */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Vokalotnama Serial Section */}
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4">Bailbond Serial No.</h3>
          <div className="grid grid-cols-3 gap-3">
            {formData.serials.map((item, index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  placeholder={index === 0 ? "From *" : "From"}
                  value={item.from_serial}
                  required={index === 0}
                  onChange={(e) =>
                    handleSerialChange(index, "from_serial", e.target.value)
                  }
                  className="border px-2 py-1 rounded-md w-full bg-gray-100"
                />
                <input
                  type="text"
                  placeholder={index === 0 ? "To *" : "To"}
                  value={item.to_serial}
                  required={index === 0}
                  onChange={(e) =>
                    handleSerialChange(index, "to_serial", e.target.value)
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
                name="total_count"
                type="text"
                value={formData.total_count}
                onChange={handleChange}
                placeholder="Total Count"
                className="border px-2 py-1 rounded-md w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                price <span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
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

export default BailbondSale;
