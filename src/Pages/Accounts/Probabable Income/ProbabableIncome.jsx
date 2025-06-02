import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const ProbableIncome = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);
  const [formData, setFormData] = useState({
    year: currentYear,
    IncomeCategory: "",
    amount: "",
  });
  const [incomeList, setIncomeList] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchIncomes();
  }, [formData.year]);

  const fetchIncomes = async () => {
    try {
      const response = await AxiosInstance.get(`probable_income/?year=${formData.year}`);
      setIncomeList(response.data);
    } catch (err) {
      console.error("Failed to fetch income list:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await AxiosInstance.put(`probable_income/${editId}/`, formData);
        setIncomeList(
          incomeList.map((item) => (item.id === editId ? response.data : item))
        );
        alert("Income updated successfully!");
      } else {
        console.log("formData", formData)
        const response = await AxiosInstance.post("probable_income/", formData);
        setIncomeList([...incomeList, response.data]);
        alert("Income added successfully!");
      }
      handleClear();
    } catch (err) {
      console.error("Failed to save income:", err);
      alert("❌ Failed to save income.");
    }
  };

  const handleClear = () => {
    setFormData({ IncomeCategory: "", amount: ""});
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({ IncomeCategory: item.IncomeCategory, amount: item.amount });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`probable_income/${id}/`);
      setIncomeList(incomeList.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete income:", err);
      alert("❌ Failed to delete income.");
    }
  };

  const totalAmount = incomeList.reduce((sum, item) => sum + parseFloat(item.amount), 0);

  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-xl font-semibold text-center mb-4">Probable Income</h2>

       {/* Year selector */}
      <div className="mb-4 px-2 flex items-center gap-2">
        <label htmlFor="yearSelect" className="font-medium">
          Select Year:
        </label>
        <select
          id="year"
          value={formData.year}
          onChange={(e) =>{
            setFormData(prev=>({
              ...prev, 
              year:parseInt(e.target.value)
              }))
            }}
          className="border px-4 py-2"
        >
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded-md shadow mb-6"
      >
        <label className="block font-medium mb-1" htmlFor="IncomeCategory">IncomeCategory</label>
        <input
          type="text"
          id="IncomeCategory"
          placeholder="Enter Income Category"
          name="IncomeCategory"
          value={formData.IncomeCategory}
          onChange={handleChange}
          className="block w-full mb-3 px-2 py-1 border rounded"
          required
        />

        <label className="block font-medium mb-1" htmlFor="amount">Amount (৳)</label>
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="block w-full mb-3 px-2 py-1 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          {editId ? "Update" : "Save"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </form>

      <h3 className="text-lg font-medium mb-2">Income List</h3>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SL</th>
            <th className="border p-2">IncomeCategory</th>
            <th className="border p-2">Amount (৳)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomeList.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.IncomeCategory}</td>
              <td className="border p-2 text-right">
                {parseFloat(item.amount).toLocaleString()}৳
              </td>
              <td className="border p-2 flex space-x-2 justify-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100">
            <td colSpan="2" className="border px-2 py-1 text-right">Total</td>
            <td className="border px-2 py-1 text-right">
              {totalAmount.toLocaleString()}৳
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProbableIncome;
