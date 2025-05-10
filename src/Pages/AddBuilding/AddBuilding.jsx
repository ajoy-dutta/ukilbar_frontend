import React, { useState } from "react";
 import axiosInstance from "../../Components/AxiosInstance";

const AddBuilding = () => {
  const [buildingName, setBuildingName] = useState("");
  const [remarks, setRemarks] = useState("");
    const [institution, setInstitution] = useState("");

  const [buildings, setBuildings] = useState([
    {
      id: 1,
      name: "জেলা আইনজীবী সমিতি ২ নং ভবন",
      remarks: "",
      institution: "JASHORE DISTRICT BAR ASSOCIATION",
    },
    {
      id: 2,
      name: "জেলা আইনজীবী সমিতি ১ নং ভবন",
      remarks: "",
      institution: "JASHORE DISTRICT BAR ASSOCIATION",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBuilding = {
      name: buildingName,
      remarks: remarks,
      institution: "institution",
    };

    try {
      const res = await axiosInstance.post("/building", newBuilding);
      const savedBuilding = res.data;

      setBuildings([...buildings, savedBuilding]);
      setBuildingName("");
      setRemarks("");
    } catch (error) {
      console.error("Failed to save building:", error);
      alert("❌ বিল্ডিং সংরক্ষণ ব্যর্থ হয়েছে");
    }
  };

  const handleDelete = (id) => {
    setBuildings(buildings.filter((b) => b.id !== id));
  };

  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-xl text-center font-semibold mb-4">Building Info</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded-md shadow mb-6">
        <input
          type="text"
          placeholder="Building Name"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
          required
        />
           <input
          type="text"
          placeholder="Institution Name"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setBuildingName("");
            setRemarks("");
          }}
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
              <th className="border p-2">Remarks</th>
              <th className="border p-2">Institution Name</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((b) => (
              <tr key={b.id}>
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.remarks}</td>
                <td className="border p-2">{b.institution}</td>
                <td className="border p-2 flex space-x-2 justify-center">
                  <button className="hover:bg-blue-900 text-white px-1 py-1 rounded">✏️</button>
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
