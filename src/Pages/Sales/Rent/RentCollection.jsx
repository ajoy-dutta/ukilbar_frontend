import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import { useNavigate } from "react-router-dom";

const RentCollection = () => {
    const [formData, setFormData] = useState({
        collection_date : new Date().toISOString().split('T')[0],
        renter_name: "",
        month: "",
        year: "",
        building_name: "",
        floor: "",
        room: "",
        rent_amount:"",
        payment_type:"",
        remarks: "",

        // Monthly Fee
        monthly_fee: false,
        from_month: new Date().getMonth() + 1,
        from_year: new Date().getFullYear(),
        to_month: new Date().getMonth() + 1,
        to_year: new Date().getFullYear(),
        monthly_amount: '',
        monthly_payment_type: 'cash',
        
        // Yearly Fee
        yearly_fee: false,
        yearly_from_year: new Date().getFullYear(),
        yearly_to_year: new Date().getFullYear(),
        yearly_amount: '',
        yearly_payment_type: 'cash'

    });

    const [buildings, setBuildings] = useState([]);
    const [renters, setRenters] = useState([]);
    const navigate = useNavigate();

    const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);


    useEffect(() => {
        const fetchbuildings = async() =>{
            try{
                const response = await AxiosInstance.get("buildings/")
                setBuildings(response.data);     
            }catch (error) {
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
        const response = await AxiosInstance.post('rent-collections/', formData);
        alert('Rent saved successfully!');
        } catch (error) {
        console.error('Error submitting rent collection:', error);
        alert('Failed to submit rent collection: ' + (error.response?.data?.message || error.message));
        }
    };





    return(   
            <div className="container mx-auto p-4">
            <h1 className="text-xl text-center font-semibold mb-2 pt-2">Rent Collection</h1>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Collection Date */}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Collection Date
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

                {/* Month and Year */}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Month
                    </label>
                    <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    {months.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                    ))}
                    </select>
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Year
                    </label>
                    <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                    </select>
                </div>

                {/* Type */}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    House/Shop/Billboard
                    </label>
                    <select
                    name="type"
                    value={formData.type}
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
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Building
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
                        <option key={building.id} value={building.id}>{building.building_name}</option>
                    ))}
                    </select>
                </div>

                {/* Renter */}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Renter
                    </label>
                    <select
                    name="renter_name"
                    value={formData.renter_name}
                    onChange={(e) => {
                        const renter = renters.find(r => r.renter_name === e.target.value);
                        if (renter) handleRenterSelect(renter);
                    }}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    disabled={!formData.building_name}
                    >
                    <option value="">Select Renter</option>
                    {renters.map(renter => (
                        <option key={renter.id} value={renter.renter_name}>
                        {renter.renter_name} (Floor: {renter.floor_no}, Room: {renter.room_no})
                        </option>
                    ))}
                    </select>
                </div>

                {/* Floor and Room */}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Floor No
                    </label>
                    <input
                    type="text"
                    name="floor_no"
                    value={formData.floor_no}
                    onChange={handleChange}
                    className=" border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Room No
                    </label>
                    <input
                    type="text"
                    name="room_no"
                    value={formData.room_no}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    />
                </div>

                {/* Amount and Payment Type */}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Amount
                    </label>
                    <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="shadow appearance-none border  bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
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
                </div>

                {/* Remarks */}
                <div className="mb-2">
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Remarks
                </label>
                <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded bg-gray-100 w-1/3 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                />
                </div>



            <button 
            type="button"
            onClick={() => setFormData(prev => ({...prev, monthly_fee: !prev.monthly_fee}))}
            className="text-sm mx-4 px-4 py-2 rounded-lg bg-green-200"
            >
            {formData.monthly_fee ? 'Remove Monthly Fee' : 'Add Monthly Fee'}
            </button>

             {/* Monthly Fee Section */}
                {formData.monthly_fee && (
                <div className="border-t-2 border-gray-200 pt-4 mb-6">
                <h2 className="text-lg font-semibold mb-6 text-center">Monthly Fee</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">From Month</label>
                    <select
                        name="from_month"
                        value={formData.from_month}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {months.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">From Year</label>
                    <select
                        name="from_year"
                        value={formData.from_year}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">To Month</label>
                    <select
                        name="to_month"
                        value={formData.to_month}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {months.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">To Year</label>
                    <select
                        name="to_year"
                        value={formData.to_year}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Amount</label>
                    <input
                        type="number"
                        name="monthly_amount"
                        value={formData.monthly_amount}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Payment Type</label>
                    <select
                        name="monthly_payment_type"
                        value={formData.monthly_payment_type}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded bg-gray-100 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="cash">Cash</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="check">Check</option>
                        <option value="mobile_banking">Mobile Banking</option>
                    </select>
                    </div>
                </div>
                </div>
                )}


                <button 
                type="button"
                onClick={() => setFormData(prev => ({...prev, yearly_fee: !prev.yearly_fee}))}
                className="text-sm px-4 py-2 rounded-lg bg-green-200 mx-4"
                >
                {formData.yearly_fee ? 'Remove Yearly Fee' : 'Add Yearly Fee'}
                </button>
                {/* Yearly Fee Section */}
                 {formData.yearly_fee && (
                <div className="border-t-2 border-gray-200 pt-4 mb-6">
                <h2 className="text-lg font-semibold mb-6 text-center">Yearly Fee</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">From Year</label>
                    <select
                        name="yearly_from_year"
                        value={formData.yearly_from_year}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">To Year</label>
                    <select
                        name="yearly_to_year"
                        value={formData.yearly_to_year}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Amount</label>
                    <input
                        type="number"
                        name="yearly_amount"
                        value={formData.yearly_amount}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Payment Type</label>
                    <select
                        name="yearly_payment_type"
                        value={formData.yearly_payment_type}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded bg-gray-100 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="cash">Cash</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="check">Check</option>
                        <option value="mobile_banking">Mobile Banking</option>
                    </select>
                    </div>

                    {/* Remarks */}
                    <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Remarks</label>
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded bg-gray-100 w-full px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="3"
                    />
                    </div>
                </div>
                </div>
                )}

       
               {/* Buttons */}
                <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/rent-collections')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </button>
                </div>

               


            </form>
            </div>
        );
}

export default RentCollection