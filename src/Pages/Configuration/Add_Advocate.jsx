import { useState, useEffect } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

export const AddAdvocate = () => {
    // All fields from models.py initialized
    const [formData, setFormData] = useState({
        advocate_type: '',
        name_english: '',
        name_bengali: '',
        photo: null,
        father_name: '',
        mother_name: '',
        husband_or_wife_name: '',
        gender: '',
        marital_status: '',
        date_of_birth: '',
        nid_number: '',
        blood_group: '',
        religion: '',
        son: '',
        daughter: '',
        nomini_name: '',
        nomini_address: '',
        nomini_relationship: '',
        nomini_phone: '',
        nomini_birth_year: '',
        nomini_nid: '',
        nomini_birth_certificate: '',
        current_address: '',
        permanent_address: '',
        phone: '',
        email: '',
        education: '',
        bar_registration_number: '',
        enrollment_date_As_lawyer: '',
        enrollment_date_As_member: '',
        is_a_ex_employee: false,
        employment_details: '',
        is_receiing_pension: false,
        pension_details: '',
        is_from_another_bar: false,
        practicing_court_name: '',
        remarks: ''
    });

    const [advocates, setAdvocates] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Fetch data
    useEffect(() => { fetchAdvocates(); }, []);

    const fetchAdvocates = async () => {
        try {
            const res = await AxiosInstance.get('advocates/');
            setAdvocates(res.data);
        } catch (err) {
            console.error('ডেটা লোড করতে ব্যর্থ:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
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
                await AxiosInstance.post('advocates/', formDataToSend);
            }
            resetForm();
            fetchAdvocates();
        } catch (err) {
            console.error('সংরক্ষণে সমস্যা:', err);
        }
    };

    const resetForm = () => {
        setFormData({
            advocate_type: '',
            name_english: '',
            name_bengali: '',
            photo: null,
            father_name: '',
            mother_name: '',
            husband_or_wife_name: '',
            gender: '',
            marital_status: '',
            date_of_birth: '',
            nid_number: '',
            blood_group: '',
            religion: '',
            son: '',
            daughter: '',
            nomini_name: '',
            nomini_address: '',
            nomini_relationship: '',
            nomini_phone: '',
            nomini_birth_year: '',
            nomini_nid: '',
            nomini_birth_certificate: '',
            current_address: '',
            permanent_address: '',
            phone: '',
            email: '',
            education: '',
            bar_registration_number: '',
            enrollment_date_As_lawyer: '',
            enrollment_date_As_member: '',
            is_a_ex_employee: false,
            employment_details: '',
            is_receiing_pension: false,
            pension_details: '',
            is_from_another_bar: false,
            practicing_court_name: '',
            remarks: ''
        });
        setEditMode(false);
        setCurrentId(null);
    };

    return (
        <div className="p-6 space-y-2 text-sm">
            <h1 className="font-bold text-base">
                {editMode ? 'অ্যাডভোকেট সম্পাদনা' : 'নতুন অ্যাডভোকেট যোগ করুন'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-2">
                {/* Section 1: Basic Information */}
                <div className="border p-1 rounded">
                    <h2 className="font-semibold mb-1">প্রাথমিক তথ্য</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        <div>
                            <label>বার রেজিস্ট্রেশন নম্বর<span className="text-red-600 ml-2">*</span></label>
                            <input
                                className="w-full p-1 border rounded"
                                name="bar_registration_number"
                                value={formData.bar_registration_number}
                                onChange={handleChange}
                                placeholder="বার রেজিস্ট্রেশন নম্বর লিখুন"
                                required
                            />
                        </div>
                        <div>
                            <label>অ্যাডভোকেট ধরন<span className="text-red-600 ml-2">*</span></label>
                            <select
                                className="w-full p-1 border rounded"
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
                            <label>নাম (ইংরেজি)<span className="text-red-600 ml-2">*</span></label>
                            <input
                                className="w-full p-1 border rounded"
                                name="name_english"
                                value={formData.name_english}
                                onChange={handleChange}
                                placeholder="ইংরেজিতে নাম লিখুন"
                                required
                            />
                        </div>
                        <div>
                            <label>নাম (বাংলা)<span className="text-red-600 ml-2">*</span></label>
                            <input
                                className="w-full p-1 border rounded"
                                name="name_bengali"
                                value={formData.name_bengali}
                                onChange={handleChange}
                                placeholder="বাংলায় নাম লিখুন"
                                required
                            />
                        </div>
                        <div>
                            <label>ছবি</label>
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
                            <label>পিতার নাম</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleChange}
                                placeholder="পিতার নাম লিখুন"
                            />
                        </div>
                        <div>
                            <label>মাতার নাম</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="mother_name"
                                value={formData.mother_name}
                                onChange={handleChange}
                                placeholder="মাতার নাম লিখুন"
                            />
                        </div>
                        <div>
                            <label>স্বামী/স্ত্রীর নাম</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="husband_or_wife_name"
                                value={formData.husband_or_wife_name}
                                onChange={handleChange}
                                placeholder="স্বামী/স্ত্রীর নাম লিখুন"
                            />
                        </div>
                        <div>
                            <label>পুত্র</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="son"
                                value={formData.son}
                                onChange={handleChange}
                                placeholder="পুত্রের নাম লিখুন"
                            />
                        </div>
                        <div>
                            <label>কন্যা</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="daughter"
                                value={formData.daughter}
                                onChange={handleChange}
                                placeholder="কন্যার নাম লিখুন"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 3: Personal Information */}
                <div className="border p-1 rounded">
                    <h2 className="font-semibold mb-1">ব্যক্তিগত তথ্য</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        <div>
                            <label>লিঙ্গ*</label>
                            <select
                                className="w-full p-1 border rounded"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">নির্বাচন করুন</option>
                                <option value="male">পুরুষ</option>
                                <option value="female">মহিলা</option>
                                <option value="other">অন্যান্য</option>
                            </select>
                        </div>
                        <div>
                            <label>বৈবাহিক অবস্থা</label>
                            <select
                                className="w-full p-1 border rounded"
                                name="marital_status"
                                value={formData.marital_status}
                                onChange={handleChange}
                            >
                                <option value="">নির্বাচন করুন</option>
                                <option value="single">অবিবাহিত</option>
                                <option value="married">বিবাহিত</option>
                                <option value="divorced">তালাকপ্রাপ্ত</option>
                                <option value="widowed">বিধবা/বিধুর</option>
                            </select>
                        </div>
                        <div>
                            <label>জন্ম তারিখ</label>
                            <input
                                type="date"
                                className="w-full p-1 border rounded"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>জাতীয় পরিচয়পত্র নম্বর</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="nid_number"
                                value={formData.nid_number}
                                onChange={handleChange}
                                placeholder="জাতীয় পরিচয়পত্র নম্বর লিখুন"
                            />
                        </div>
                        <div>
                            <label>রক্তের গ্রুপ</label>
                            <select
                                className="w-full p-1 border rounded"
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
                            <label>ধর্ম</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="religion"
                                value={formData.religion}
                                onChange={handleChange}
                                placeholder="ধর্ম লিখুন"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 4: Nominee Information */}
                <div className="border p-1 rounded">
                    <h2 className="font-semibold mb-1">নমিনি তথ্য</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        <div>
                            <label>নমিনির নাম</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="nomini_name"
                                value={formData.nomini_name}
                                onChange={handleChange}
                                placeholder="নমিনির নাম লিখুন"
                            />
                        </div>
                        <div>
                            <label>সম্পর্ক</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="nomini_relationship"
                                value={formData.nomini_relationship}
                                onChange={handleChange}
                                placeholder="সম্পর্ক লিখুন"
                            />
                        </div>
                        <div>
                            <label>নমিনির ফোন</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="nomini_phone"
                                value={formData.nomini_phone}
                                onChange={handleChange}
                                placeholder="নমিনির ফোন নম্বর লিখুন"
                            />
                        </div>
                        <div>
                            <label>জন্ম সাল</label>
                            <input
                                type="number"
                                className="w-full p-1 border rounded"
                                name="nomini_birth_year"
                                value={formData.nomini_birth_year}
                                onChange={handleChange}
                                placeholder="নমিনির জন্ম সাল লিখুন"
                            />
                        </div>
                        <div>
                            <label>নমিনির NID</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="nomini_nid"
                                value={formData.nomini_nid}
                                onChange={handleChange}
                                placeholder="নমিনির NID নম্বর লিখুন"
                            />
                        </div>
                        <div>
                            <label>জন্ম নিবন্ধন নম্বর</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="nomini_birth_certificate"
                                value={formData.nomini_birth_certificate}
                                onChange={handleChange}
                                placeholder="জন্ম নিবন্ধন নম্বর লিখুন"
                            />
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                            <label>নমিনির ঠিকানা</label>
                            <textarea
                                className="w-full p-1 border rounded"
                                name="nomini_address"
                                value={formData.nomini_address}
                                onChange={handleChange}
                                placeholder="নমিনির সম্পূর্ণ ঠিকানা লিখুন"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 5: Address Information */}
                <div className="border p-1 rounded">
                    <h2 className="font-semibold mb-1">ঠিকানা তথ্য</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        <div>
                            <label>বর্তমান ঠিকানা*</label>
                            <textarea
                                className="w-full p-1 border rounded"
                                name="current_address"
                                value={formData.current_address}
                                onChange={handleChange}
                                placeholder="বর্তমান ঠিকানা লিখুন"
                                rows="2"
                                required
                            />
                        </div>
                        <div>
                            <label>স্থায়ী ঠিকানা</label>
                            <textarea
                                className="w-full p-1 border rounded"
                                name="permanent_address"
                                value={formData.permanent_address}
                                onChange={handleChange}
                                placeholder="স্থায়ী ঠিকানা লিখুন"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 6: Contact Information */}
                <div className="border p-1 rounded">
                    <h2 className="font-semibold mb-1">যোগাযোগ তথ্য</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        <div>
                            <label>ফোন নম্বর</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="ফোন নম্বর লিখুন"
                            />
                        </div>
                        <div>
                            <label>ইমেইল</label>
                            <input
                                type="email"
                                className="w-full p-1 border rounded"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ইমেইল ঠিকানা লিখুন"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 7: Professional Information */}
                <div className="border p-1 rounded">
                    <h2 className="font-semibold mb-1">পেশাগত তথ্য</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        <div>
                            <label>শিক্ষাগত যোগ্যতা</label>
                            <input
                                className="w-full p-1 border rounded"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                placeholder="শিক্ষাগত যোগ্যতা লিখুন"
                            />
                        </div>
                        
                        <div>
                            <label>অ্যাডভোকেট হিসেবে নিবন্ধনের তারিখ</label>
                            <input
                                type="date"
                                className="w-full p-1 border rounded"
                                name="enrollment_date_As_lawyer"
                                value={formData.enrollment_date_As_lawyer}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>সদস্য হিসেবে নিবন্ধনের তারিখ</label>
                            <input
                                type="date"
                                className="w-full p-1 border rounded"
                                name="enrollment_date_As_member"
                                value={formData.enrollment_date_As_member}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Section 8: Court Information */}
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
                            <label>সাবেক কর্মচারী?</label>
                        </div>
                        {formData.is_a_ex_employee && (
                            <div className="md:col-span-2">
                                <label>কর্মসংস্থানের বিবরণ</label>
                                <textarea
                                    className="w-full p-1 border rounded"
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
                            <label>পেনশন পান?</label>
                        </div>
                        {formData.is_receiing_pension && (
                            <div className="md:col-span-2">
                                <label>পেনশনের বিবরণ</label>
                                <textarea
                                    className="w-full p-1 border rounded"
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
                            <label>অন্য বার থেকে?</label>
                        </div>
                        {formData.is_from_another_bar && (
                            <div className="md:col-span-2">
                                <label>প্র্যাকটিস আদালতের নাম</label>
                                <textarea
                                    className="w-full p-1 border rounded"
                                    name="practicing_court_name"
                                    value={formData.practicing_court_name}
                                    onChange={handleChange}
                                    placeholder="আদালতের নাম লিখুন"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Section 9: Remarks */}
                <div className="border p-1 rounded">
                    <h2 className="font-semibold mb-1">মন্তব্য</h2>
                    <textarea
                        className="w-full p-1 border rounded"
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
                        {editMode ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
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
            {/* Advocates Table */}
            <div className="mt-4">
                <h2 className="font-bold mb-1">অ্যাডভোকেট তালিকা</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-1 border">নাম</th>
                                <th className="p-1 border">ফোন</th>
                                <th className="p-1 border">বার নং</th>
                                <th className="p-1 border">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {advocates.map(advocate => (
                                <tr key={advocate.id} className="border">
                                    <td className="p-1 border">{advocate.name_bengali}</td>
                                    <td className="p-1 border">{advocate.phone}</td>
                                    <td className="p-1 border">{advocate.bar_registration_number}</td>
                                    <td className="p-1 border space-x-1">
                                        <button
                                            onClick={() => {
                                                setFormData(advocate);
                                                setEditMode(true);
                                                setCurrentId(advocate.id);
                                            }}
                                            className="px-2 py-0.5 bg-yellow-100 rounded"
                                        >
                                            এডিট
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('আপনি কি নিশ্চিত?')) {
                                                    AxiosInstance.delete(`advocates/${advocate.id}/`)
                                                        .then(() => fetchAdvocates());
                                                }
                                            }}
                                            className="px-2 py-0.5 bg-red-100 rounded"
                                        >
                                            ডিলিট
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default AddAdvocate