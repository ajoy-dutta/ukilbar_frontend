import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const RentCollection = () => {
    const [formData, setFormData] = useState({
        // basic info
        collection_date : new Date().toISOString().split('T')[0],
        advocate_id: "",

        // House Rent
        month: "",
        year: "",
        building_name: "",
        floor: "",
        room: "",
        rent_amount:"",
        payment_type:"",
        remarks1: "",

        // Monthly Fee
        monthly_fee_form: false,
        from_month: new Date().getMonth() + 1,
        from_year: new Date().getFullYear(),
        to_month: new Date().getMonth() + 1,
        to_year: new Date().getFullYear(),
        monthly_fee: '',
        total_monthly_amount: '',
        monthly_payment_type: 'cash',
        remarks2:'',
        
        // Yearly Fee
        bar_association_fee: false,
        yearly_from_year: new Date().getFullYear(),
        yearly_to_year: new Date().getFullYear(),
        yearly_fee: '',
        yearly_delay_fee : '',
        benevolent_fund_fee: '',
        benevolent_delay_fee: '',
        relief_fund_fee: '',
        total_amount:'',
        court_type:'',
        remarks3: '',

    });

    const [buildings, setBuildings] = useState([]);
    const [renters, setRenters] = useState([]);
    const [advocates, setAdvocates] = useState([]);
    const [selectedAdvocate, setSelectedAdvocate] = useState(null);
    const navigate = useNavigate();

    const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);


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

    // Fething the Advocates
    useEffect(() => {
        const fetchAdvocates = async() =>{
            try{
                const response = await AxiosInstance.get("advocates/");
                setAdvocates(response.data);  
            } catch (error) {
                console.error('Error fetching buildings:', error);
            }
        };

        fetchAdvocates();
    }, [])


    useEffect(() => {
        // Find the selected advocate info when advocate_id changes
        const selected = advocates.find(
        (a) => String(a.bar_registration_number) === String(formData.advocate_id)
        );
        setSelectedAdvocate(selected || null);
       }, [formData.advocate_id, advocates]);

    console.log("selectedAdvocate",selectedAdvocate)


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
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div className="mb-2">
                <h1 className="text-lg text-sky-900 text-center font-semibold mb-4">Basic Info</h1>
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
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Advocate</label>
                        <select
                            name="advocate_id"
                            value={formData.advocate_id}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none"
                            required
                        >
                            <option value="">Select Advocate</option>
                            {advocates.map((adv) => (
                            <option key={adv.id} value={adv.bar_registration_number}>
                                {adv.bar_registration_number}
                            </option>
                            ))}
                        </select>
                    </div>

                    {selectedAdvocate && (
                    <>
                        <div>
                        <label className="block text-sm font-medium text-gray-700">Advocate Name</label>
                        <input
                            type="text"
                            value={selectedAdvocate.name_bengali}
                            readOnly
                            className="w-full bg-gray-100 border rounded py-2 px-3"
                        />
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                        <input
                            type="text"
                            value={selectedAdvocate.father_name}
                            readOnly
                            className="w-full bg-gray-100 border rounded py-2 px-3"
                        />
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
                        <input
                            type="text"
                            value={selectedAdvocate.enrollment_date_As_lawyer}
                            readOnly
                            className="w-full bg-gray-100 border rounded py-2 px-3"
                        />
                        </div>
                    </>
                    )}

                </div>
                </div>


            <div className="border-t-2 border-gray-200 pt-6 mb-2">
            <h1 className="text-lg text-sky-900 text-center font-semibold mb-4">House/Shop/Billboard Rent</h1>
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
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    {months.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
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
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                    </select>
                </div>

                {/* Type */}
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
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
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
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

                

                {/* Floor and Room */}
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
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

                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
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
                <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
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
                        name="remarks1"
                        value={formData.remarks1}
                        onChange={handleChange}
                        className="shadow appearance-none border h-12 rounded bg-gray-100 w-full px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="3"
                    />
                </div>

            </div>
            </div>


            <button 
            type="button"
            onClick={() => setFormData(prev => ({...prev, monthly_fee_form: !prev.monthly_fee_form}))}
            className="text-sm px-4 py-2 rounded-lg bg-sky-900 text-white flex items-center gap-2"
            >
            {formData.monthly_fee_form ? 'Remove Monthly Fee' : 'Add Monthly Fee'}
             <FaArrowRight />
            </button><br />

             {/* Monthly Fee Section */}
                {formData.monthly_fee_form && (
                <div className="border-t-2 border-gray-200 pt-6 mb-2">
                <h2 className="text-lg text-sky-900 font-semibold mb-4 text-center">Monthly Fee</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">From Month</label>
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

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">From Year</label>
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

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">To Month</label>
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

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">To Year</label>
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

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Monthly fee</label>
                    <input
                        type="number"
                        name="monthly_fee"
                        value={formData.monthly_fee}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Total Amount</label>
                    <input
                        type="number"
                        name="total_monthly_amount"
                        value={formData.total_monthly_amount}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>
                    

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Payment Type</label>
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

                    {/* Remarks */}
                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">
                        Remarks
                    </label>
                    <textarea
                        name="remarks2"
                        value={formData.remarks2}
                        onChange={handleChange}
                        className="shadow appearance-none border  h-12 rounded bg-gray-100 w-full px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="3"
                    />
                    </div>

                </div>
                </div>
                )}


                <button 
                type="button"
                onClick={() => setFormData(prev => ({...prev, bar_association_fee: !prev.bar_association_fee}))}
                className="text-sm px-4 py-2 rounded-lg bg-sky-900 text-white flex items-center gap-2"
                >
                {formData.bar_association_fee ? 'Remove Bar Association Fee' : 'Add Bar Association Fee'}
                 <FaArrowRight />
                </button>

                {formData.bar_association_fee && (
                <div className="border-t-2 border-gray-200 pt-6 mb-2">
                <h2 className="text-lg text-sky-900 font-semibold mb-4 text-center">Bar Association Fee</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">From Year</label>
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

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">To Year</label>
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

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Yearly fee</label>
                    <input
                        type="number"
                        name="yearly_fee"
                        value={formData.yearly_fee}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Delay fee (Yearly)</label>
                    <input
                        type="number"
                        name="yearly_delay_fee"
                        value={formData.yearly_delay_fee}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Benevolent Fee</label>
                    <input
                        type="number"
                        name="benevolent_fund_fee"
                        value={formData.benevolent_fund_fee}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Delay Fee (Benevolent)</label>
                    <input
                        type="number"
                        name="benevolent_delay_fee"
                        value={formData.benevolent_delay_fee}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Relief Fund Donation</label>
                    <input
                        type="number"
                        name="relief_fund_fee"
                        value={formData.relief_fund_fee}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>

                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Total Amount</label>
                    <input
                        type="number"
                        name="total_amount"
                        value={formData.total_amount}
                        onChange={handleChange}
                        className="shadow appearance-none border bg-gray-100 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>


                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Court Type</label>
                    <select
                        name="court_type"
                        value={formData.court_type}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded bg-gray-100 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="L/C">L/C</option>
                        <option value="H/C">H/C</option>
                    </select>
                    </div>

                    
                    

                    {/* <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Payment Type</label>
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
                    </div> */}

                    {/* Remarks */}
                    <div className="">
                    <label className="block text-gray-700 text-sm font-semibold ">Remarks</label>
                    <textarea
                        name="remarks3"
                        value={formData.remarks3}
                        onChange={handleChange}
                        className="shadow appearance-none border h-12 rounded bg-gray-100 w-full px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    onClick={() => navigate('/rent-collections')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </button>
                </div>

            </form>
            </div>
        );
}

export default RentCollection