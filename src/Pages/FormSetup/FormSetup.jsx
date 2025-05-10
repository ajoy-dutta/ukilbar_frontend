import { useState } from "react";
import axiosInstance from "../../Components/AxiosInstance";

const FormSetup = () => {
  const [form_name, setFormName] = useState("");
  const [form_rate, setFormRate] = useState("");
  const [remarks, setRemarks] = useState("");

  const [forms, setForms] = useState([
    {
      id: 1,
      form_name: "xyz",
      remarks: "",
      form_rate: "good",
    },
    {
      id: 2,
      form_name: "fgdf",
      remarks: "",
      form_rate: "Jdd",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = {
      form_name,
      form_rate,
      remarks,
    };

    try {
      const res = await axiosInstance.post("/form", newForm);
      const savedForm = res.data;

      setForms([...forms, savedForm]);
      setFormName("");
      setFormRate("");
      setRemarks("");
    } catch (error) {
      console.error("Failed to save form:", error);
      alert("❌ ফর্ম সংরক্ষণ ব্যর্থ হয়েছে");
    }
  };

  const handleDelete = (id) => {
    setForms(forms.filter((f) => f.id !== id));
  };

  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-xl text-center font-semibold mb-4">Add Form</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded-md shadow mb-6">
        <input
          type="text"
          placeholder="Form Name"
          value={form_name}
          onChange={(e) => setFormName(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Form Rate"
          value={form_rate}
          onChange={(e) => setFormRate(e.target.value)}
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
            setFormName("");
            setFormRate("");
            setRemarks("");
          }}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </form>

      <div>
        <h3 className="text-lg font-medium mb-2">Form List</h3>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Form Name</th>
              <th className="border p-2">Remarks</th>
              <th className="border p-2">Form Rate</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((f) => (
              <tr key={f.id}>
                <td className="border p-2">{f.form_name}</td>
                <td className="border p-2">{f.remarks}</td>
                <td className="border p-2">{f.form_rate}</td>
                <td className="border p-2 flex space-x-2 justify-center">
                  <button className="hover:bg-blue-900 text-white px-1 py-1 rounded">✏️</button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="hover:bg-blue-900 text-white px-2 py-1 rounded"
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

export default FormSetup;
