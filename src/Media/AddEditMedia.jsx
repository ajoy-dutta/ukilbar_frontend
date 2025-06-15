"use client";
import React, { useState, useEffect, useRef } from "react";
import AxiosInstance from "../Components/AxiosInstance";

export default function AddEditMedia() {
  const [formData, setFormData] = useState({
    image: null,
    caption: "",
    type: "general",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [mediaList, setMediaList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    try {
      const res = await AxiosInstance.get("gallery/");
      setMediaList(res.data.sort((a, b) => b.id - a.id));
    } catch (err) {
      console.error("Failed to fetch media:", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (formData.image) data.append("image", formData.image);
    data.append("caption", formData.caption);
    data.append("type", formData.type);

    try {
      if (editingId) {
        await AxiosInstance.put(`gallery/${editingId}/`, data);
        setSuccessMsg("Image updated successfully!");
      } else {
        await AxiosInstance.post("gallery/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMsg("Image uploaded successfully!");
      }

      setFormData({ image: null, caption: "", type: "general" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setEditingId(null);
      fetchMedia();
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ image: null, caption: item.caption, type: item.type });
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await AxiosInstance.delete(`gallery/${id}/`);
      setSuccessMsg("Deleted successfully");
      fetchMedia();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Edit Media" : "Add New Media"}
      </h2>
      {successMsg && <p className="text-green-600 mb-4 text-sm">{successMsg}</p>}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4 text-sm"
      >
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required={!editingId}
          />
          {editingId && (
            <div className="mt-2">
              <span className="text-gray-600 text-xs">Current Image:</span>
              <img
                src={mediaList.find((item) => item.id === editingId)?.image}
                alt="Current"
                className="w-24 h-16 object-cover rounded mt-1"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Caption</label>
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="general">General</option>
            <option value="paper-cut">Paper Cut</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          {editingId ? "Update" : "Upload"}
        </button>
      </form>

      {/* Media Table */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Media List</h3>
        <div className="overflow-x-auto text-sm">
          <table className="w-full border border-gray-300 text-left text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-1 py-1">#</th>
                <th className="border px-1 py-1">Image</th>
                <th className="border px-1 py-1 w-2/3">Caption</th>
                <th className="border px-1 py-1">Type</th>
                <th className="border px-1 py-1 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaList.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-1 py-1">{index + 1}</td>
                  <td className="border px-1 py-1">
                    <img
                      src={item.image}
                      alt="preview"
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="border px-1 py-1">
                    {item.caption || "No caption"}
                  </td>
                  <td className="border px-1 py-1">{item.type}</td>
                  <td className="border px-1 py-1 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="hover:bg-blue-800 text-white px-2 py-1 text-xs rounded mr-2"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="hover:bg-blue-800 text-white px-2 py-1 text-xs rounded"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
              {mediaList.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No media found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
