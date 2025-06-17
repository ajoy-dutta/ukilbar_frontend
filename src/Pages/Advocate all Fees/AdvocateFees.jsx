import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";
import { useNavigate , Link, useLocation} from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import EntryFeeForm from "./EntryFee";

const AdvocateFees = () => {
  const { state } = useLocation();
  const advocateData = state?.advocateData;
  let isEditMode = Boolean(advocateData);

  const [formData, setFormData] = useState({
    // basic info
    collection_date: new Date().toISOString().split("T")[0],
    advocate_id: "",

    // House Rent
    house_fee_form: false,
    month: "",
    year: "",
    rent_type: "House",
    building_name: "",
    floor: "",
    room: "",
    rent_amount: "",
    payment_type: "Cash",
    remarks1: "",

    // Entry Fee
    entry_fee_form: false,
    receipt_no: "",
    entry_fee: "",
    Entry_payment_type: "Cash",
    remarks4: "",

    // Monthly Fee
    monthly_fee_form: false,
    from_month: new Date().getMonth() + 1,
    from_year: new Date().getFullYear(),
    to_month: new Date().getMonth() + 1,
    to_year: new Date().getFullYear(),
    monthly_fee: "",
    total_monthly_amount: "",
    monthly_payment_type: "cash",
    remarks2: "",

    // Yearly Fee
    bar_association_form: false,
    yearly_from_year: new Date().getFullYear(),
    yearly_to_year: new Date().getFullYear(),
    yearly_fee: "",
    yearly_delay_fee: "",
    benevolent_fund_fee: "",
    benevolent_delay_fee: "",
    yearly_payment_type: "Cash",
    relief_fund_fee: "",
    total_amount: "",
    court_type: "L/C",
    remarks3: "",
  });

  const [buildings, setBuildings] = useState([]);
  const [renters, setRenters] = useState([]);
  const [advocates, setAdvocates] = useState([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);
  const navigate = useNavigate();
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 2050 - 2010 + 1 }, (_, i) => 2010 + i);

  // Fething the Buildings
  useEffect(() => {
    const fetchbuildings = async () => {
      try {
        const response = await AxiosInstance.get("buildings/");
        setBuildings(response.data);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchbuildings();
  }, []);

  // Fething the Advocates
  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await AxiosInstance.get("advocates/");
        setAdvocates(response.data);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchAdvocates();
  }, []);

  useEffect(() => {
    const selected = advocates.find(
      (a) => String(a.bar_registration_number) === String(formData.advocate_id)
    );
    setSelectedAdvocate(selected || null);
  }, [formData.advocate_id, advocates]);

  

  console.log("selectedAdvocate", selectedAdvocate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // For advocate_id, filter matching suggestions
     if (name === "advocate_id") {
        if (value.trim() === "") {
            setSuggestions([]);
        } else {
            const matches = advocates.filter((adv) =>
            adv.bar_registration_number.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(matches);
        }
    }
    // Auto-fill advocate name when exact match is selected
    const matchedAdv = advocates.find(
      (adv) => adv.bar_registration_number === value
    );
    if (matchedAdv) {
      setFormData((prev) => ({
        ...prev,
        advocate_id: matchedAdv.bar_registration_number,
      }));
      setSuggestions([]); // hide suggestions
    }
  };

  const handleSuggestionClick = (bar_registration_number, name) => {
        setFormData((prev) => ({
        ...prev,
        advocate_id: bar_registration_number,
        }));
        setSuggestions([]);
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};

    if (formData.month && formData.rent_amount) {
      payload.house_fee_form = true;
      payload.house_rent = {
        collection_date: formData.collection_date,
        advocate_id: formData.advocate_id,
        month: formData.month,
        year: formData.year,
        rent_type: formData.rent_type,
        building_name: formData.building_name,
        floor: formData.floor,
        room: formData.room,
        rent_amount: formData.rent_amount,
        payment_type: formData.payment_type,
        remarks: formData.remarks1,
      };
    }

    if (formData.entry_fee_form && formData.entry_fee) {
      payload.entry_fee_form = true;
      payload.Entry_Fee = {
        collection_date: formData.collection_date,
        advocate_id: formData.advocate_id,
        entry_fee: formData.entry_fee,
        payment_type: formData.Entry_payment_type,
        remarks4: formData.remarks4,
      };
    }

    if (formData.monthly_fee && formData.total_monthly_amount) {
      payload.monthly_fee_form = true;
      payload.monthly_fee = {
        collection_date: formData.collection_date,
        advocate_id: formData.advocate_id,
        from_month: formData.from_month,
        from_year: formData.from_year,
        to_month: formData.to_month,
        to_year: formData.to_year,
        monthly_fee: formData.monthly_fee,
        payment_type: formData.monthly_payment_type,
        total_monthly_amount: formData.total_monthly_amount,
        remarks: formData.remarks2,
      };
    }

    if (formData.yearly_fee && formData.total_amount) {
      payload.bar_association_form = true;
      payload.bar_association_fee = {
        collection_date: formData.collection_date,
        advocate_id: formData.advocate_id,
        yearly_from_year: formData.yearly_from_year,
        yearly_to_year: formData.yearly_to_year,
        yearly_fee: formData.yearly_fee || 0,
        yearly_delay_fee: formData.yearly_delay_fee || 0,
        benevolent_fund_fee: formData.benevolent_fund_fee || 0,
        benevolent_delay_fee: formData.benevolent_delay_fee || 0,
        relief_fund_fee: formData.relief_fund_fee || 0,
        total_amount: formData.total_amount || 0,
        payment_type: formData.yearly_payment_type,
        court_type: formData.court_type,
        remarks: formData.remarks3,
      };
    }

    console.log("payload", payload);

    try {
      const response = await AxiosInstance.post("advocate-all-fees/", payload);
      alert("Data saved successfully!");
      handleClear();
    } catch (error) {
      console.error("Error submitting rent collection:", error);
      alert(
        "Failed to submit rent collection: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleClear = () => {
    setFormData({
      collection_date: new Date().toISOString().split("T")[0],
      advocate_id: "",

      // House Rent
      house_fee_form: false,
      month: "",
      year: "",
      rent_type: "",
      building_name: "",
      floor: "",
      room: "",
      rent_amount: "",
      payment_type: "",
      remarks1: "",

      // Entry Fee
      entry_fee_form: false,
      receipt_no: "",
      entry_fee: "",
      Entry_payment_type: "",
      remarks4: "",

      // Monthly Fee
      monthly_fee_form: false,
      from_month: new Date().getMonth() + 1,
      from_year: new Date().getFullYear(),
      to_month: new Date().getMonth() + 1,
      to_year: new Date().getFullYear(),
      monthly_fee: "",
      total_monthly_amount: "",
      monthly_payment_type: "",
      monthly_payment_type: "cash",
      remarks2: "",

      // Bar Association Fee
      bar_association_form: false,
      yearly_from_year: new Date().getFullYear(),
      yearly_to_year: new Date().getFullYear(),
      yearly_fee: "",
      yearly_delay_fee: "",
      benevolent_fund_fee: "",
      benevolent_delay_fee: "",
      relief_fund_fee: "",
      total_amount: "",
      yearly_payment_type: "",
      court_type: "",
      remarks3: "",
    });
  };



  

  return (
    <div className="container mx-auto p-4 px-8 ">

      <div className="mb-4 flex flex-row justify-between">
        <h1 className="font-bold text-lg px-4">
        {isEditMode ? "Edit Fee" : "Add A New Fee"}
        </h1>
        <Link to="/dashboard/advocate-all-fee-list">
        <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">
            Go to List
        </h2>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded sm:px-2 lg:px-6 pt-6 pb-8 mb-4 border border-blue-200"
      >
        <div className="mb-2">
          <h1 className="text-lg text-sky-900 text-center font-semibold mb-4">
            Basic Info
          </h1>
          {/* Collection Date */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="">
              <label className="block text-gray-700 text-sm font-semibold">
                Collection Date
              </label>
              <input
                type="date"
                name="collection_date"
                value={formData.collection_date}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>


           
            {/* Advocate ID (typeable & selectable) */}
            <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold">
                    Advocate ID <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="advocate_id"
                    value={formData.advocate_id}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-400  bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type or select advocate ID"
                    autoComplete="off"
                    required
                />
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-400 border  mt-1 w-full max-h-40 overflow-y-auto shadow-md rounded">
                    {suggestions.map((adv) => (
                        <li
                        key={adv.id}
                        onClick={() => handleSuggestionClick(adv.bar_registration_number, adv.name_english)}
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                        >
                        {adv.bar_registration_number} 
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            {selectedAdvocate && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Advocate Name
                  </label>
                  <input
                    type="text"
                    value={selectedAdvocate.name_bengali}
                    readOnly
                    className="bg-sky-50 border border-gray-400 rounded py-1 px-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    value={selectedAdvocate.father_name}
                    readOnly
                    className="bg-sky-50 border border-gray-400 rounded py-1 px-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enrollment Date
                  </label>
                  <input
                    type="text"
                    value={selectedAdvocate.enrollment_date_As_member}
                    readOnly
                    className="bg-sky-50 border border-gray-400 rounded py-1 px-3"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border-t-2 border-gray-200 pt-6 mb-2">
          <h1 className="text-lg text-sky-900 text-center font-semibold mb-4">
            House/Shop/Billboard Rent
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Month and Year */}
            <div className="">
              <label className="block text-gray-700 text-sm font-semibold ">
                Month
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label className="block text-gray-700 text-sm font-semibold ">
                Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="">
              <label className="block text-gray-700 text-sm font-semibold ">
                House/Shop/Billboard
              </label>
              <select
                name="rent_type"
                value={formData.rent_type}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="House">House</option>
                <option value="Shop">Shop</option>
                <option value="Billboard">Billboard</option>
              </select>
            </div>

            {/* Building */}
            <div className="">
              <label className="block text-gray-700 text-sm font-semibold ">
                Building
              </label>
              <select
                name="building_name"
                value={formData.building_name}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Building</option>
                {buildings.map((building) => (
                  <option key={building.id} value={building.building_name}>
                    {building.building_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Floor and Room */}
            <div className="">
              <label className="block text-gray-700 text-sm font-semibold ">
                Floor No
              </label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className=" border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="">
              <label className="block text-gray-700 text-sm font-semibold ">
                Room No
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Amount and Payment Type */}
            <div className="">
              <label className="block text-gray-700 text-sm font-semibold ">
                Amount
              </label>
              <input
                type="number"
                name="rent_amount"
                value={formData.rent_amount}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400  bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-0">
              <label className="block text-gray-700 text-sm font-semibold ">
                Payment Type
              </label>
              <select
                name="payment_type"
                value={formData.payment_type}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 rounded bg-sky-50 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
                <option value="check">Check</option>
                <option value="mobile_banking">Mobile Banking</option>
              </select>
            </div>

            {/* Remarks */}
            <div className="">
              <label className="block text-gray-700 text-sm font-semibold ">
                Remarks
              </label>
              <textarea
                name="remarks1"
                value={formData.remarks1}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 h-12 rounded bg-sky-50 w-full px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Entry Fee Section */}
        <div className="mb-6">
          <button
            type="button"
            className="text-sm px-4 py-2 mb-2 rounded-lg bg-sky-900 text-white flex items-center gap-2"
            onClick={() => {
              setShowEntryForm(!showEntryForm);
              setFormData((prev) => ({
                ...prev,
                entry_fee_form: !prev.entry_fee_form,
              }));
            }}
          >
            {formData.entry_fee_form ? "Remove Entry Fee" : "Add Entry Fee "}
            <FaArrowRight />
          </button>

          {showEntryForm && (
            <EntryFeeForm
              formData={formData}
              handleChange={handleChange}
              onClose={() => setShowEntryForm(false)}
            />
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              monthly_fee_form: !prev.monthly_fee_form,
            }))
          }
          className="text-sm px-4 py-2 rounded-lg bg-sky-900 text-white flex items-center gap-2"
        >
          {formData.monthly_fee_form ? "Remove Monthly Fee" : "Add Monthly Fee"}
          <FaArrowRight />
        </button>
        <br />

        {/* Monthly Fee Section */}
        {formData.monthly_fee_form && (
          <div className="border-t-2 border-gray-200 pt-4">
            <h2 className="text-lg text-sky-900 font-semibold mb-4 text-center">
              Monthly Fee
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  From Month
                </label>
                <select
                  name="from_month"
                  value={formData.from_month}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  From Year
                </label>
                <select
                  name="from_year"
                  value={formData.from_year}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  To Month
                </label>
                <select
                  name="to_month"
                  value={formData.to_month}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  To Year
                </label>
                <select
                  name="to_year"
                  value={formData.to_year}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Monthly fee
                </label>
                <input
                  type="number"
                  name="monthly_fee"
                  value={formData.monthly_fee}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Total Amount
                </label>
                <input
                  type="number"
                  name="total_monthly_amount"
                  value={formData.total_monthly_amount}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Payment Type
                </label>
                <select
                  name="monthly_payment_type"
                  value={formData.monthly_payment_type}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 rounded bg-sky-50 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="cash">Cash</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="check">Check</option>
                  <option value="mobile_banking">Mobile Banking</option>
                </select>
              </div>

              {/* Remarks */}
              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Remarks
                </label>
                <textarea
                  name="remarks2"
                  value={formData.remarks2}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400  h-12 rounded bg-sky-50 w-full px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              bar_association_form: !prev.bar_association_form,
            }))
          }
          className="text-sm px-4 py-2 mb-2 rounded-lg bg-sky-900 text-white flex items-center gap-2"
        >
          {formData.bar_association_form
            ? "Remove Bar Association Fee"
            : "Add Bar Association Fee"}
          <FaArrowRight />
        </button>

        {formData.bar_association_form && (
          <div className="border-t-2 border-gray-200 pt-6 mb-2">
            <h2 className="text-lg text-sky-900 font-semibold mb-4 text-center">
              Bar Association Fee
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  From Year
                </label>
                <select
                  name="yearly_from_year"
                  value={formData.yearly_from_year}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  To Year
                </label>
                <select
                  name="yearly_to_year"
                  value={formData.yearly_to_year}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Yearly fee
                </label>
                <input
                  type="number"
                  name="yearly_fee"
                  value={formData.yearly_fee}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Delay fee (Yearly)
                </label>
                <input
                  type="number"
                  name="yearly_delay_fee"
                  value={formData.yearly_delay_fee}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Benevolent Fee
                </label>
                <input
                  type="number"
                  name="benevolent_fund_fee"
                  value={formData.benevolent_fund_fee}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Delay Fee (Benevolent)
                </label>
                <input
                  type="number"
                  name="benevolent_delay_fee"
                  value={formData.benevolent_delay_fee}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Relief Fund Donation
                </label>
                <input
                  type="number"
                  name="relief_fund_fee"
                  value={formData.relief_fund_fee}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Total Amount
                </label>
                <input
                  type="number"
                  name="total_amount"
                  value={formData.total_amount}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-0">
                <label className="block text-gray-700 text-sm font-semibold ">
                    Payment Type
                </label>
                <select
                    name="yearly_payment_type"
                    value={formData.yearly_payment_type}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-400 rounded bg-sky-50 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="cash">Cash</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="check">Check</option>
                    <option value="mobile_banking">Mobile Banking</option>
                </select>
                </div>


              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Court Type
                </label>
                <select
                  name="court_type"
                  value={formData.court_type}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 rounded bg-sky-50 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="L/C">L/C</option>
                  <option value="H/C">H/C</option>
                </select>
              </div>

              {/* Remarks */}
              <div className="">
                <label className="block text-gray-700 text-sm font-semibold ">
                  Remarks
                </label>
                <textarea
                  name="remarks3"
                  value={formData.remarks3}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-400 h-12 rounded bg-sky-50 w-full px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-end pt-2 gap-2">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-900 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => handleClear()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvocateFees;
