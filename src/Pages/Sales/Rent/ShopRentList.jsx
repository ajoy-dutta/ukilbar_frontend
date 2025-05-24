import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../Components/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

const ShopRentList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [ buildings , setBuildings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await AxiosInstance.get('shop-rent/');
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

   const handleDelete = async (id) => {
        setFilteredData(prevData => prevData.filter(item => item.id !== id));
        try {
            await AxiosInstance.delete(`shop-rent/${id}`);
            fetchData();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };


    const handleEdit = (shopRentData) => {
      navigate("/dashboard/shop-rent/", { state: { shopRentData: shopRentData } });
    };


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

  useEffect(() => {
    let filtered = [...data];

    if (fromDate) {
      filtered = filtered.filter((item) => item.collection_date >= fromDate);
    }

    if (toDate) {
      filtered = filtered.filter((item) => item.collection_date <= toDate);
    }

    if (buildingName) {
      filtered = filtered.filter((item) =>
        item.building_name?.toLowerCase().includes(buildingName.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [fromDate, toDate, buildingName, data]);

  return (
    <div className="p-8">

       <button onClick={(e)=> handleEdit()} className="flex items-center gap-2 mt-2 mb-4 bg-gray-200 rounded-lg px-4 py-2 hover:bg-gray-300">
          <IoArrowBackSharp className="text-xl" />
          <span className="text-sm font-medium">Back</span>
        </button>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <label className="text-sm font-medium">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-2 bg-sky-50 py-1 rounded-md w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border bg-sky-50 px-2 py-1 rounded-md w-full"
          />
        </div>


         {/* Building */}
        <div className="">
            <label className="text-sm font-medium"> Building Name </label>
            <select
                name="building_name"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                className="border bg-sky-50 rounded w-full px-3 py-1 text-gray-700"
                placeholder="Type Building Name"
            >
            <option value="">Select Building</option>
            {buildings.map(building => (
                <option key={building.id} value={building.building_name}>{building.building_name}</option>
            ))}
            </select>
        </div>
      </div>


      <h2 className="text-gray-800 mb-4 font-bold text-xl text-left mt-8">Shop Rent Collection Records</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100 text-sm text-gray-700 font-semibold">
            <tr>
              <th className="border px-2 py-2">Date</th>
              <th className="border px-2 py-2">Renter Name</th>
              <th className="border px-2 py-2">From</th>
              <th className="border px-2 py-2">To</th>
              <th className="border px-2 py-2">Rent Type</th>
              <th className="border px-2 py-2">Building</th>
              <th className="border px-2 py-2">Floor</th>
              <th className="border px-2 py-2">Room</th>
              <th className="border px-2 py-2">Amount</th>
              <th className="border px-2 py-2">Payment</th>
              <th className="border px-2 py-2">Remarks</th>
              <th className="border px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="text-sm text-gray-700">
                  <td className="border px-2 py-1">{item.collection_date}</td>
                  <td className="border px-2 py-1">{item.renter_name}</td>
                  <td className="border px-2 py-1">{`${item.from_month}/${item.from_year}`}</td>
                  <td className="border px-2 py-1">{`${item.to_month}/${item.to_year}`}</td>
                  <td className="border px-2 py-1">{item.rent_type}</td>
                  <td className="border px-2 py-1">{item.building_name}</td>
                  <td className="border px-2 py-1 text-center">{item.floor}</td>
                  <td className="border px-2 py-1 text-center">{item.room}</td>
                  <td className="border px-2 py-1 item-center">{item.rent_amount}</td>
                  <td className="border px-2 py-1">{item.payment_type}</td>
                  <td className="border px-2 py-1">{item.remarks}</td>
                  <td className="px-1 py-2 border">
                       <div className="flex gap-2">
                        <button 
                        className="bg-blue-600 px-2 py-1 text-white rounded-md hover:bg-blue-700"
                        onClick={() => handleEdit(item)}
                        >
                            edit
                        </button>
                        <button 
                        className="bg-red-600 px-2 py-1 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleDelete(item.id)}
                        >
                        delete
                        </button>
                        </div>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center text-gray-500 py-3">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopRentList;
