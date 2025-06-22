import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";
import PositionList from "./PositionList";

const Add_Commitee = () => {
  const [advocates, setAdvocates] = useState([]);
  const [committeeList, setCommitteeList] = useState([]);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    bar_registration_number: "",
    name: "",
    phone: "",
    committee_position: "",
  });

  const [committeeOptions, setCommitteOptions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const years = Array.from(
    { length: 11 },
    (_, i) => new Date().getFullYear() - i
  );

  const fetchPositionList = async () => {
    try {
      const response = await AxiosInstance.get("position-list/");
      setCommitteOptions(response.data);
    } catch (error) {
      console.error("Error fetching positionData:", error);
    }
  };

  const fetchAdvocates = async () => {
    try {
      const response = await AxiosInstance.get("advocates/");
      setAdvocates(response.data);
    } catch (error) {
      console.error("Error fetching advocates:", error);
    }
  };

  const fetchCommitteeList = async () => {
    try {
      const response = await AxiosInstance.get("committees/");
      const filtered = response.data.filter(
        (item) => item.year === formData.year
      );
      setCommitteeList(filtered);
    } catch (error) {
      console.error("Error fetching committee list:", error);
    }
  };

  useEffect(() => {
    fetchCommitteeList();
  }, [formData.year]);

  useEffect(() => {
    fetchPositionList();
    fetchAdvocates();
  }, []);

  const handleAutoFill = (field, value) => {
    let selected = null;
    if (field === "bar_registration_number") {
      selected = advocates.find((adv) => adv.bar_registration_number === value);
    } else if (field === "phone") {
      selected = advocates.find((adv) => adv.phone === value);
    }

    if (selected) {
      setFormData({
        ...formData,
        bar_registration_number: selected.bar_registration_number,
        name: selected.name_bengali,
        phone: selected.phone,
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bar_registration_number" || name === "phone") {
      handleAutoFill(name, value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await AxiosInstance.put(`committees/${editId}/`, formData);
        alert("Committee member updated successfully!");
      } else {
        const res = await AxiosInstance.post("committees/", formData);
        alert("Committee member added successfully!");
      }

      setFormData({
        year: new Date().getFullYear(),
        bar_registration_number: "",
        name: "",
        phone: "",
        committee_position: "",
      });
      setEditId(null);
      fetchCommitteeList();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error submitting form");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`committees/${id}/`);
      fetchCommitteeList();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="p-4 px-4 md:px-12 bg-white rounded shadow ">
      <h2 className="text-lg font-semibold mb-2">Committee Members List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">SL</th>
              <th className="border px-2 py-1">Year</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Bar No.</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Position</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {committeeList.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1 text-center">{index + 1}</td>
                <td className="border px-2 py-1 text-center">{item.year}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">
                  {item.bar_registration_number}
                </td>
                <td className="border px-2 py-1">{item.phone}</td>
                <td className="border px-2 py-1">{item.committee_position}</td>
                <td className="border px-2 py-1 text-center space-x-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="relative z-10 mt-4">
        {/* Trigger Button */}
        <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 mb-2"
        >
            Config Committee
        </button>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg w-full max-w-lg p-4 relative border">
                <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-xl"
                >
                ×
                </button>
                <PositionList />
            </div>
            </div>
        )}
        </div>


        <hr className="my-6" />

      
      <div className="p-4 max-w-4xl mx-auto bg-white rounded shadow border border-gray-600">
        <h2 className="text-lg font-semibold mb-4">Add Committee Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 text-sm md:text-base md:grid-cols-3 gap-3 mb-4">
            {/* Year */}
            <div>
              <label className="block mb-1 font-medium">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border px-3 py-1 rounded border border-gray-600"
              >
                <option value="" disabled>
                  Select Year
                </option>
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Committee Category */}
            <div>
              <label className="block mb-1 font-medium">
                Committee Category
              </label>
              <select
                name="committee_position"
                value={formData.committee_position}
                onChange={handleChange}
                className="w-full border px-3 py-1 rounded border border-gray-600"
              >
                <option value="" disabled>
                  Select Committee Position
                </option>
                {committeeOptions.map((item, i) => (
                  <option key={i}>{item.position}</option>
                ))}
              </select>
            </div>

            {/* Bar Registration Number */}
            <div>
              <label className="block mb-1 font-medium">
                Bar Registration Number
              </label>
              <input
                name="bar_registration_number"
                list="bar_list"
                value={formData.bar_registration_number}
                onChange={handleChange}
                placeholder="Enter or select registration no."
                className="w-full border px-3 py-1 rounded border border-gray-600"
              />
              <datalist id="bar_list">
                {advocates.map((adv) => (
                  <option key={adv.id} value={adv.bar_registration_number} />
                ))}
              </datalist>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                name="phone"
                list="phone_list"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter or select phone number"
                className="w-full border px-3 py-1 rounded border border-gray-600"
              />
              <datalist id="phone_list">
                {advocates.map((adv) => (
                  <option key={adv.id} value={adv.phone} />
                ))}
              </datalist>
            </div>

            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Auto-filled from selection"
                className="w-full border px-3 py-1 rounded border border-gray-600"
                readOnly
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_Commitee;
