import { useEffect, useState } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const CategoryConfig = ({ isOpen, onClose ,categoryData, reportType}) => {
  const [percentage, setPercentage] = useState([]);
  const [formData, setFormData] = useState({ category: "", percentage: "" });
  const [editId, setEditId] = useState("");

  const endpointBase =
    reportType === "welfare" ? "welfare-category-percentage" : "income-category-percentage";


  const fetchCategories_and_Percentage = async () => {
    try {
      const res = await AxiosInstance.get(`${endpointBase}/`);
      setPercentage(res.data);
    } catch (err) {
      console.error("Failed to fetch percentageData:", err);
    }
  };


  useEffect(() => {
    if (isOpen) fetchCategories_and_Percentage();
  }, [isOpen]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(editId){
           const response = await AxiosInstance.put(`${endpointBase}/${editId}/`, formData);
           alert("percentage updated successfully!");
           setPercentage(
            percentage.map((item) =>
                item.id === Number(editId) ? response.data : item
            ))
        }
        else{
            const response = await AxiosInstance.post(`${endpointBase}/`, formData);
            alert("percentage added successfully!");
            setPercentage([...percentage, response.data]);
        }
        setFormData({ category: "", percentage: "" });
        setEditId("");
    } catch (err) {
      console.error("Error posting config:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`${endpointBase}/${id}/`);
      setPercentage(percentage.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete percentage !");
    }
  };

  const handleEdit = async (item) => {
    setFormData({ category: item.category, percentage: item.percentage});
    setEditId(item.id)
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-xl relative">
        <h2 className="text-lg font-semibold mb-4">
        {reportType === "welfare" ? "Configure Welfare Fund Category Percentage" : "Configure General Income Category Percentage"}
        </h2>

        <form onSubmit={formData.id ? handleUpdate : handleSubmit} className="bg-teal-50 p-2">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Category</label>
            <select 
            name="category" 
            id="category"
            className="px-4 py-2"
            value={formData.category}
            onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
                {Object.entries(categoryData).map(([category, amount]) => (
                <option key={category} value={category}>
                    {category}
                </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Percentage</label>
            <input
              type="number"
              value={formData.percentage}
              onChange={(e) =>
                setFormData({ ...formData, percentage: e.target.value })
              }
              className="w-1/2 border px-2 py-1 rounded bg-gray-100"
              required
              min="0"
              max="100"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {formData.id ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2 border-b">Configured Categories</h3>
          <ul>
            {percentage.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b py-1"
              >
                <span className="font-medium text-sm">
                  {item.category} - {item.percentage}%
                </span>
                <div className="space-x-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white px-1 rounded-sm text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-1 rounded-sm text-sm"
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

export default CategoryConfig;
