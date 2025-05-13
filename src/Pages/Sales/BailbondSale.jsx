import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

const BailbondSale = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [salesData, setSalesData] = useState([]);

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
      const response = await AxiosInstance.post("/bailbondSale", formData);
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

      buildingName: "",
      remarks: "",
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
  const handleSearchClick = () => {
    setIsModalOpen(true); // open the modal
  };

  const handleModalSearch = () => {
    // Fetch sales list or filter data here
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
                          <th className="px-4 py-2 border">Rate</th>
                          <th className="px-4 py-2 border">Total Amount</th>
                          <th className="px-4 py-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesData.length > 0 ? (
                          salesData.map((sale, index) => (
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
                              <td className="px-4 py-2 border">{sale.rate}</td>
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

export default BailbondSale;
