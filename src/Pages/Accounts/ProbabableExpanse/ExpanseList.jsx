import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const ProbableExpanse = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  const [formData, setFormData] = useState({
    year: currentYear,
    expanseCategory: "",
    ProbableExpanse: "",
  });
  const [expanseList, setExpanseList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [ categories, setCategories] = useState([])
 


  useEffect(() => {
    fetchexpanses();
  }, [formData.year]);

  const fetchexpanses = async () => {
    try {
      const response = await AxiosInstance.get(`probable_expanse/?year=${formData.year}`);
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
        const response = await AxiosInstance.put(`probable_expanse/${editId}/`, formData);
        setExpanseList(
          expanseList.map((item) => (item.id === editId ? response.data : item))
        );
        alert("Probable Expanse updated successfully!");
      } else {
        const response = await AxiosInstance.post("probable_expanse/", formData);
        console.log("formData", formData)
        setExpanseList([...expanseList, response.data]);
        alert("Probable Expanse added successfully!");
      }
      handleClear();
    } catch (err) {
      console.error("Failed to save income:", err);
      alert("❌ Failed to save income.");
    }
  };

  const handleClear = () => {
    setFormData({ expanseCategory: "", ProbableExpanse: "" , year: currentYear,});
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({ expanseCategory: item.expanseCategory, ProbableExpanse: item.ProbableExpanse , year:item.year});
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`probable_expanse/${id}/`);
      setExpanseList(expanseList.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete income:", err);
      alert("❌ Failed to delete income.");
    }
  };

  const totalProbableExpanse = expanseList.reduce((sum, item) => sum + parseFloat(item.ProbableExpanse), 0);

  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-xl font-semibold text-center mb-4">Probable Expanse</h2>


      {/* Year selector */}
      <div className="mb-4 px-2 flex items-center gap-2">
        <label htmlFor="year" className="font-medium">
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
        <label className="block font-medium mb-1" htmlFor="expanseCategory">expanseCategory</label>
        <select
            id="expanseCategory"
            name="expanseCategory"
            value={formData.expanseCategory || ''}
            onChange={handleChange}
            className="block w-full mb-3 px-2 py-1 border rounded"
            required
            >
            <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category || 'Electric Bill'}>
                  {cat.category}
                </option>
              ))}
        </select>

        <label className="block font-medium mb-1" htmlFor="ProbableExpanse">ProbableExpanse(৳)</label>
        <input
          type="number"
          id="ProbableExpanse"
          placeholder="ProbableExpanse"
          name="ProbableExpanse"
          value={formData.ProbableExpanse}
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
            <th className="border p-2">expanseCategory</th>
            <th className="border p-2">ProbableExpanse (৳)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expanseList.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.expanseCategory}</td>
              <td className="border p-2 text-right">
                {parseFloat(item.ProbableExpanse).toLocaleString()}৳
              </td>
              <td className="border p-2 flex space-x-2 justify-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-white text-base px-2 py-1 rounded"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-white text-base px-2 py-1 rounded"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100">
            <td colSpan="2" className="border px-2 py-1 text-center">Total</td>
            <td className="border px-2 py-1 text-right">
              {totalProbableExpanse.toLocaleString()}৳
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProbableExpanse;
