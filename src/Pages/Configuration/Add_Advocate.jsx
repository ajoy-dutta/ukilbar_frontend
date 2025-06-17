import { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";
import { Link , useLocation} from "react-router-dom";


export const AddAdvocate = () => {
  const { state } = useLocation();
  const advocateData = state?.advocateData;
  let isEditMode = Boolean(advocateData);

  const [formData, setFormData] = useState({
    advocate_type: "",
    name_english: "",
    name_bengali: "",
    photo: null,
    father_name: "",
    mother_name: "",
    husband_or_wife_name: "",
    gender: "",
    marital_status: "",
    date_of_birth: "",
    nid_number: "",
    blood_group: "",
    religion: "",

    children: [],
    nominees: [],

    current_address: "",
    permanent_address: "",
    phone: "",
    email: "",
    education: "",
    bar_registration_number: "",
    enrollment_date_As_lawyer: "",
    enrollment_date_As_member: "",
    is_a_ex_employee: false,
    employment_details: "",
    is_receiing_pension: false,
    pension_details: "",
    is_from_another_bar: false,
    practicing_court_name: "",
    status: "active",
    retirement_date: "",
    death_date: "",
    remarks: "",
  });

  const [nomineeForm, setNomineeForm] = useState({
    name: "",
    relationship: "",
    phone: "",
    birth_year: "",
    nid: "",
    birth_certificate: "",
    address: "",
  });

  const [childrenForm, setChildrenForm] = useState({
    name: "",
    gender: "",
  });

  const [advocates, setAdvocates] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchAdvocates();
  }, []);


  useEffect(() => {
    if (isEditMode) {
      setFormData(advocateData);
    }
  }, [advocateData]);


  const fetchAdvocates = async () => {
    try {
      const res = await AxiosInstance.get("advocates/");
      setAdvocates(res.data);
    } catch (err) {
      console.error("ডেটা লোড করতে ব্যর্থ:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleNomineeChange = (e) => {
    const { name, value } = e.target;
    setNomineeForm({ ...nomineeForm, [name]: value });
  };

  const addNominee = () => {
    if (nomineeForm.name.trim() !== "") {
      setFormData({
        ...formData,
        nominees: [...formData.nominees, nomineeForm],
      });

      setNomineeForm({
        name: "",
        relationship: "",
        phone: "",
        birth_year: "",
        nid: "",
        birth_certificate: "",
        address: "",
      });
    }
  };

  const handleChildrenChange = (e) => {
    const { name, value } = e.target;
    setChildrenForm({ ...childrenForm, [name]: value });
  };

  const addChildren = () => {
    if (childrenForm.name.trim() !== "") {
      setFormData({
        ...formData,
        children: [...formData.children, childrenForm],
      });

      setChildrenForm({
        name: "",
        gender: "",
      });
    }
  };

  const handleDeleteNominee = (indexToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      nominees: prevData.nominees.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleDeleteChildren = (indexToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      children: prevData.children.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) formDataToSend.append(key, val);
    });

    try {
      if (editMode) {
        await AxiosInstance.put(`advocates/${currentId}/`, formDataToSend);
      } else {
        await AxiosInstance.post("advocates/", formDataToSend);
      }
      alert("Advocate Added Successfully");
      resetForm();
      fetchAdvocates();
    } catch (err) {
      console.error("সংরক্ষণে সমস্যা:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      advocate_type: "",
      name_english: "",
      name_bengali: "",
      photo: null,
      father_name: "",
      mother_name: "",
      husband_or_wife_name: "",
      gender: "",
      marital_status: "",
      date_of_birth: "",
      nid_number: "",
      blood_group: "",
      religion: "",

      children: [
        {
          name: "",
          gender: "",
        },
      ],
      nominees: [
        {
          name: "",
          address: "",
          relationship: "",
          phone: "",
          birth_year: "",
          nid: "",
          birth_certificate: "",
        },
      ],

      current_address: "",
      permanent_address: "",
      phone: "",
      email: "",
      education: "",
      bar_registration_number: "",
      enrollment_date_As_lawyer: "",
      enrollment_date_As_member: "",
      is_a_ex_employee: false,
      employment_details: "",
      is_receiing_pension: false,
      pension_details: "",
      is_from_another_bar: false,
      practicing_court_name: "",
      status: "active",
      retirement_date: "",
      death_date: "",
      remarks: "",
    });
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <div className="p-6 space-y-2 text-sm">

      <div className="mb-4 flex flex-row justify-between">
          <h1 className="font-bold text-lg px-16">
          {editMode ? "অ্যাডভোকেট সম্পাদনা" : "নতুন অ্যাডভোকেট যোগ করুন"}
        </h1>
          <Link to="/dashboard/advocate-list">
            <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">
              Go to List
            </h2>
          </Link>
        </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-2 px-16 shadow-lg py-4 bg-teal-50 rounded-lg border border-blue-400"
      >
        {/* Section 1: Basic Information */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">প্রাথমিক তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div>
              <label>
                ১. বার রেজিস্ট্রেশন নম্বর{" "}
                <span className="text-red-600 ml-2">*</span>
              </label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="bar_registration_number"
                value={formData.bar_registration_number}
                onChange={handleChange}
                placeholder="বার রেজিস্ট্রেশন নম্বর লিখুন"
                required
              />
            </div>
            <div>
              <label>
                ২. অ্যাডভোকেট ধরন<span className="text-red-600 ml-2">*</span>
              </label>
              <select
                className="w-full p-1 border border-gray-500 rounded"
                name="advocate_type"
                value={formData.advocate_type}
                onChange={handleChange}
                required
              >
                <option value="">নির্বাচন করুন</option>
                <option value="old">Old</option>
                <option value="new">New</option>
              </select>
            </div>
            <div>
              <label>
                ৩. নাম (ইংরেজি)<span className="text-red-600 ml-2">*</span>
              </label>
              <input
                className="w-full p-1 border border-gray-500  rounded"
                name="name_english"
                value={formData.name_english}
                onChange={handleChange}
                placeholder="ইংরেজিতে নাম লিখুন"
                required
              />
            </div>
            <div>
              <label>
                ৪. নাম (বাংলা)<span className="text-red-600 ml-2">*</span>
              </label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="name_bengali"
                value={formData.name_bengali}
                onChange={handleChange}
                placeholder="বাংলায় নাম লিখুন"
                required
              />
            </div>
            <div>
              <label>৫. ছবি</label>
              <input
                type="file"
                className="w-full"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Family Information */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">পরিবার সম্পর্কিত তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div>
              <label>৬. পিতার নাম</label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                placeholder="পিতার নাম লিখুন"
              />
            </div>
            <div>
              <label>৭. মাতার নাম</label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                placeholder="মাতার নাম লিখুন"
              />
            </div>
            <div>
              <label>৮. স্বামী/স্ত্রীর নাম</label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="husband_or_wife_name"
                value={formData.husband_or_wife_name}
                onChange={handleChange}
                placeholder="স্বামী/স্ত্রীর নাম লিখুন"
              />
            </div>
          </div>
        </div>

        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">সন্তান তথ্য</h2>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label>৯. সন্তানের নাম</label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="name"
                value={childrenForm.name}
                onChange={(e) => handleChildrenChange(e)}
                placeholder="সন্তানের নাম লিখুন"
              />
            </div>
            <div>
              <label>১০. লিঙ্গ</label>
              <select
                className="w-full p-1 border border-gray-500 rounded"
                name="gender"
                value={childrenForm.gender}
                onChange={(e) => handleChildrenChange(e)}
              >
                <option value="">-- নির্বাচন করুন --</option>
                <option value="son">ছেলে</option>
                <option value="daughter">মেয়ে</option>
              </select>
            </div>

            <div className="mt-5">
              {/* Add Button */}
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-1 rounded"
                onClick={addChildren}
              >
                সন্তান যোগ করুন
              </button>
            </div>
          </div>

          {formData.children.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">নাম</th>
                    <th className="border px-2 py-1">লিঙ্গ</th>
                    <th className="border px-2 py-1">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.children.map((child, index) => (
                    <tr key={index} className="text-center">
                      <td className="border px-2 py-1">{child.name}</td>
                      <td className="border px-2 py-1">
                        {child.gender === "son" ? "ছেলে" : "মেয়ে"}
                      </td>
                      <td className="border px-2 py-1">
                        <button
                          onClick={() => handleDeleteChildren(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          মুছুন
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 3: Personal Information */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">ব্যক্তিগত তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div>
              <label>১১. লিঙ্গ</label>
              <select
                className="w-full p-1 border border-gray-500 rounded"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">নির্বাচন করুন</option>
                <option value="Male">পুরুষ</option>
                <option value="Female">মহিলা</option>
                <option value="Other">অন্যান্য</option>
              </select>
            </div>
            <div>
              <label>১২. বৈবাহিক অবস্থা</label>
              <select
                className="w-full p-1 border border-gray-500 rounded"
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
              >
                <option value="">নির্বাচন করুন</option>
                <option value="Single">অবিবাহিত</option>
                <option value="Married">বিবাহিত</option>
                <option value="Divorced">তালাকপ্রাপ্ত</option>
              </select>
            </div>
            <div>
              <label>১৩. জন্ম তারিখ</label>
              <input
                type="date"
                className="w-full p-1 border border-gray-500 rounded"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>১৪. জাতীয় পরিচয়পত্র নম্বর</label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="nid_number"
                value={formData.nid_number}
                onChange={handleChange}
                placeholder="জাতীয় পরিচয়পত্র নম্বর লিখুন"
              />
            </div>
            <div>
              <label>১৫. রক্তের গ্রুপ</label>
              <select
                className="w-full p-1 border border-gray-500 rounded"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
              >
                <option value="">নির্বাচন করুন</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label>১৬. ধর্ম</label>
              <select
                className="w-full p-1 border border-gray-500 rounded"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              >
                <option value="">-- নির্বাচন করুন --</option>
                <option value="ইসলাম">ইসলাম</option>
                <option value="হিন্দু">হিন্দু</option>
                <option value="বৌদ্ধ">বৌদ্ধ</option>
                <option value="খ্রিষ্টান">খ্রিষ্টান</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nominee Form */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">নমিনি তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div>
              <label>১৭. নমিনির নাম</label>
              <input
                name="name"
                value={nomineeForm.name}
                onChange={(e) => handleNomineeChange(e)}
                className="w-full p-1 border border-gray-500 rounded"
                placeholder="নমিনির নাম লিখুন"
              />
            </div>
            <div>
              <label>১৮. সম্পর্ক</label>
              <input
                name="relationship"
                value={nomineeForm.relationship}
                onChange={(e) => handleNomineeChange(e)}
                className="w-full p-1 border border-gray-500 rounded"
                placeholder="সম্পর্ক লিখুন"
              />
            </div>
            <div>
              <label>১৯. নমিনির ফোন</label>
              <input
                name="phone"
                value={nomineeForm.phone}
                onChange={(e) => handleNomineeChange(e)}
                className="w-full p-1 border border-gray-500 rounded"
                placeholder="নমিনির ফোন নম্বর লিখুন"
              />
            </div>
            <div>
              <label>২০. জন্ম সাল</label>
              <input
                type="number"
                name="birth_year"
                value={nomineeForm.birth_year}
                onChange={(e) => handleNomineeChange(e)}
                className="w-full p-1 border border-gray-500 rounded"
                placeholder="নমিনির জন্ম সাল লিখুন"
              />
            </div>
            <div>
              <label>২১. NID</label>
              <input
                name="nid"
                value={nomineeForm.nid}
                onChange={(e) => handleNomineeChange(e)}
                className="w-full p-1 border border-gray-500 rounded"
                placeholder="নমিনির NID লিখুন"
              />
            </div>
            <div>
              <label>২২. জন্ম নিবন্ধন নম্বর</label>
              <input
                name="birth_certificate"
                value={nomineeForm.birth_certificate}
                onChange={(e) => handleNomineeChange(e)}
                className="w-full p-1 border border-gray-500 rounded"
                placeholder="জন্ম নিবন্ধন নম্বর লিখুন"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label>২৩. ঠিকানা</label>
              <textarea
                name="address"
                value={nomineeForm.address}
                onChange={(e) => handleNomineeChange(e)}
                rows="2"
                className="w-full p-1 border border-gray-500 rounded"
                placeholder="নমিনির ঠিকানা লিখুন"
              />
            </div>
          </div>

          {/* Add Button */}
          <button
            type="button"
            className="bg-green-600 text-white mt-2 px-4 py-1 rounded"
            onClick={addNominee}
          >
            নমিনি যোগ করুন
          </button>

          {/* Table of Nominees */}
          {formData.nominees.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">নাম</th>
                    <th className="border px-2 py-1">সম্পর্ক</th>
                    <th className="border px-2 py-1">ফোন</th>
                    <th className="border px-2 py-1">জন্ম সাল</th>
                    <th className="border px-2 py-1">NID</th>
                    <th className="border px-2 py-1">জন্ম নিবন্ধন</th>
                    <th className="border px-2 py-1">ঠিকানা</th>
                    <th className="border px-2 py-1">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.nominees.map((nom, idx) => (
                    <tr key={idx} className="text-center">
                      <td className="border px-2 py-1">{nom.name}</td>
                      <td className="border px-2 py-1">{nom.relationship}</td>
                      <td className="border px-2 py-1">{nom.phone}</td>
                      <td className="border px-2 py-1">{nom.birth_year}</td>
                      <td className="border px-2 py-1">{nom.nid}</td>
                      <td className="border px-2 py-1">
                        {nom.birth_certificate}
                      </td>
                      <td className="border px-2 py-1">{nom.address}</td>
                      <td className="border px-2 py-1">
                        <button
                          onClick={() => handleDeleteNominee(idx)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          মুছুন
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* অংশ ৫: ঠিকানা তথ্য */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">ঠিকানা তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div>
              <label>২৪. বর্তমান ঠিকানা</label>
              <textarea
                className="w-full p-1 border border-gray-500 rounded"
                name="current_address"
                value={formData.current_address}
                onChange={handleChange}
                placeholder="বর্তমান ঠিকানা লিখুন"
                rows="2"
              />
            </div>
            <div>
              <label>২৫. স্থায়ী ঠিকানা</label>
              <textarea
                className="w-full p-1 border border-gray-500 rounded"
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleChange}
                placeholder="স্থায়ী ঠিকানা লিখুন"
                rows="2"
              />
            </div>
          </div>
        </div>

        {/* অংশ ৬: যোগাযোগ তথ্য */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">যোগাযোগ তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div>
              <label>২৬. ফোন নম্বর</label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="ফোন নম্বর লিখুন"
              />
            </div>
            <div>
              <label>২৭. ইমেইল</label>
              <input
                type="email"
                className="w-full p-1 border border-gray-500 rounded"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ইমেইল ঠিকানা লিখুন"
              />
            </div>
          </div>
        </div>

        {/* অংশ ৭: পেশাগত তথ্য */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">পেশাগত তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div>
              <label>২৮. শিক্ষাগত যোগ্যতা</label>
              <input
                className="w-full p-1 border border-gray-500 rounded"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="শিক্ষাগত যোগ্যতা লিখুন"
              />
            </div>

            <div>
              <label>২৯. অ্যাডভোকেট হিসেবে নিবন্ধনের তারিখ</label>
              <input
                type="date"
                className="w-full p-1 border border-gray-500 rounded"
                name="enrollment_date_As_lawyer"
                value={formData.enrollment_date_As_lawyer}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>৩০. সদস্য হিসেবে নিবন্ধনের তারিখ  <span className="text-red-600 ml-2">*</span></label>
              <input
                type="date"
                className="w-full p-1 border border-gray-500 rounded"
                name="enrollment_date_As_member"
                value={formData.enrollment_date_As_member}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* অংশ ৮: আদালত সম্পর্কিত তথ্য */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">আদালত সম্পর্কিত তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-1"
                name="is_a_ex_employee"
                checked={formData.is_a_ex_employee}
                onChange={handleChange}
              />
              <label>৩১. সাবেক কর্মচারী?</label>
            </div>
            {formData.is_a_ex_employee && (
              <div className="md:col-span-2">
                <label>৩২. কর্মসংস্থানের বিবরণ</label>
                <textarea
                  className="w-full p-1 border border-gray-500 rounded"
                  name="employment_details"
                  value={formData.employment_details}
                  onChange={handleChange}
                  placeholder="কর্মসংস্থানের বিবরণ লিখুন"
                  rows="2"
                />
              </div>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-1"
                name="is_receiing_pension"
                checked={formData.is_receiing_pension}
                onChange={handleChange}
              />
              <label>৩৩. পেনশন পান?</label>
            </div>
            {formData.is_receiing_pension && (
              <div className="md:col-span-2">
                <label>৩৪. পেনশনের বিবরণ</label>
                <textarea
                  className="w-full p-1 border border-gray-500 rounded"
                  name="pension_details"
                  value={formData.pension_details}
                  onChange={handleChange}
                  placeholder="পেনশনের বিবরণ লিখুন"
                  rows="2"
                />
              </div>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-1"
                name="is_from_another_bar"
                checked={formData.is_from_another_bar}
                onChange={handleChange}
              />
              <label>৩৫. অন্য বার থেকে?</label>
            </div>
            {formData.is_from_another_bar && (
              <div className="md:col-span-2">
                <label>৩৬. প্র্যাকটিস আদালতের নাম</label>
                <textarea
                  className="w-full p-1 border border-gray-500 rounded"
                  name="practicing_court_name"
                  value={formData.practicing_court_name}
                  onChange={handleChange}
                  placeholder="আদালতের নাম লিখুন"
                />
              </div>
            )}
          </div>
        </div>

        {/* অবস্থা সেকশন */}
        <label className="block mb-2 text-sm font-semibold">অবস্থা</label>
        <div className="grid grid-cols-4 gap-4 items-center w-2/3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              ৩৭. অবসরপ্রাপ্ত
            </label>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                name="is_retired"
                checked={formData.is_retired || false}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormData((prev) => ({
                    ...prev,
                    is_retired: isChecked,
                    status: isChecked || prev.is_dead ? "inactive" : "active",
                  }));
                }}
              />
              <span className="text-sm">হ্যাঁ</span>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              ৩৮. অবসরের তারিখ
            </label>
            <input
              type="date"
              name="retirement_date"
              disabled={!formData.is_retired}
              value={formData.retirement_date || ""}
              onChange={handleChange}
              className="border border-gray-500  rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              ৩৯. মৃত
            </label>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                name="is_dead"
                checked={formData.is_dead || false}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormData((prev) => ({
                    ...prev,
                    is_dead: isChecked,
                    status:
                      isChecked || prev.is_retired ? "inactive" : "active",
                  }));
                }}
              />
              <span className="text-sm">হ্যাঁ</span>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              ৪০. মৃত্যুর তারিখ
            </label>
            <input
              type="date"
              name="death_date"
              disabled={!formData.is_dead}
              value={formData.death_date || ""}
              onChange={handleChange}
              className="border border-gray-500 rounded px-3 py-1 w-full"
            />
          </div>
        </div>

        {/* অংশ ৯: মন্তব্য */}
        <div className="border p-1 rounded">
          <h2 className="font-semibold mb-1">মন্তব্য</h2>
          <textarea
            className="w-1/2 p-1 h-14 border border-gray-500 rounded"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="কোনো মন্তব্য থাকলে লিখুন"
            rows="3"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            {editMode ? "আপডেট করুন" : "সংরক্ষণ করুন"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-3 py-1 bg-gray-500 text-white rounded"
          >
            রিসেট
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvocate;
