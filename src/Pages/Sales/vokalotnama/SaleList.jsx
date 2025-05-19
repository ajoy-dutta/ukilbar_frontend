import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const SaleList = () => {
  const [salesData, setSalesData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [saleType, setSaleType] = useState('Vokalotnama');
  const [filteredData, setFilteredData] = useState([]);


  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setSaleType(selectedType );
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("vokalotnama/");
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
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

    if (saleType) {
      filtered = filtered.filter((item) => item.sale_type === saleType);
    }

    setFilteredData(filtered);
  }, [fromDate, toDate, saleType, salesData]);



  return (
    <div>
      <div className="bg-white p-6 mx-8 rounded-md w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Search {saleType} Sales</h2>
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

        <div >
          <label
            htmlFor="sale_type"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Sale Type
          </label>
          <select
            id="saleType"
            value={saleType}
            onChange={handleTypeChange}
            className="w-1/4 p-2 border border-gray-300 rounded"
          >
            <option value="Vokalotnama">Vokalotnama</option>
            <option value="Cartis Paper">Cartis Paper</option>
            <option value="Sticker">Sticker</option>
          </select>
        </div>


        {/* Table */}
        <div className="mt-8 mr-6">
          <p className="text-gray-800 mb-2 font-bold text-xl text-center mt-8">
            {saleType} Sales List
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 border">Sales Date</th>
                  <th className="px-4 py-2 border">Receipt NO</th>
                  <th className="px-4 py-2 border">Advocate Name</th>
                  <th className="px-4 py-2 border">Customer Name</th>
                  <th className="px-4 py-2 border">Building Name</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Total Amount</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((sale, index) => (
                    <tr key={index} className="text-center border-t">
                      <td className="px-4 py-2 border">{sale.sales_date}</td>
                      <td className="px-4 py-2 border">{sale.receipt_no}</td>
                      <td className="px-4 py-2 border">{sale.advocate_name}</td>
                      <td className="px-4 py-2 border">{sale.customer_name}</td>
                      <td className="px-4 py-2 border">{sale.building_name}</td>
                      <td className="px-4 py-2 border">{sale.total_count}</td>
                      <td className="px-4 py-2 border">{sale.price}</td>
                      <td className="px-4 py-2 border">{sale.total_amount}</td>
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
    </div>
  );
};

export default SaleList;
