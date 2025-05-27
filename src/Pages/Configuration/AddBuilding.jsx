import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

const AddBuilding = () => {
  const [formData, setFormData] = useState({
    building_name: "",
    institute: "",
    remarks: "",
  });
  const [buildinOptions, setBuildingOptions] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await AxiosInstance.get("buildings/");
        setBuildingOptions(response.data);
      } catch (error) {
        console.error("Error fetching building data:", error);
      }
    };

    fetchBuildings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await AxiosInstance.put(`buildings/${editId}/`,formData);
        setBuildingOptions(buildinOptions.map((b) => (b.id === editId ? response.data : b)));
        alert("Building Edited Successfully!");
      } else {
        const response = await AxiosInstance.post("buildings/", formData);
        setBuildingOptions([...buildinOptions, response.data]);
        alert("Building submitted Successfully!");
      }
      handleClear();
    } catch (error) {
      console.error("Failed to save building:", error);
      alert("❌ বিল্ডিং সংরক্ষণ ব্যর্থ হয়েছে");
    }
  };

  const handleClear = () => {
    setFormData({
      building_name: "",
      institute: "",
      remarks: "",
    });
    setEditId(null);
  };

  const handleEdit = (form) => {
    setFormData({
      building_name: form.building_name,
      institute: form.institute,
      remarks: form.remarks,
    });
    setEditId(form.id);
  };


  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`buildings/${id}/`);
      setBuildingOptions(buildinOptions.filter(b => b.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error in deleting building !");
    }
  };


  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-xl text-center font-semibold mb-4">Building Info</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded-md shadow mb-6"
      >
        <label className="block font-medium" htmlFor="building_name">
          Building Name
        </label>
        <input
          type="text"
          id="building_name"
          placeholder="Building Name"
          name="building_name"
          value={formData.building_name}
          onChange={handleChange}
          className="block w-full mb-2 px-2 py-1 border rounded"
          required
        />

        <label className="block font-medium" htmlFor="institute">
          Institution Name
        </label>
        <input
          type="text"
          id="institute"
          placeholder="Institution Name"
          name="institute"
          value={formData.institute}
          onChange={handleChange}
          className="block w-full mb-2 px-2 py-1 border rounded"
          required
        />

        <label className="block font-medium" htmlFor="remarks">
          Remarks
        </label>
        <textarea
          id="remarks"
          placeholder="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="block w-full mb-2 h-12 px-2 py-1 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => handleClear()}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </form>

      <div>
        <h3 className="text-lg font-medium mb-2">Building List</h3>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Building Name</th>
              <th className="border p-2">Institution Name</th>
              <th className="border p-2">Remarks</th>

              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {buildinOptions.map((b) => (
              <tr key={b.id} className="text-center">
                <td className="border p-2">{b.building_name}</td>
                <td className="border p-2">{b.institute}</td>
                <td className="border p-2">{b.remarks}</td>
                <td className="border p-2 flex space-x-2 justify-center">
                  <button 
                   onClick={(e) => handleEdit(b)}
                   className="hover:bg-blue-900 text-white px-1 py-1 rounded">
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className=" hover:bg-blue-900 text-white px-2 py-1 rounded"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddBuilding;
