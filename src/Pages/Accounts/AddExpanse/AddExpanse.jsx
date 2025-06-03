import { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const AddExpanse = () => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toISOString().split("T")[0];
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  const [formData, setFormData] = useState({
    year: currentYear,
    expanseCategory: "",
    actualExpanse: "",
    date: currentDate,
  });
  const [expanseList, setExpanseList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);

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
    const fetchCategories = async () => {
      try {
        const response = await AxiosInstance.get("expanse_category/");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

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
        alert("Expanse updated successfully!");
        setExpanseList(
          expanseList.map((item) =>
            item.id === Number(editId) ? response.data : item
          )
        );
      } else {
        const response = await AxiosInstance.post("actual_expanse/", formData);
        alert("Expanse added successfully!");
        setExpanseList([...expanseList, response.data]);
      }
      handleClear();
    } catch (err) {
      console.error("Failed to save expanse:", err);
      alert("❌ Failed to save expanse.");
    }
  };

  const handleClear = () => {
    setFormData({
      expanseCategory: "",
      actualExpanse: "",
      year: currentYear,
      date: currentDate,
    });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      expanseCategory: item.expanseCategory,
      actualExpanse: item.actualExpanse,
      year: item.year,
      date: item.date,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`actual_expanse/${id}/`);
      setExpanseList(expanseList.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete expanse:", err);
      alert("❌ Failed to delete expanse.");
    }
  };

  return (
    <div className="p-6 px-12">
      <h2 className="text-xl font-semibold mb-4 px-4">Add Expanse</h2>

      <div className="px-4 space-x-2 mb-4">
        <label htmlFor="year">Select Year</label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="border p-2 rounded px-4 py-2 text-lg"
        >
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded-md mb-6 space-y-4 px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-sm">
              Expanse Category
            </label>
            <select
              name="expanseCategory"
              value={formData.expanseCategory}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">
             Amount
            </label>
            <input
              type="number"
              name="actualExpanse"
              placeholder="Enter Amount"
              value={formData.actualExpanse}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Expanse List */}
      <div className="overflow-x-auto px-4 ">
        <table className="w-full border text-sm ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">SL</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount (৳)</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expanseList.map((item, index) => (
              <tr key={item.id}>
                <td className="border-2 p-2 text-center">{index+1}</td>
                <td className="border-2 p-2">{item.expanseCategory}</td>
                <td className="border-2 p-2 text-right">{item.actualExpanse}৳</td>
                <td className="border-2 p-2 text-left">{item.date}</td>
                <td className="border-2 p-2 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expanseList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No expanse data found for {formData.year}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddExpanse;
