import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import EntryFeeForm from "./EntryFee";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const AdvocateFees = () => {
  const { state } = useLocation();
  const FeeData = state?.FeeData;
  let isEditMode = Boolean(FeeData);
  const [phone, setPhone] = useState("");
  const[total, setTotal] = useState("");


  const [formData, setFormData] = useState({
    // basic info
    collection_date: new Date().toISOString().split("T")[0],
    advocate_id: "",

    // House Rent
    house_fee_form: false,
    from_month: "",
    from_year: "",
    to_month: "",
    to_year: "",
    rent_type: "House",
    building_name: "",
    floor: "",
    room: "",
    rent_amount: "",
    payment_type: "Cash",
    remarks1: "",

    // Entry Fee
    entry_fee_form: false,
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
  const [suggestions2, setSuggestions2] = useState([]);



  useEffect(() => {
  if (isEditMode && FeeData) {
    const rent = FeeData.rentcollection_set?.[0] || {};
    const entry = FeeData.entryfee_set?.[0] || {};
    const monthly = FeeData.monthlyfee_set?.[0] || {};
    const bar = FeeData.barassociationfee_set?.[0] || {};
    setShowEntryForm(FeeData.entryfee_set);

    setFormData({
        collection_date: FeeData.collection_date || new Date().toISOString().split("T")[0],
        advocate_id: FeeData.advocate_id || "",

        // House Rent
        house_fee_form: !FeeData.rentcollection_set?.length,
        from_month: rent.from_month || "",
        from_year: rent.from_year || "",
        to_month: rent.to_month || "",
        to_year: rent.to_year || "",
        rent_type: rent.rent_type || "House",
        building_name: rent.building_name || "",
        floor: rent.floor || "",
        room: rent.room || "",
        rent_amount: rent.rent_amount || "",
        payment_type: rent.payment_type || "Cash",
        remarks1: rent.remarks1 || "",

        // Entry Fee
        entry_fee_form: FeeData.entryfee_set?.length,
        entry_fee: entry.entry_fee || "",
        Entry_payment_type: entry.payment_type || "Cash",
        remarks4: entry.remarks4 || "",

        // Monthly Fee
        monthly_fee_form: FeeData.monthlyfee_set?.length,
        from_month: monthly.from_month || new Date().getMonth() + 1,
        from_year: monthly.from_year || new Date().getFullYear(),
        to_month: monthly.to_month || new Date().getMonth() + 1,
        to_year: monthly.to_year || new Date().getFullYear(),
        monthly_fee: monthly.monthly_fee || "",
        total_monthly_amount: monthly.total_monthly_amount || "",
        monthly_payment_type: monthly.payment_type || "cash",
        remarks2: monthly.remarks2 || "",

        // Bar Association Fee
        bar_association_form: FeeData.barassociationfee_set?.length,
        yearly_from_year: bar.yearly_from_year || new Date().getFullYear(),
        yearly_to_year: bar.yearly_to_year || new Date().getFullYear(),
        yearly_fee: bar.yearly_fee || "",
        yearly_delay_fee: bar.yearly_delay_fee || "",
        benevolent_fund_fee: bar.benevolent_fund_fee || "",
        benevolent_delay_fee: bar.benevolent_delay_fee || "",
        relief_fund_fee: bar.relief_fund_fee || "",
        total_amount: bar.total_amount || "",
        yearly_payment_type: bar.payment_type || "Cash",
        court_type: bar.court_type || "L/C",
        remarks3: bar.remarks3 || "",
      });
    }
  }, [isEditMode, FeeData]);

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
          adv.bar_registration_number
            .toLowerCase()
            .includes(value.toLowerCase())
        );
        setSuggestions(matches);
      }
    }

    else if (name === "phone") {
      if (value.trim() === "") {
        setSuggestions2([]);
      }else{
      setPhone(value)
      const matches = advocates.filter((adv) =>
        adv.phone.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions2(matches);
     }
    }

    // Auto-fill advocate info when exact id is selected
    const matchedAdvocate = advocates.find(
      (adv) => adv.bar_registration_number === value
    );
    if (matchedAdvocate) {
      setFormData((prev) => ({
        ...prev,
        advocate_id: matchedAdvocate.bar_registration_number,

      }));
      setPhone(matchedAdvocate.phone)
      setSuggestions([]); // hide suggestions
    }

    console.log("matchedAdvocate", matchedAdvocate)


    // Auto-fill advocate info when exact Phone number is selected
    const matchedAdvocate2 = advocates.find(
      (adv) => adv.phone === value
    );
    if (matchedAdvocate2) {
      setFormData((prev) => ({
        ...prev,
        advocate_id: matchedAdvocate2.bar_registration_number,
      }));
       setPhone(matchedAdvocate2.phone)
      setSuggestions2([]); // hide suggestions
    }
  };

  const handleSuggestionClick = (bar_registration_number,phone) => {
    setFormData((prev) => ({
      ...prev,
      advocate_id: bar_registration_number,
    }));
    setPhone(phone)
    setSuggestions([]);
    setSuggestions2([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      advocate_id: formData.advocate_id,
      collection_date: formData.collection_date,
    };

    if (formData.month && formData.rent_amount) {
      payload.house_fee_form = true;
      payload.rentcollection_set = [
        {
          from_month: formData.from_month,
          from_year: formData.from_year,
          to_month: formData.to_month,
          to_year: formData.to_year,
          rent_type: formData.rent_type,
          building_name: formData.building_name,
          floor: formData.floor,
          room: formData.room,
          rent_amount: formData.rent_amount,
          payment_type: formData.payment_type,
          remarks1: formData.remarks1,
        },
      ];
    }

    if (formData.entry_fee_form && formData.entry_fee) {
      payload.entry_fee_form = true;
      payload.entryfee_set = [
        {
          entry_fee: formData.entry_fee,
          payment_type: formData.Entry_payment_type,
          remarks4: formData.remarks4,
        },
      ];
    }

    if (formData.monthly_fee && formData.total_monthly_amount) {
      payload.monthly_fee_form = true;
      payload.monthlyfee_set = [
        {
          from_month: formData.from_month,
          from_year: formData.from_year,
          to_month: formData.to_month,
          to_year: formData.to_year,
          monthly_fee: formData.monthly_fee,
          payment_type: formData.monthly_payment_type,
          total_monthly_amount: formData.total_monthly_amount,
          remarks2: formData.remarks2,
        },
      ];
    }

    if (formData.yearly_fee && formData.total_amount) {
      payload.bar_association_form = true;
      payload.barassociationfee_set = [
        {
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
          remarks3: formData.remarks3,
        },
      ];
    }

    console.log("payload", payload);

    try {
      let response;
      if (isEditMode ) {
            response = await AxiosInstance.put(`advocate-all-fees/${FeeData.id}/`, payload);
            console.log("Form updated successfully:", response.data);
            alert("Form updated successfully!");
      }else{
            response = await AxiosInstance.post("advocate-all-fees/", payload);
            alert("Data saved successfully!");
      }
      
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
      from_month: "",
      from_year: "",
      to_month: "",
      to_year: "",
      rent_type: "",
      building_name: "",
      floor: "",
      room: "",
      rent_amount: "",
      payment_type: "",
      remarks1: "",

      // Entry Fee
      entry_fee_form: false,
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



  const calculateGrandTotal = (data) => {
    const getNumber = (value) => parseFloat(value) || 0;

    return (
      getNumber(data.rent_amount) +
      getNumber(data.entry_fee) +
      getNumber(data.total_monthly_amount) +
      getNumber(data.total_amount) );
  };


  useEffect(() => {
    const total = calculateGrandTotal(formData);
    setTotal(total);

  }, [
    formData.rent_amount,
    formData.entry_fee,
    formData.total_monthly_amount,
    formData.total_amount]
  );




  const calculateTotal = () => {
    const toNum = (val) => parseFloat(val) || 0;

    return (
      toNum(formData.yearly_fee) +
      toNum(formData.yearly_delay_fee) +
      toNum(formData.benevolent_fund_fee) +
      toNum(formData.benevolent_delay_fee) +
      toNum(formData.relief_fund_fee)
    );
  };

  useEffect(() => {
    const total = calculateTotal();
    setFormData((prev) => ({
      ...prev,
      total_amount: total
    }));
  }, [
    formData.yearly_fee,
    formData.yearly_delay_fee,
    formData.benevolent_fund_fee,
    formData.benevolent_delay_fee,
    formData.relief_fund_fee
  ]);


  return (
    <div className="container mx-auto p-4 px-8 font-serif">
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
          <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
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


            <div className="">
                <label className="block text-gray-700 text-sm font-bold">
                  Grand Total
                </label>
                <input
                  type="text"
                  value={total}
                  className="shadow font-semibold appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled
                />
              </div>

            {/* Advocate ID (typeable & selectable) */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-semibold">
                Advocate ID <span className="text-red-500">*</span>
              </label>

               <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    name="advocate_id"
                    value={formData.advocate_id}
                    onChange={handleChange}
                    className="shadow  pl-8 pr-2 border border-gray-400  bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type or select advocate ID"
                    required
                  />
              </div>
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-400 border  mt-1 w-full max-h-40 overflow-y-auto shadow-md rounded">
                  {suggestions.map((adv) => (
                    <li
                      key={adv.id}
                      onClick={() =>
                        handleSuggestionClick(
                          adv.bar_registration_number,
                          adv.phone
                        )
                      }
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      {adv.bar_registration_number}
                    </li>
                  ))}
                </ul>
              )}
            </div>


            {/* Advocate Phone Number (typeable & selectable) */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-semibold">
                Advocate Phone<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  className="shadow  pl-8 pr-2 appearance-none border border-gray-400  bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Type or select Phone number"
                  autoComplete="off"
                  required
                />
              </div>
              {suggestions2.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-400 border  mt-1 w-full max-h-40 overflow-y-auto shadow-md rounded">
                  {suggestions2.map((adv) => (
                    <li
                      key={adv.id}
                      onClick={() =>
                        handleSuggestionClick(
                          adv.bar_registration_number,
                          adv.phone
                        )
                      }
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      {adv.phone}
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
                    value={selectedAdvocate.name_english}
                    readOnly
                    className="bg-sky-50 border border-gray-400 rounded  px-2"
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
                    className="bg-sky-50 border border-gray-400 rounded  px-2"
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
                    className="bg-sky-50 border border-gray-400 rounded  px-2"
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
                From Month
              </label>
              <select
                name="from_month"
                value={formData.from_month}
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
                From Year
              </label>
              <select
                name="from_year"
                value={formData.from_year}
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
                To Year
              </label>
              <select
                name="to_year"
                value={formData.to_year}
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
              onClose={() => setShowEntryForm(true)}
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
                  className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 font-semibold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
