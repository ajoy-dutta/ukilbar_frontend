import { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

const AddCategory = () => {
  const [type, setType] = useState("Expanse");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const getApiPath = () => {
    return type === "Income" ? "income_category/" : "expanse_category/";
  };

  const fetchCategories = async () => {
    try {
      const response = await AxiosInstance.get(getApiPath());
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await AxiosInstance.put(`${getApiPath()}${editId}/`, {
          category,
        });
        setCategories(
          categories.map((item) => (item.id === editId ? res.data : item))
        );
        alert(`${type} Category updated`);
      } else {
        const res = await AxiosInstance.post(getApiPath(), { category });
        setCategories([...categories, res.data]);
        alert(`${type} Category added`);
      }
      setCategory("");
      setEditId(null);
    } catch (err) {
      console.error("Failed to save category", err);
      alert("❌ Failed to save category");
    }
  };

  const handleEdit = (item) => {
    setCategory(item.category);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`${getApiPath()}${id}/`);
      setCategories(categories.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete category", err);
      alert("❌ Failed to delete category");
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setCategory("");
    setEditId(null);
  };

  return (
    <div className="p-4 w-1/2 mx-auto pt-12">
      <h2 className="text-2xl font-bold mb-8">Add Category</h2>

      <div className="mb-8">
        <label className="mr-2 font-semibold">Select Type:</label>
        <select
          value={type}
          onChange={handleTypeChange}
          className="border p-2 rounded px-2 font-semibold"
        >
          <option value="Income">Income Category</option>
          <option value="Expanse">Expanse Category</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-2/3"
          placeholder="Enter category name"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">
        {type === "Income" ? "Income" : "Expanse"} Categories
      </h3>
      <div className="border rounded overflow-hidden">
        <div className="bg-gray-200 p-2 font-semibold flex justify-between">
            <span>Category</span>
            <span>Actions</span>
        </div>
        {categories.map((item) => (
            <div
            key={item.id}
            className="p-2 flex justify-between items-center border-t"
            >
            <span>{item.category}</span>
            <div className="space-x-4">
                <button
                onClick={() => handleEdit(item)}
                className="text-white hover:bg-blue-600 bg-blue-500 px-1 rounded-sm"
                >
                Edit
                </button>
                <button
                onClick={() => handleDelete(item.id)}
                className="text-white hover:bg-red-600 bg-red-500 px-1 rounded-sm"
                >
                Delete
                </button>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default AddCategory;
