import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [positionInput, setPositionInput] = useState("");
  const [editId, setEditId] = useState(null);


  const fetchPositions = async () => {
    try {
        const response = await AxiosInstance.get("position-list/");
        setPositions(response.data); 
    } catch (error) {
        console.error("Error fetching positions:", error);
        alert("Error Fetching Positions Data");
    }
   };

  
   useEffect(() =>{
    fetchPositions();
   }, []);


   console.log(positions)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = positionInput.trim();
    if (!trimmed) return;

    const payload = { position: trimmed };

    try {
      if (editId !== null) {
        await AxiosInstance.put(`position-list/${editId}/`, payload);
        alert("Updated Successfully");
      } else {
        await AxiosInstance.post("position-list/", payload);
        alert("Added Successfully");
      }

      setPositionInput("");
      setEditId(null);
      fetchPositions(); // Refresh list
    } catch (err) {
      console.error("Error saving position:", err);
      alert("Error saving position !");
    }
  };

  // Edit handler
  const handleEdit = (pos) => {
    setPositionInput(pos.position);
    setEditId(pos.id);
  };


  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`position-list/${editId}/`);
      setPositions(positions.filter((_, i) => i !== index));
    } catch (err) {
      setPositionInput("");
      setEditId(null);
      alert("Error in deleting building !");
    }
  };

 

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Commitee Position</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={positionInput}
          onChange={(e) => setPositionInput(e.target.value)}
          placeholder="Enter position name"
          className="flex-1 p-2 border border-gray-400 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          { editId !== null ? "Update" : "Add"}
        </button>
      </form>

      <table className="min-w-full bg-white border text-sm rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">SL</th>
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.length === 0 ? (
            <tr>
              <td className="p-2 border text-center" colSpan={3}>
                No positions added yet.
              </td>
            </tr>
          ) : (
            positions.map((pos, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{pos.position}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(pos)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PositionList;
