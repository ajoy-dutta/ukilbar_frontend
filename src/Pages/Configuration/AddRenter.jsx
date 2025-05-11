import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../Components/AxiosInstance";

export const AddRenter = () => {
    const [renters, setRenters] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [formData, setFormData] = useState({
        renter_name: '',
        address: '',
        phone: '',
        category: '',
        remarks: '',
        building_name: '',
        floor_no: '',
        room_no: '',
        rent_amount: ''
    });
    const [currentRenterId, setCurrentRenterId] = useState(null);
    const navigate = useNavigate();

    // Fetch buildings and renters on component mount
    useEffect(() => {
        fetchBuildings();
        fetchRenters();
    }, []);

    const fetchBuildings = async () => {
        try {
            const response = await AxiosInstance.get('buildings/');
            setBuildings(response.data);
        } catch (error) {
            console.error('Error fetching buildings:', error);
        }
    };

    const fetchRenters = async () => {
        try {
            const response = await AxiosInstance.get('renters/');
            setRenters(response.data);
        } catch (error) {
            console.error('Error fetching renters:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentRenterId) {
                await AxiosInstance.put(`renters/${currentRenterId}/`, formData);
            } else {
                await AxiosInstance.post('renters/', formData);
            }
            resetForm();
            fetchRenters();
        } catch (error) {
            console.error('Error saving renter:', error);
        }
    };

    const handleEdit = (renter) => {
        setFormData({
            renter_name: renter.renter_name,
            address: renter.address,
            phone: renter.phone,
            category: renter.category,
            remarks: renter.remarks,
            building_name: renter.building_name.id,
            floor_no: renter.floor_no,
            room_no: renter.room_no,
            rent_amount: renter.rent_amount
        });
        setCurrentRenterId(renter.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('আপনি কি এই ভাড়াটিয়াকে মুছে ফেলতে চান?')) {
            try {
                await AxiosInstance.delete(`renters/${id}/`);
                fetchRenters();
            } catch (error) {
                console.error('Error deleting renter:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            renter_name: '',
            address: '',
            phone: '',
            category: '',
            remarks: '',
            building_name: '',
            floor_no: '',
            room_no: '',
            rent_amount: ''
        });
        setCurrentRenterId(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 mx-4 text-gray-800">
                {currentRenterId ? 'ভাড়াটিয়া সম্পাদনা করুন' : 'নতুন ভাড়াটিয়া যোগ করুন'}
            </h1>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Renter Information */}
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="renter_name">
                            ভাড়াটিয়ার নাম
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="renter_name"
                            name="renter_name"
                            type="text"
                            value={formData.renter_name}
                            onChange={handleChange}
                            placeholder="ভাড়াটিয়ার পুরো নাম লিখুন"
                            required
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="phone">
                            ফোন নম্বর
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="phone"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="০১XXXXXXXX"
                            required
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="address">
                            ঠিকানা
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="বিস্তারিত ঠিকানা লিখুন"
                            required
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="category">
                            ক্যাটাগরি
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="category"
                            name="category"
                            type="text"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="ভাড়াটিয়ার ধরন (ব্যবসায়ী/অফিস/অন্যান্য)"
                        />
                    </div>

                    {/* Building Information */}
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="building_name">
                            বিল্ডিং নির্বাচন করুন
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="building_name"
                            name="building_name"
                            value={formData.building_name}
                            onChange={handleChange}
                            required
                        >
                            <option value="">বিল্ডিং নির্বাচন করুন</option>
                            {buildings.map(building => (
                                <option key={building.id} value={building.id}>
                                    {building.building_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="floor_no">
                            ফ্লোর নম্বর
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="floor_no"
                            name="floor_no"
                            type="text"
                            value={formData.floor_no}
                            onChange={handleChange}
                            placeholder="যেমন: ৩য় তলা"
                            required
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="room_no">
                            রুম নম্বর
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="room_no"
                            name="room_no"
                            type="text"
                            value={formData.room_no}
                            onChange={handleChange}
                            placeholder="যেমন: ৩০১"
                            required
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="rent_amount">
                            ভাড়ার পরিমাণ
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="rent_amount"
                            name="rent_amount"
                            type="number"
                            step="0.01"
                            value={formData.rent_amount}
                            onChange={handleChange}
                            placeholder="টাকায় লিখুন"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="remarks">
                            মন্তব্য
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="remarks"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="অতিরিক্ত তথ্য (যদি থাকে)"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {currentRenterId ? 'আপডেট করুন' : 'যোগ করুন'}
                    </button>
                    {currentRenterId && (
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={resetForm}
                        >
                            বাতিল করুন
                        </button>
                    )}
                </div>
            </form>

            {/* Renters List */}
            <div className="bg-white shadow-md rounded px-4 pt-4 pb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">ভাড়াটিয়াদের তালিকা</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                               <th className="py-2 px-4 border-b">SL</th>
                                <th className="py-2 px-4 border-b">নাম</th>
                                <th className="py-2 px-4 border-b">ফোন</th>
                                <th className="py-2 px-4 border-b">বিল্ডিং</th>
                                <th className="py-2 px-4 border-b">ফ্লোর/রুম</th>
                                <th className="py-2 px-4 border-b">ভাড়া</th>
                                <th className="py-2 px-4 border-b">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renters.map((renter,index) => (
                                <tr key={renter.id} className="text-center">
                                    <td className="py-2 px-4 border-b">{index+1}</td>
                                    <td className="py-2 px-4 border-b">{renter.renter_name}</td>
                                    <td className="py-2 px-4 border-b">{renter.phone}</td>
                                    <td className="py-2 px-4 border-b">{renter.building_name}</td>
                                    <td className="py-2 px-4 border-b">{renter.floor_no}/{renter.room_no}</td>
                                    <td className="py-2 px-4 border-b">{renter.rent_amount}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                            onClick={() => handleEdit(renter)}
                                        >
                                            সম্পাদনা
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => handleDelete(renter.id)}
                                        >
                                            মুছুন
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

export default AddRenter;