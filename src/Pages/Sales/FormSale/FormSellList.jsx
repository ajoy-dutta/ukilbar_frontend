import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const FormSellList = () => {
  const [salesData, setSalesData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("form-sale/");
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching form sale data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...salesData];

    if (fromDate) {
      filtered = filtered.filter((item) => item.sales_date >= fromDate);
    }

    if (toDate) {
      filtered = filtered.filter((item) => item.sales_date <= toDate);
    }

    setFilteredData(filtered);
  }, [fromDate, toDate, salesData]);

  return (
    <div className="bg-white p-6 mx-8 rounded-md w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Search Form Sales</h2>
      </div>

      {/* Date Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-4">
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
      </div>

      {/* Table */}
      <div className="mt-8 mr-6">
        <p className="text-gray-800 mb-2 font-bold text-xl text-center mt-8">
          Form Sales List
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border">Sales Date</th>
                <th className="px-4 py-2 border">Receipt No</th>
                <th className="px-4 py-2 border">Building Name</th>
                <th className="px-4 py-2 border">Form Name</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Total Amount</th>
                <th className="px-4 py-2 border">Remarks</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((sale, index) => (
                  <tr key={index} className="text-center border-t">
                    <td className="px-4 py-2 border">{sale.sales_date}</td>
                    <td className="px-4 py-2 border">{sale.receipt_no}</td>
                    <td className="px-4 py-2 border">{sale.building_name}</td>
                    <td className="px-4 py-2 border">{sale.form_name}</td>
                    <td className="px-4 py-2 border">{sale.total_count}</td>
                    <td className="px-4 py-2 border">{sale.price}</td>
                    <td className="px-4 py-2 border">{sale.total_amount}</td>
                    <td className="px-4 py-2 border">{sale.remarks}</td>
                    <td className="px-4 py-2 border">
                      <button className="text-blue-500 hover:underline">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center px-4 py-4 text-gray-400">
                    No sales data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormSellList;
