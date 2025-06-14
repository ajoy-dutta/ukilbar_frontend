import { useEffect, useState } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const ExpanseCategoryConfig = ({ isOpen, onClose, reportType }) => {
  const [percentages, setPercentages] = useState([]);
  const [formData, setFormData] = useState({ category: "", percentage: "" });
  const [editId, setEditId] = useState(null);
  const [ categoryData, setCategoryData] = useState([]);

  const endpointBase =
    reportType === "welfare"
      ? "welfare-expense-category"
      : "general-expense-category";

  const fetchPercentages = async () => {
    try {
      const res = await AxiosInstance.get(`${endpointBase}/`);
      setPercentages(res.data);
    } catch (err) {
      console.error("Error fetching percentages:", err);
    }
  };

   const fetchExpanseCategory = async () => {
    try {
      const res = await AxiosInstance.get('expanse_category/');
      setCategoryData(res.data);
    } catch (err) {
      console.error("Error fetching Expanse Category:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
        fetchPercentages();
        fetchExpanseCategory();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await AxiosInstance.put(`${endpointBase}/${editId}/`, formData);
        alert("Percentage updated successfully!");
        setPercentages(
          percentages.map((item) => (item.id === editId ? response.data : item))
        );
      } else {
        const response = await AxiosInstance.post(`${endpointBase}/`, formData);
        alert("Percentage added successfully!");
        setPercentages([...percentages, response.data]);
      }
      setFormData({ category: "", percentage: "" });
      setEditId(null);
    } catch (err) {
      console.error("Error saving percentage:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({ category: item.category, percentage: item.percentage });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`${endpointBase}/${id}/`);
      setPercentages(percentages.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting percentage:", err);
    }
  };

  if (!isOpen) return null;

  const title =
    reportType === "welfare"
      ? "Configure Welfare Expense Category"
      : "Configure General Expense Category";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="bg-teal-50 p-2">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Category</label>
            <select
              name="category"
              className="px-4 py-2 w-1/2"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              {categoryData.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Percentage</label>
            <input
              type="number"
              className="w-1/2 border px-2 py-1 rounded bg-gray-100"
              value={formData.percentage}
              onChange={(e) =>
                setFormData({ ...formData, percentage: e.target.value })
              }
              required
              min="0"
              max="100"
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {editId ? "Update" : "Save"}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Close
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2 border-b">Configured Categories</h3>
          <ul>
            {percentages.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-1">
                <span className="font-medium text-sm">
                  {item.category} - {item.percentage}%
                </span>
                <div className="space-x-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white px-2 rounded-sm text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-2 rounded-sm text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpanseCategoryConfig;
