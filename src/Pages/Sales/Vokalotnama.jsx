import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VokalatnamaFormAndList = () => {
  const [formData, setFormData] = useState({
    receipt_no: '',
    advocate: '',
    building_name: '',
    address: '',
    sales_date: '',
    customer_phone: '',
    customer_name: '',
    customer_address: '',
    price: '',
    total_count: '',
    total_amount: '',
  });

  const [serials, setSerials] = useState([
    { from_serial: '', to_serial: '', total: '' }
  ]);


  const handleSerialChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...serials];
    updated[index][name] = value;
    setSerials(updated);
  };
  
  const addSerialRow = () => {
    setSerials([...serials, { from_serial: '', to_serial: '', total: '' }]);
  };
  
  const removeSerialRow = (index) => {
    const updated = [...serials];
    updated.splice(index, 1);
    setSerials(updated);
  };
  

  const [salesList, setSalesList] = useState([]);

  const fetchSales = async () => {
    try {
      const res = await axios.get('/api/sales/');
      setSalesList(res.data);
    } catch (err) {
      console.error('Error fetching sales:', err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/sales/', formData);
      fetchSales();
      setFormData({
        receipt_no: '',
        advocate: '',
        building_name: '',
        address: '',
        sales_date: '',
        customer_phone: '',
        customer_name: '',
        customer_address: '',
        price: '',
        total_count: '',
        total_amount: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Vokalatnama Sales Entry</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <input type="text" name="receipt_no" value={formData.receipt_no} onChange={handleChange} placeholder="Receipt No" className="border p-2 rounded" />
        <input type="number" name="advocate" value={formData.advocate} onChange={handleChange} placeholder="Advocate ID" className="border p-2 rounded" />
        <input type="text" name="building_name" value={formData.building_name} onChange={handleChange} placeholder="Building Name" className="border p-2 rounded" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" />
        <input type="date" name="sales_date" value={formData.sales_date} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="customer_phone" value={formData.customer_phone} onChange={handleChange} placeholder="Customer Phone" className="border p-2 rounded" />
        <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} placeholder="Customer Name" className="border p-2 rounded" />
        <input type="text" name="customer_address" value={formData.customer_address} onChange={handleChange} placeholder="Customer Address" className="border p-2 rounded" />
        <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
        <input type="number" name="total_count" value={formData.total_count} onChange={handleChange} placeholder="Total Count" className="border p-2 rounded" />
        <input type="number" step="0.01" name="total_amount" value={formData.total_amount} onChange={handleChange} placeholder="Total Amount" className="border p-2 rounded" />
        <h3 className="text-lg font-bold">Vokalatnama Serials</h3>
        {serials.map((serial, index) => (
        <div key={index} className="flex space-x-2 mb-2">
            <input
            type="text"
            name="from_serial"
            placeholder="From"
            value={serial.from_serial}
            onChange={(e) => handleSerialChange(index, e)}
            className="border p-1 w-1/3"
            />
            <input
            type="text"
            name="to_serial"
            placeholder="To"
            value={serial.to_serial}
            onChange={(e) => handleSerialChange(index, e)}
            className="border p-1 w-1/3"
            />
            <input
            type="number"
            name="total"
            placeholder="Total"
            value={serial.total}
            onChange={(e) => handleSerialChange(index, e)}
            className="border p-1 w-1/4"
            />
            <button type="button" onClick={() => removeSerialRow(index)} className="text-red-600">X</button>
        </div>
        ))}
        <button type="button" onClick={addSerialRow} className="bg-blue-500 text-white px-2 py-1 rounded">
        Add Row
        </button>
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Sales List</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Receipt No</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* {salesList?.map(sale => (
            <tr key={sale.id}>
              <td className="border p-2">{sale.receipt_no}</td>
              <td className="border p-2">{sale.customer_name}</td>
              <td className="border p-2">{sale.sales_date}</td>
              <td className="border p-2">{sale.total_amount}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default VokalatnamaFormAndList;
