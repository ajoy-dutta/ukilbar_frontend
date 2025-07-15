import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        from_date:'',
        to_date:'',
        building_name: '',
        floor_no: '',
        room_no: '',
        rent_amount: ''
    });
    const [currentRenterId, setCurrentRenterId] = useState(null);
    const navigate = useNavigate();

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
            from_date:renter.from_date,
            to_date:renter.to_date,
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
        if (window.confirm('Are you sure you want to delete this renter?')) {
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
            from_date:'',
            to_date:'',
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
                {currentRenterId ? 'Edit Renter' : 'Add New Renter'}
            </h1>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div>
                        <label className="block text-gray-700  font-bold" htmlFor="renter_name">
                            Renter Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="renter_name"
                            name="renter_name"
                            type="text"
                            value={formData.renter_name}
                            onChange={handleChange}
                            placeholder="Enter full renter name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold" htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="phone"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. 01XXXXXXXX"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold" htmlFor="address">
                            Address
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter detailed address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold" htmlFor="category">
                            Category
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="category"
                            name="category"
                            type="text"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Type (Chamber/Business/Office/Other)"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700  font-bold" htmlFor="building_name">
                            Select Building
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="building_name"
                            name="building_name"
                            value={formData.building_name}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Building</option>
                            {buildings.map(building => (
                                <option key={building.id} value={building.id}>
                                    {building.building_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700  font-bold" htmlFor="floor_no">
                            Floor Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="floor_no"
                            name="floor_no"
                            type="text"
                            value={formData.floor_no}
                            onChange={handleChange}
                            placeholder="e.g. 3rd Floor"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700  font-bold" htmlFor="room_no">
                            Room Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="room_no"
                            name="room_no"
                            type="text"
                            value={formData.room_no}
                            onChange={handleChange}
                            placeholder="e.g. 301"
                            required
                        />
                    </div>

                    <div className="mb-2">
                    <label htmlFor="from_date" className="block text-sm font-medium text-gray-800 mb-1">
                         From Date
                    </label>
                    <input
                        type="date"
                        id="from_date"
                        name="from_date"
                        value={formData.from_date}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                    />
                    </div>

                    <div className="mb-2">
                    <label htmlFor="to_date" className="block text-sm font-medium text-gray-800 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="to_date"
                        name="to_date"
                        value={formData.to_date}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2"
                    />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold" htmlFor="rent_amount">
                            Rent Amount
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="rent_amount"
                            name="rent_amount"
                            type="number"
                            step="0.01"
                            value={formData.rent_amount}
                            onChange={handleChange}
                            placeholder="Amount in Taka"
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-gray-700 font-bold" htmlFor="remarks">
                            Remarks
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="remarks"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="Additional info (if any)"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {currentRenterId ? 'Update' : 'Add'}
                    </button>
                    {currentRenterId && (
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Renters List */}
            <div className="bg-white shadow-md rounded px-4 pt-4 pb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Renter List</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">SL</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Phone</th>
                                <th className="py-2 px-4 border-b">Building</th>
                                <th className="py-2 px-4 border-b">Floor/Room</th>
                                <th className="py-2 px-4 border-b">Period</th>
                                <th className="py-2 px-4 border-b">Rent</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renters.map((renter, index) => (
                                <tr key={renter.id} className="text-center">
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{renter.renter_name}</td>
                                    <td className="py-2 px-4 border-b">{renter.phone}</td>
                                    <td className="py-2 px-4 border-b">{renter.building_name}</td>
                                    <td className="py-2 px-4 border-b">{renter.floor_no}/{renter.room_no}</td>
                                    <td className="py-2 px-4 border-b">
                                    {renter.from_date} - {renter.to_date}
                                    </td>
                                    <td className="py-2 px-4 border-b">{renter.rent_amount}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                                            onClick={() => handleEdit(renter)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => handleDelete(renter.id)}
                                        >
                                            Delete
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
