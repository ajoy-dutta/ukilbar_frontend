import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Components/AxiosInstance';

const AddBank = () => {
    const [formData, setFormData] = useState({
        bank_name: '',
        address: '',
        branch_name: '',
        account_category: ''
    });

    const [banks, setBanks] = useState([]);
    const [currentBankId, setCurrentBankId] = useState(null);


    const fetchBanks = async () => {
        try {
            const response = await AxiosInstance.get('banks/');
            console.log("BankName", response.data);
            setBanks(response.data);
        } catch (error) {
            console.error('Error fetching banks:', error);
        }
    };

    useEffect(() => {
        fetchBanks();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit form to create new bank
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(currentBankId){
               await AxiosInstance.put(`banks/${currentBankId}/`,formData);
            }
            else{
               await AxiosInstance.post('banks/',formData);
            }
            
            resetForm();

            alert("Bank Added Successfully");
            fetchBanks();

        } catch (error) {
            console.error('Error creating bank:', error);
        }
    };


    const handleEdit = (bank) => {
        setFormData({
            bank_name: bank.bank_name,
            address: bank.address,
            branch_name: bank.branch_name,
            account_category: bank.account_category,
        });
        setCurrentBankId(bank.id);
    };


    const handleDelete = async (id) => {
        if (window.confirm('আপনি কি এই ব্যাংককে মুছে ফেলতে চান?')) {
            try {
                await AxiosInstance.delete(`banks/${id}/`);
                fetchBanks();
            } catch (error) {
                console.error('Error deleting renter:', error);
            }
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            bank_name: '',
            address: '',
            branch_name: '',
            account_category: ''
        });
        setCurrentBankId(null);
    };

    return (
        <div className="mt-10 p-4 border rounded shadow mx-4">
            <div className='max-w-xl align-left'>
                <h2 className="text-2xl font-bold mb-4">
                    {currentBankId ? 'ব্যাংক সম্পাদনা করুন' : 'ব্যাংক যোগ করুন'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                    <input
                        className="w-full p-2 border rounded bg-gray-100"
                        type="text"
                        name="bank_name"
                        placeholder="ব্যাংকের নাম"
                        value={formData.bank_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded bg-gray-100"
                        type="text"
                        name="address"
                        placeholder="ঠিকানা"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded bg-gray-100"
                        type="text"
                        name="branch_name"
                        placeholder="শাখার নাম"
                        value={formData.branch_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded bg-gray-100"
                        type="text"
                        name="account_category"
                        placeholder="অ্যাকাউন্টের ধরণ"
                        value={formData.account_category}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                            {currentBankId ? 'আপডেট করুন' : 'যোগ করুন'}
                        </button>
                        {currentBankId && (
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
            </div>
    
            <div className='mt-12'>
                <h2 className="text-xl font-semibold mb-2">ব্যাংক তালিকা</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border mb-8 mt-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">SL</th>
                                <th className="border p-2">ব্যাংকের নাম</th>
                                <th className="border p-2">শাখার নাম</th>
                                <th className="border p-2">ঠিকানা</th>
                                <th className="border p-2">অ্যাকাউন্টের ধরণ</th>
                                <th className="border p-2">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banks.map((bank, index) => (
                                <tr key={bank.id} className="hover:bg-gray-50 text-center">
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">{bank.bank_name}</td>
                                    <td className="border p-2">{bank.branch_name}</td>
                                    <td className="border p-2">{bank.address}</td>
                                    <td className="border p-2">{bank.account_category}</td>
                                    <td className="border p-2 text-center">
                                        <button 
                                            onClick={() => handleEdit(bank)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-1"
                                        >
                                            সম্পাদন
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(bank.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
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

export default AddBank;
