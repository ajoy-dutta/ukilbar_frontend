import { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const ExpanseReport = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  const [formData, setFormData] = useState({
    year: currentYear,
    expanseCategory: "",
    actualExpanse: "",
  });
  const [expanseList, setExpanseList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    fetchexpanses();
  }, [formData.year]);

  const fetchexpanses = async () => {
    try {
      const response = await AxiosInstance.get(
        `actual_expanse/?year=${formData.year}`
      );
      setExpanseList(response.data);
    } catch (err) {
      console.error("Failed to fetch expanse list:", err);
    }
  };

  useEffect(() => {
    const totals = {};
    expanseList.forEach((item) => {
      const category = item.expanseCategory;
      const amount = parseFloat(item.actualExpanse);
      totals[category] = (totals[category] || 0) + amount;
    });
    setCategoryTotals(totals);
  }, [expanseList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await AxiosInstance.put(
          `actual_expanse/${editId}/`,
          formData
        );
        alert("Income updated successfully!");
        console.log(response.data);
        setExpanseList(
          expanseList.map((item) =>
            item.id === Number(editId) ? response.data : item
          )
        );
      } else {
        const response = await AxiosInstance.post("actual_expanse/", formData);
        console.log("formData", formData);
        alert("Income added successfully!");
        setExpanseList([...expanseList, response.data]);
      }
      handleClear();
    } catch (err) {
      console.error("Failed to save income:", err);
      alert("❌ Failed to save income.");
    }
  };

  const handleClear = () => {
    setFormData({ expanseCategory: "", actualExpanse: "", year: currentYear });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      expanseCategory: item.expanseCategory,
      actualExpanse: item.actualExpanse,
      year: item.year,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`actual_expanse/${id}/`);
      setExpanseList(expanseList.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete income:", err);
      alert("❌ Failed to delete income.");
    }
  };

  const totalActualExpanse = expanseList.reduce(
    (sum, item) => sum + parseFloat(item.ProbableExpanse),
    0
  );

  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-xl font-semibold text-center mb-4">Expanse Report</h2>

      {/* Year selector */}
      <div className="mb-4 px-2 flex items-center gap-2">
        <label htmlFor="year" className="font-medium">
          Select Year:
        </label>
        <select
          id="year"
          value={formData.year}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              year: parseInt(e.target.value),
            }));
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
        <label className="block font-medium mb-1" htmlFor="expanseCategory">
          Expanse Category
        </label>
        <select
          id="expanseCategory"
          name="expanseCategory"
          value={formData.expanseCategory || ""}
          onChange={handleChange}
          className="block w-full mb-3 px-2 py-1 border rounded"
          required
        >
          <option value="">Select Expense Category</option>
          <option value="Vokalatnama printing cost">
            Vokalatnama printing cost
          </option>
          <option value="Bailbond printing cost">Bailbond printing cost</option>
          <option value="Telephone bill">Telephone bill</option>
          <option value="Electricity bill">Electricity bill</option>
          <option value="Library maintenance cost">
            Library maintenance cost
          </option>
          <option value="Employee salary">Employee salary</option>
        </select>

        <label className="block font-medium mb-1" htmlFor="actualExpanse">
          Expanse Amount(৳)
        </label>
        <input
          type="number"
          id="actualExpanse"
          placeholder="Enter Expanse Amount"
          name="actualExpanse"
          value={formData.actualExpanse}
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

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">
          Category-wise Total Expanse
        </h3>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Category</th>
              <th className="border p-2">Total Amount (৳)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categoryTotals).map(([category, total]) => (
              <tr key={category}>
                <td className="border p-2">{category}</td>
                <td className="border p-2 text-right">
                  {total.toLocaleString()}৳
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpanseReport;
