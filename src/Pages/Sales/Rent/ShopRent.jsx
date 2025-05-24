import AxiosInstance from "../../../Components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const ShopRent = () =>{

    const  { state } = useLocation();
    const shopRentData = state?.shopRentData;
    const isEditMode = Boolean(shopRentData);

    const [formData, setFormData] = useState({
        collection_date : new Date().toISOString().split('T')[0],
        renter_name: "",
        from_month: new Date().getMonth() + 1,
        from_year: new Date().getFullYear(),
        to_month: new Date().getMonth() + 1,
        to_year: new Date().getFullYear(),
        rent_type:"House",
        building_name: "",
        floor: "",
        room: "",
        rent_amount:"",
        payment_type:"Cash",
        remarks: "",
    });

    const [buildings, setBuildings] = useState([]);
    const navigate = useNavigate();

    const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 2050 - 2010 + 1 }, (_, i) => 2010 + i);


    useEffect(() =>{
        if(isEditMode){
            setFormData(shopRentData)
        }
    }, [shopRentData]);
    

    // Fething the Buildings
    useEffect(() => {
        const fetchbuildings = async() =>{
            try{
                const response = await AxiosInstance.get("buildings/");
                setBuildings(response.data);   
            } catch (error) {
                console.error('Error fetching buildings:', error);
            }
        };

        fetchbuildings();
    }, [])


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
        const response = await AxiosInstance.post('shop-rent/', formData);
        alert('Data saved successfully!');
        handleClear();
        } catch (error) {
        console.error('Error submitting rent collection:', error);
        alert('Failed to submit rent collection: ' + (error.response?.data?.message || error.message));
        }
    };


    const handleClear = () => {
        setFormData({
            collection_date : new Date().toISOString().split('T')[0],
            renter_name: "",
            from_month: new Date().getMonth() + 1,
            from_year: new Date().getFullYear(),
            to_month: new Date().getMonth() + 1,
            to_year: new Date().getFullYear(),
            rent_type:"House",
            building_name: "",
            floor: "",
            room: "",
            rent_amount:"",
            payment_type:"Cash",
            remarks: "",
        });
  };

    return (
        <div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
         <div className=" pt-8 mb-2">

            <div className="mb-4 flex flex-row">
                <div className="flex-1">
                    <h2 className="text-lg text-sky-900 font-semibold mb-6 text-center">Shop Rent Collection</h2>
                </div>
        
                <Link to="/dashboard/shop-rent-list">
                <h2 className="bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2">Go to List</h2>
                </Link> 
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold">
                    Collection Date
                    <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="date"
                    name="collection_date"
                    value={formData.collection_date}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Renter Name <span className="text-red-500">*</span> </label>
                     <input
                       type="text"
                        name="renter_name"
                        value={formData.renter_name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 px-3 bg-white text-gray-700 leading-tight focus:outline-none"
                        required
                    />
                </div>
                
                {/* Month and Year */}
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
                    From Month
                    <span className="text-red-500">*</span>
                    </label>
                    <select
                    name="from_month"
                    value={formData.from_month}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                    ))}
                    </select>
                </div>

                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
                    From Year
                    <span className="text-red-500">*</span>
                    </label>
                    <select
                    name="from_year"
                    value={formData.from_year}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    <option value="">Select Year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                    </select>
                </div>

                {/* Month and Year */}
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
                    To Month
                    <span className="text-red-500">*</span>
                    </label>
                    <select
                    name="to_month"
                    value={formData.to_month}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                    ))}
                    </select>
                </div>

                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
                    To Year
                    <span className="text-red-500">*</span>
                    </label>
                    <select
                    name="to_year"
                    value={formData.to_year}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    <option value="">Select Year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                    </select>
                </div>

                {/* Type */}
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
                    House/Shop/Billboard
                    <span className="text-red-500">*</span>
                    </label>
                    <select
                    name="rent_type"
                    value={formData.rent_type}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
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
                    <span className="text-red-500">*</span>
                    </label>
                    <select
                    name="building_name"
                    value={formData.building_name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    <option value="">Select Building</option>
                    {buildings.map(building => (
                        <option key={building.id} value={building.building_name}>{building.building_name}</option>
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
                    className=" border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Amount and Payment Type */}
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
                    Amount
                    <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="number"
                    name="rent_amount"
                    value={formData.rent_amount}
                    onChange={handleChange}
                    className="shadow appearance-none border  bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
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
                    className="shadow appearance-none border rounded bg-gray-100 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
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
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="shadow appearance-none border h-12 rounded bg-gray-100 w-full px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="3"
                    />
                </div>
            </div>
            </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-left">
            <button
            type="submit"
            className="bg-blue-600 text-white h-8 w-16 rounded-md"
            >
            submit
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

        </div>
    )
}

export default ShopRent;