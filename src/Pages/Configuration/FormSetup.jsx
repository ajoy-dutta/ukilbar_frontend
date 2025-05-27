import { useState,useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

const FormSetup = () => {
  const [forms, setForms] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    form_name:"",
    form_rate:"",
    remarks:"",
  });


  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await AxiosInstance.get("form/");
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms data:", error);
      }
    };

    fetchForms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const response = await AxiosInstance.put(`form/${editId}/`, formData);
        setForms(forms.map((f) => (f.id === editId ? response.data : f)));
        alert("ফর্ম হালনাগাদ হয়েছে");
      } else {
        const response = await AxiosInstance.post("form/", formData);
        setForms([...forms, response.data]);
        alert("ফর্ম সংরক্ষণ হয়েছে");
      }
      handleClear();
    } catch (error) {
      console.error("Failed to save form:", error);
      alert("সংরক্ষণ ব্যর্থ হয়েছে");
    }
  };


  const handleClear = () => {
    setFormData({
      form_name:"",
      form_rate:"",
      remarks:"",
    });
    setEditId(null);
  };

  const handleEdit = (form) => {
    setFormData({
      form_name: form.form_name,
      form_rate: form.form_rate,
      remarks: form.remarks,
    });
    setEditId(form.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`form/${id}/`);
      setForms(forms.filter(f => f.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("ফর্ম মুছে ফেলা যায়নি");
    }
  };


  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-xl text-center font-semibold mb-4">Add Form</h2>

     <form onSubmit={handleSubmit} className="border p-4 rounded-md shadow mb-6">
      <label htmlFor="form_name" className="block font-medium">Form Name</label>
      <input
        type="text"
        id="form_name"
        placeholder="Form Name"
        name="form_name"
        value={formData.form_name}
        onChange={handleChange}
        className="block w-full mb-2 px-2 py-1 border rounded"
        required
      />

      <label htmlFor="form_rate" className="block font-medium">Form Rate</label>
      <input
        type="text"
        id="form_rate"
        placeholder="Form Rate"
        name="form_rate"
        value={formData.form_rate}
        onChange={handleChange}
        className="block w-full mb-2 px-2 py-1 border rounded"
        required
      />

      <label htmlFor="remarks" className="block font-medium">Remarks</label>
      <textarea
        id="remarks"
        placeholder="Remarks"
        name="remarks"
        value={formData.remarks}
        onChange={handleChange}
        className="block w-full mb-2 px-2 py-1 border rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
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
        <h3 className="text-lg font-medium mb-2">Form List</h3>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
               <th className="border p-2 text-center">SL</th>
               <th className="border p-2 text-center">Form Name</th>
               <th className="border p-2">Form Rate</th>
              <th className="border p-2">Remarks</th> 
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((f,index) => (
              <tr key={f.id}>
                <td className="border p-2">{index+1}</td>
                <td className="border p-2 text-center">{f.form_name}</td>
                <td className="border p-2 text-right">{f.form_rate}</td>
                <td className="border p-2">{f.remarks}</td> 
                <td className="border p-2 flex space-x-2 justify-center">
                  <button 
                  onClick={(e) => handleEdit(f)}
                  className="hover:bg-blue-900 text-white px-1 py-1 rounded">
                    ✏️
                  </button>
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
