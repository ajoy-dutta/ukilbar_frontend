import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../Components/AxiosInstance';

const RenewalModal = ({ show, onClose, associateId, isEdit = false, editData = null }) => {
  const [renewalData, setRenewalData] = useState({
    renewal_date: '',
    renewal_end_date: '',
    renewal_fee: '',
  });


  useEffect(() => {
    if (isEdit && editData) {
      setRenewalData({
        renewal_date: editData.renewal_date,
        renewal_end_date: editData.renewal_end_date,
        renewal_fee: editData.renewal_fee,
      });
    }
  }, [isEdit, editData]);

  const handleChange = (e) => {
    setRenewalData({ ...renewalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await AxiosInstance.put(`associate-renewal/${editData.id}/`, {
                ...renewalData,
                associate: associateId,
            });
        alert("Renewal updated!");
      } else {
        await AxiosInstance.post('associate-renewal/', {
                ...renewalData,
                associate: associateId,
            });
        alert("Renewal created!");
      }
      handleClear();
      onClose();
    } catch (error) {
      console.error("Failed to submit renewal", error);
    }
  };


  const handleClear = () => {
  setRenewalData({
    renewal_date: '',
    renewal_end_date: '',
    renewal_fee: ''
  });
};


  const handleDelete = async () => {
    if (!isEdit || !editData?.id) return;
    try {
      await AxiosInstance.delete(`associate-renewal/${editData.id}/`);
      alert("Renewal deleted!");
      onClose();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{isEdit ? "Edit" : "Renew"} Associate</h2>
        <div className="mb-2">
        <label htmlFor="renewal_date" className="block text-sm font-medium text-gray-800 mb-1">
            Renewal Date
        </label>
        <input
            type="date"
            id="renewal_date"
            name="renewal_date"
            value={renewalData.renewal_date}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
        />
        </div>

        <div className="mb-2">
        <label htmlFor="renewal_end_date" className="block text-sm font-medium text-gray-800 mb-1">
            Renewal End Date
        </label>
        <input
            type="date"
            id="renewal_end_date"
            name="renewal_end_date"
            value={renewalData.renewal_end_date}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
        />
        </div>

        <div className="mb-2">
        <label htmlFor="renewal_fee" className="block text-sm font-medium text-gray-800 mb-1">
            Renewal Fee
        </label>
        <input
            type="number"
            id="renewal_fee"
            name="renewal_fee"
            value={renewalData.renewal_fee}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            placeholder="Renewal Fee"
        />
        </div>

        <div className="flex justify-between">
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
            {isEdit ? "Update" : "Submit"}
          </button>
          {isEdit && (
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
              Delete
            </button>
          )}
          <button 
            onClick={() => {
                handleClear();
                onClose();
            }} 
            className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
        </button>
        </div>
      </div>
    </div>
  );
};

export default RenewalModal;
