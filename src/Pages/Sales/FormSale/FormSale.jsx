import React from "react";
import { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import { Link } from "react-router-dom";

const FormSale = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [buildingOptions, setBuildingsOptions] = useState([]);
  const [formOptions, setFormOptions] = useState([]);

  const [formData, setFormData] = useState({
    receipt_no: "",
    sales_date: "",
    building_name: "",
    form_name: "",
    remarks: "",
    form_serials: Array(4)
      .fill()
      .map(() => ({
        from_serial: "",
        to_serial: "",
        total: "",
      })),
    total_count: "",
    price: "",
    total_amount: "",
  });

  useEffect(() => {
    const getBuildings = async (e) => {
      const response = await AxiosInstance.get("buildings/");
      setBuildingsOptions(response.data);
    };

    getBuildings();
  }, []);

  useEffect(() => {
    const getForms = async (e) => {
      const response = await AxiosInstance.get("form/");
      setFormOptions(response.data);
    };

    getForms();
  }, []);

  useEffect(() => {
    const price = parseFloat(formData.price) || 0;
    const total_amount = (price * formData.total_count).toFixed(2);
    setFormData((prev) => ({ ...prev, total_amount }));
  }, [formData.price, formData.total_count]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "form_name") {
      const parsedForm = JSON.parse(value);
      console.log("parsedForm", parsedForm.form_name);
      setFormData((prev) => ({
        ...prev,
        form_name: parsedForm.form_name,
        price: parsedForm.form_rate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSerialChange = (index, field, value) => {
    const updatedSerials = [...formData.form_serials];
    updatedSerials[index][field] = parseInt(value);

    if (field === "from_serial" || field === "to_serial") {
      const fromValue = parseInt(updatedSerials[index].from_serial) || 0;
      const toValue = parseInt(updatedSerials[index].to_serial) || 0;

      if (fromValue && toValue) {
        const total = Math.abs(toValue - fromValue) + 1;
        updatedSerials[index].total = total;
        formData.total_count += total;
      } else {
        updatedSerials[index].total = "";
      }
    }

    const newtotal_count = updatedSerials.reduce((sum, row) => {
      return sum + (parseInt(row.total) || 0);
    }, 0);

    setFormData({
      ...formData,
      form_serials: updatedSerials,
      total_count: newtotal_count,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredSerials = formData.form_serials.filter(
      (serial) => serial.from_serial && serial.to_serial && serial.total
    );

    const payload = {
      ...formData,
      price: selectedForm.price,
      form_serials: filteredSerials,
    };

    try {
      const response = await AxiosInstance.post("bailbond/", payload);
      console.log("Success:", response.data);
      alert("Submitted successfully!");
      handleClear();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Submission failed.");
    }
  };

  const handleClear = () => {
    setFormData({
      receipt_no: "",
      sales_date: "",
      building_name: "",
      remarks: "",
      form_serials: Array(4)
        .fill()
        .map(() => ({
          from_serial: "",
          to_serial: "",
          total: "",
        })),
      total_count: "",
      price: "",
      total_amount: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-md"
    >
      <div className="mb-4 flex flex-row justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-950  flex">Form Sales</h2>
        <div className="">
          <Link to="/dashboard/form-sale-list">
            <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">
              Go to List
            </h2>
          </Link>
        </div>
      </div>

      {/* Basic Info */}
      <div className="border rounded-md p-4 mb-4">
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Receipt No.
            </label>
            <input
              name="receipt_no"
              type="text"
              value={formData.receipt_no}
              onChange={handleChange}
              placeholder="Receipt No."
              className="border px-2  pr-10 rounded-md w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Sales Date</label>
            <input
              name="sales_date"
              type="date"
              value={formData.sales_date}
              onChange={handleChange}
              className="border px-2  rounded-md w-full bg-gray-100"
            />
          </div>

          {/* Building Name */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Building Name<span className="text-red-500"> *</span>
            </label>
            <select
              name="building_name"
              value={formData.building_name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
              required
            >
              <option value="">Select Building</option>
              {buildingOptions.map((building) => (
                <option key={building.id} value={building.building_name}>
                  {building.building_name}
                </option>
              ))}
            </select>
          </div>

          {/* Form Type Name */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Form Name<span className="text-red-500"> *</span>
            </label>
            <select
              name="form_name"
              value={formData.form_name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 rounded bg-sky-50"
              required
            >
              <option value="">Select Form</option>
              {formOptions.map((form) => (
                <option key={form.id} value={JSON.stringify(form)}>
                  {form.form_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Remarks</label>
            <input
              name="remarks"
              type="text"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks"
              className="border px-2  rounded-md w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Serial and Summary */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Vokalotnama Serial Section */}
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Bailbond Serial No.</h3>
          <div className="grid grid-cols-3 gap-3">
            {formData.form_serials.map((item, index) => (
              <React.Fragment key={index}>
                <input
                  type="number"
                  placeholder={index === 0 ? "From *" : "From"}
                  value={item.from_serial}
                  required={index === 0}
                  onChange={(e) =>
                    handleSerialChange(index, "from_serial", e.target.value)
                  }
                  className="border px-2 rounded-md w-full bg-gray-100"
                />
                <input
                  type="number"
                  placeholder={index === 0 ? "To *" : "To"}
                  value={item.to_serial}
                  required={index === 0}
                  onChange={(e) =>
                    handleSerialChange(index, "to_serial", e.target.value)
                  }
                  className="border px-2 rounded-md w-full bg-gray-100"
                />
                <input
                  type="number"
                  placeholder="Total"
                  value={item.total}
                  onChange={(e) =>
                    handleSerialChange(index, "total", e.target.value)
                  }
                  className="border px-2 rounded-md w-full bg-gray-100"
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Summary</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium">Total Count</label>
              <input
                name="total_count"
                type="text"
                value={formData.total_count}
                onChange={handleChange}
                placeholder="Total Count"
                className="border px-2 rounded-md w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                price <span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                type="text"
                value={FormData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border px-2 rounded-md w-full bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Total Amount <span className="text-red-500">*</span>
              </label>
              <input
                name="total_amount"
                type="text"
                value={formData.total_amount}
                onChange={handleChange}
                placeholder="Total Amount"
                className="border px-2 rounded-md w-full bg-gray-100"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white h-8 w-16 rounded-md"
        >
          Save
        </button>
        <button
          type="button" // Ensure it's type="button" and not type="reset"
          onClick={handleClear}
          className="bg-gray-300 text-black h-8 w-16 rounded-md"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormSale;
